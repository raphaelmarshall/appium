// @ts-check
import _ from 'lodash';

/**
 * @param {ReturnType<import('./timeout').TimeoutMixin>} Base
 * @returns {import('../driver').BaseDriverBase<import('@appium/types').TimeoutCommands & IEventCommands>}
 */
export function EventMixin (Base) {
  /**
   * @implements {IEventCommands}
   */
  class EventCommands extends Base {
    /**
     * Log a user-defined event in the event log.
     *
     * @param {string} vendor - a vendor prefix for the user, to ensure namespace
     * separation
     * @param {string} event - the event name
     */
    logCustomEvent (vendor, event) {
      this.logEvent(`${vendor}:${event}`);
    }

    /**
     * Get the event log
     * @param {string|string[]} [type] - the event type to filter with.
     * It returns all events if the type is not provided or empty string/array.
     * @returns {import('@appium/types').EventHistory|Record<string,number>} - the event history log object
     */
    getLogEvents (type) {
      if (_.isEmpty(type)) {
        return this.eventHistory;
      }

      const typeList = _.castArray(type);

      return _.reduce(
        this.eventHistory,
        (acc, eventTimes, eventType) => {
          if (typeList.includes(eventType)) {
            acc[eventType] = eventTimes;
          }
          return acc;
        },
        {},
      );
    }
  }

  return EventCommands;
}

/**
 * @typedef {import('@appium/types').EventCommands} IEventCommands
 */
