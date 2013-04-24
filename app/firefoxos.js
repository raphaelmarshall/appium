"use strict";

var errors = require('./errors')
  , _ = require('underscore')
  , logger = require('../logger').get('appium')
  , net = require('net')
  , deviceCommon = require('./device')
  , status = require("./uiauto/lib/status")
  , getAtomSrc = require('./hybrid/firefoxos/firefoxos-atoms').get;
  //, NotImplementedError = errors.NotImplementedError
  //, NotYetImplementedError = errors.NotYetImplementedError
  //, parseXpath = require('./uiauto/appium/xpath').parseXpath
  //, exec = require('child_process').exec
  //, fs = require('fs')
  //, async = require('async')
  //, path = require('path')
  //, UnknownError = errors.UnknownError;

var Firefox = function(opts) {
  this.rest = opts.rest;
  this.app = opts.app;
  this.opts = opts;
  this.udid = opts.udid;
  this.verbose = opts.verbose;
  this.port = opts.port || 2828;
  this.queue = [];
  this.progress = 0;
  this.onStop = function() {};
  this.implicitWaitMs = 0;
  this.commandTimeoutMs = 60 * 1000;
  this.origCommandTimeoutMs = this.commandTimeoutMs;
  this.commandTimeout = null;
  this.asyncWaitMs = 0;
  this.onConnect = null;
  this.hasConnected = false;
  this.fromActor = null;
  this.socket = null;
  this.capabilities = {
    platform: 'LINUX'
    , browserName: 'FirefoxOS'
    , version: '18.0'
    , webStorageEnabled: false
    , takesScreenshots: true
    , javascriptEnabled: true
    , databaseEnabled: false
  };
  this.lastCmd = null;
  this.initCommandMap();
};

Firefox.prototype.start = function(cb, onDie) {
  var me = this;
  this.socket = new net.Socket();
  this.socket.on('close', function() {
    onDie(0);
  });
  this.socket.on('data', _.bind(this.receive, this));

  this.socket.connect(this.port, 'localhost', function () { });

  this.onConnect = function() {
    logger.info("Firefox OS socket connected");
    var cmd = {
      type: 'getMarionetteID'
    };
    me.proxy(cmd, function(err, res) {
      if (err) return cb(err);
      me.fromActor = res.id;
      var cmd = {
        type: 'newSession'
      };
      me.proxy(cmd, function(err, res) {
        if (err) return cb(err);
        me.sessionId = res.value;
        var atomSrc = getAtomSrc('gaia_apps');
        var wrappedScript = atomSrc +
          ";GaiaApps.launchWithName('" + me.app +"');";
        var cmd = {
          type: 'executeAsyncScript'
          , args: []
          , newSandbox: true
          , specialPowers: false
          , value: wrappedScript
        };
        me.proxy(cmd, function(err, res) {
          if (err) return cb(err);
          var frameId = res.value.frame.ELEMENT;
          var cmd = {
            type: 'switchToFrame'
            , element: frameId
          };
          me.proxy(cmd, function(err) {
            if (err) return cb(err);
            cb(null, me.sessionId);
          });
        });
      });
    });
  };

};

Firefox.prototype.receive = function(data) {
  console.log("data received");
  data = data.toString().split(":").slice(1).join(":");
  data = JSON.parse(data);
  console.log(data);
  if (!this.hasConnected) {
    this.hasConnected = true;
    this.fromActor = data.from;
    this.onConnect();
  } else if (this.cbForCurrentCmd) {
    var cb = this.cbForCurrentCmd;
    this.progress--;
    this.cbForCurrentCmd = null;
    if (typeof cb === 'function') {
      this.respond(data, cb);
    }
    this.executeNextCommand();
  }
};

Firefox.prototype.proxy = deviceCommon.proxy;

Firefox.prototype.push = function(elem) {
  this.queue.push(elem);
  this.executeNextCommand();
};


Firefox.prototype.respond = function(data, cb) {
  if (typeof data.error !== "undefined") {
    cb(new Error(data.error.message));
  } else if (typeof data.id !== "undefined") {
    cb(null, data);
  } else {
    cb(null, {
      status: status.codes.Success.code
      , value: data.value
    });
  }
};


Firefox.prototype.executeNextCommand = function() {
  if (this.queue.length <= 0 || this.progress > 0) {
    return;
  }

  var target = this.queue.shift()
  , command = target[0]
  , cb = target[1];

  this.cbForCurrentCmd = cb;

  this.progress++;
  command.to = this.fromActor;
  var cmdStr = JSON.stringify(command);
  cmdStr = cmdStr.length + ':' + cmdStr;

  logger.debug("Sending command to firefoxOs: " + cmdStr);
  this.socket.write(cmdStr);
};

Firefox.prototype.initCommandMap = function() {
  var elFn = function(elId) { return {element: elId }; };
  this.cmdMap = {
    implicitWait: ['setSearchTimeout']
    , getUrl: ['getUrl']
    , findElement: ['findElement', function(strategy, selector) {
        return {
          using: strategy, value: selector
        };
      }, function(err, res, cb) {
        if (err) return cb(err);
        res.value = {ELEMENT: res.value};
        cb(null, res);
      }]
    , click: ['clickElement', elFn]
    , setValue: ['sendKeysToElement', function(elId, val) {
        return {
          element: elId
          , value: val.split("")
        };
      }]
    , getText: ['getElementText', elFn]
  };
  _.each(this.cmdMap, _.bind(function(cmdInfo, controller) {
    this[controller] = _.bind(function() {
      var args = Array.prototype.slice.call(arguments, 0);
      var cb;
      var outerCb = args[args.length - 1];
      if (typeof cmdInfo[2] === 'function') {
        cb = function(err, res) {
          cmdInfo[2](err, res, outerCb);
        };
      } else {
        cb = outerCb;
      }
      args = args.slice(0, args.length - 1);
      var cmd = {
        type: cmdInfo[0]
      };
      if (typeof cmdInfo[1] === 'function') {
        cmd  = _.extend(cmd, cmdInfo[1].apply(this, args));
      } else if (typeof cmdInfo[1] === "undefined" && args.length > 0) {
        cmd = _.extend(cmd, {value: args[0]});
      }
      this.proxy(cmd, cb);
    }, this);
  }, this));
};

Firefox.prototype.stop = function(cb) {
  logger.info("Stopping firefoxOs connection");
  this.socket.destroy();
  cb(0);
};

module.exports = function(opts) {
  return new Firefox(opts);
};
