"use strict";

/*
 * Turns out python's implicit wait doesn't respect the functionality described
 * by WebDriver. Implemented it anyways for parity, will fix later and enable
 * this test
 */

var describeWd = require('../../helpers/driverblock.js').describeForApp('TestApp')
  , it = require("../../helpers/driverblock.js").it
  , should = require('should');

describeWd('command timeout', function(h) {
  it('should be settable and gettable', function(done) {
    h.driver.execute("mobile: setCommandTimeout", [{timeout: 37}], function(err) {
      should.not.exist(err);
      h.driver.execute("mobile: getCommandTimeout", function(err, res) {
        should.not.exist(err);
        res.should.eql(37);
        done();
      });
    });
  });

  it('should die with short command timeout', function(done) {
    var params = {timeout: 3};
    h.driver.execute("mobile: setCommandTimeout", [params], function(err) {
      should.not.exist(err);
      var next = function() {
        h.driver.elementByName('dont exist dogg', function(err) {
          should.exist(err);
          [13, 6].should.include(err.status);
          done();
        });
      };
      setTimeout(next, 5500);
    });
  });

  it('should die with short command timeout even after mobile reset', function(done) {
    var params = {timeout: 3};
    h.driver.execute("mobile: setCommandTimeout", [params], function(err) {
      should.not.exist(err);
      h.driver.execute("mobile: reset", function(err) {
        should.not.exist(err);
        setTimeout(function() {
          h.driver.elementByName('dont exist dogg', function(err) {
            should.exist(err);
            [13, 6].should.include(err.status);
            done();
          });
        }, 6500);
      });
    });
  });
});

 describeWd('check implicit wait', function(h) {
  var impWaitSecs = 4;
  var impWaitCheck = function(cb) {
    var before = new Date().getTime() / 1000;
    h.driver.elementsByTagName('notgonnabethere', function(err, missing) {
     var after = new Date().getTime() / 1000;
     should.ok(after - before < (impWaitSecs + 2));
     should.ok(after - before > impWaitSecs);
     missing.length.should.equal(0);
     cb();
    });
  };

   it('should set the implicit wait for finding elements', function(done) {
     h.driver.setImplicitWaitTimeout(impWaitSecs * 1000, function(err) {
       should.not.exist(err);
       impWaitCheck(done);
     });
   });
   it('should set the implicit wait for finding element', function(done) {
     h.driver.setImplicitWaitTimeout(impWaitSecs * 1000, function(err) {
       should.not.exist(err);
       impWaitCheck(done);
     });
   });
   it('should work even with a reset in the middle', function(done) {
     h.driver.setImplicitWaitTimeout(impWaitSecs * 1000, function(err) {
       should.not.exist(err);
       impWaitCheck(function() {
         h.driver.execute("mobile: reset", function(err) {
           should.not.exist(err);
           impWaitCheck(done);
         });
       });
     });
   });
 });
