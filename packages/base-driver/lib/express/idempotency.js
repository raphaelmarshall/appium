import log from './logger';
import LRU from 'lru-cache';
import _ from 'lodash';
import {EventEmitter} from 'events';

const IDEMPOTENT_RESPONSES = new LRU({
  max: 64,
  ttl: 30 * 60 * 1000,
  updateAgeOnGet: true,
  updateAgeOnHas: true,
  dispose: ({responseStateListener}) => {
    responseStateListener?.removeAllListeners();
  }
});
const MONITORED_METHODS = ['POST', 'PATCH'];
const IDEMPOTENCY_KEY_HEADER = 'x-idempotency-key';
const MAX_CACHED_PAYLOAD_SIZE_BYTES = 1 * 1024 * 1024; // 1Mib

/**
 *
 * @param {string} key
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function cacheResponse(key, req, res) {
  if (!res.socket) {
    return;
  }

  const responseStateListener = new EventEmitter();
  IDEMPOTENT_RESPONSES.set(key, {
    method: req.method,
    path: req.path,
    response: null,
    responseStateListener,
  });
  const originalSocketWriter = res.socket.write.bind(res.socket);
  let responseChunks = [];
  let responseChunksSize = 0;
  let errorMessage = null;
  const patchedWriter = (chunk, encoding, next) => {
    if (errorMessage) {
      responseChunks = [];
      responseChunksSize = 0;
    } else {
      const buf = Buffer.from(chunk, encoding);
      responseChunks.push(buf);
      responseChunksSize += buf.length;
      if (responseChunksSize > MAX_CACHED_PAYLOAD_SIZE_BYTES) {
        errorMessage = `The actual response size exceeds ` +
          `the maximum allowed limit of ${MAX_CACHED_PAYLOAD_SIZE_BYTES} bytes`;
      }
    }
    return originalSocketWriter(chunk, encoding, next);
  };
  res.socket.write = patchedWriter;
  let isResponseFullySent = false;
  res.once('error', (e) => { errorMessage = e.message; });
  res.once('finish', () => { isResponseFullySent = true; });
  res.once('close', () => {
    if (res.socket?.write === patchedWriter) {
      res.socket.write = originalSocketWriter;
    }

    if (!IDEMPOTENT_RESPONSES.has(key)) {
      log.info(
        `Could not cache the response identified by '${key}'. ` +
        `Cache consistency has been damaged`
      );
    } else if (errorMessage) {
      log.info(`Could not cache the response identified by '${key}': ${errorMessage}`);
      IDEMPOTENT_RESPONSES.delete(key);
    } else if (!isResponseFullySent) {
      log.info(
        `Could not cache the response identified by '${key}', ` +
        `because it has not been completed`
      );
      log.info('Does the client terminate connections too early?');
      IDEMPOTENT_RESPONSES.delete(key);
    }

    const value = IDEMPOTENT_RESPONSES.get(key);
    if (value) {
      value.response = Buffer.concat(responseChunks);
    }
    responseChunks = [];
    responseStateListener.emit('ready', value?.response ?? null);
  });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function handleIdempotency(req, res, next) {
  const keyOrArr = req.headers[IDEMPOTENCY_KEY_HEADER];
  if (_.isEmpty(keyOrArr) || !keyOrArr) {
    return next();
  }

  const key = _.isArray(keyOrArr) ? keyOrArr[0] : keyOrArr;
  if (!MONITORED_METHODS.includes(req.method)) {
    // GET, DELETE, etc. requests are idempotent by default
    // there is no need to cache them
    return next();
  }

  log.debug(`Request idempotency key: ${key}`);
  if (!IDEMPOTENT_RESPONSES.has(key)) {
    cacheResponse(key, req, res);
    return next();
  }

  const {
    method,
    path,
    response,
    responseStateListener,
  } = IDEMPOTENT_RESPONSES.get(key);
  if (req.method !== method || req.path !== path) {
    log.warn(`Got two different requests with the same idempotency key '${key}'`);
    log.warn('Is the client generating idempotency keys properly?');
    return next();
  }

  if (response) {
    log.info(`The same request with the idempotency key '${key}' has been already processed`);
    log.info(`Rerouting its response to the current request`);
    if (!res.socket?.writable) {
      return next();
    }
    res.socket.write(response.toString('utf8'));
  } else {
    log.info(`The same request with the idempotency key '${key}' is being processed`);
    log.info(`Waiting for the response to be rerouted to the current request`);
    responseStateListener.once('ready', async (/** @type {Buffer?} */ cachedResponse) => {
      if (!cachedResponse || !res.socket?.writable) {
        return next();
      }
      res.socket.write(cachedResponse.toString('utf8'));
    });
  }
}

export {handleIdempotency};
