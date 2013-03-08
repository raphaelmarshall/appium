/*global it:true, before:true, describe: true */
"use strict";

var checkPreferencesApp = require("../../../app/helpers").checkPreferencesApp
  , should = require('should')
  , describeWd;

describe('preferences app', function() {
  beforeEach(function(done) {
    checkPreferencesApp('6.1', function(err, appPath) {
      should.not.exist(err);
      describeWd = require("../../helpers/driverblock.js").describeForApp(appPath);
      done();
    });
  });

  it('', function() {
    describeWd('settings', function(h) {
      // example of a script that turns of auto-complete
      // if you run it on a server with --no-reset, it will keep this state
      // for subsequent app runs
      it('should turn off autocomplete', function(done) {
        h.driver.elementsByTagName('tableCell', function(err, els) {
          els[1].click(function(err) {
            h.driver.elementsByTagName('tableCell', function(err, els) {
              els[1].click(function(err) {
                h.driver.elementByXPath('//switch[@name="Auto-Correction"]', function(err, switchEl) {
                  switchEl.getValue(function(err, checked) {
                    if (checked === 1) {
                      // was checked, click it off
                      switchEl.click(function(err) {
                        setTimeout(done, 5000);
                      });
                    } else {
                      // was unchecked, do nothing
                      setTimeout(done, 5000);
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
