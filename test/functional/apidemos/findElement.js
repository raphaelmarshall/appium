"use strict";

var env = require('../../helpers/env')
  , setup = require("../common/setup-base")
  , desired = require("./desired");

describe('find elements', function() {
  var browser;
  setup(this, desired)
   .then( function(_browser) { browser = _browser; } );

  if (env.FAST_TESTS) {
    afterEach(function(done) {
      // going back to main page if necessary todo: find better way
      function back() {
        return browser.elementByNameOrNull('Accessibility').then(function(el) {
          if (!el) return browser.back();
        });
      }
      back().then(back).nodeify(done);
    });
  }
  
  describe('mobile find', function() {
    it('should scroll to an element by text or content desc', function(done) {
      browser
        .execute("mobile: find", [["scroll",[[3, "views"]],[[7, "views"]]]]).text()
          .should.become("Views")
        .nodeify(done);
    });
    // todo: does not work in Nexus7
    it('should find a single element by content-description', function(done) {
      browser.execute("mobile: find", [[[[7, "Animation"]]]]).text()
          .should.become("Animation")
        .nodeify(done);
    });
    it('should find a single element by text', function(done) {
      browser.execute("mobile: find", [[[[3, "Animation"]]]]).text()
          .should.become("Animation")
        .nodeify(done);
    });
  });

  describe('find element(s)', function() {
    it('should find a single element by content-description', function(done) {
      browser
        .elementByName("Animation").text().should.become("Animation")
        .nodeify(done);
    });
    it('should find a single element by tag name', function(done) {
      browser
        .elementByTagName("text").text().should.become("API Demos")
        .nodeify(done);
    });
    it('should find multiple elements by tag name', function(done) {
      browser
        .elementsByTagName("text")
          .should.eventually.have.length.at.least(10)
        .nodeify(done);
    });
    it('should not find an element that doesnt exist', function(done) {
      browser
        .elementByTagName("blargimarg").should.be.rejectedWith(/status: 7/)
        .nodeify(done);
    });
    it('should not find multiple elements that doesnt exist', function(done) {
      browser
        .elementsByTagName("blargimarg").should.eventually.have.length(0)
        .nodeify(done);
    });
    it('should fail on empty locator', function(done) {
      browser.elementsByTagName("")
        .catch(function(err) { throw err.data; }).should.be.rejectedWith(/selector/)
        .elementsByTagName("text").should.eventually.exist
        .nodeify(done);
    });
    it('should find a single element by id', function(done) {
      browser
        .execute("mobile: find", [["scroll",[[3, "views"]],[[7, "views"]]]]).click()
        .elementByXPath("//text[@text='Buttons']").click()
        .elementById("buttons_1_normal").text().should.become("Normal")
        .nodeify(done);
    });
    it('should find a single element by resource-id', function(done) {
      browser
        .elementById('android:id/home').should.eventually.exist
        .nodeify(done);
    });
    it('should find multiple elements by resource-id', function(done) {
      browser
        .elementsById('android:id/text1')
          .should.eventually.have.length.at.least(10)
        .nodeify(done);
    });
  });

  describe('find element(s) from element', function() {
    it('should find a single element by tag name', function(done) {
      browser.elementByTagName("list").then(function(el) {
        return el
          .elementByTagName("text").text().should.become("Accessibility");
      }).nodeify(done);
    });
    it('should find multiple elements by tag name', function(done) {
      browser.elementByTagName("list").then(function(el) {
        return el
          .elementsByTagName("text").should.eventually.have.length.at.least(10);
      }).nodeify(done);
    });
    it('should not find an element that doesnt exist', function(done) {
      browser.elementByTagName("list").then(function(el) {
        return el
          .elementByTagName("blargimarg").should.be.rejectedWith(/status: 7/);
      }).nodeify(done);
    });
    it('should not find multiple elements that doesnt exist', function(done) {
      browser.elementByTagName("list").then(function(el) {
        return el
          .elementsByTagName("blargimarg").should.eventually.have.length(0);
      }).nodeify(done);
    });
  });

  describe('xpath', function() {
    it('should find element by type', function(done) {
      browser
        .elementByXPath('//text').text()
          .should.become("API Demos")
        .nodeify(done);
    });
    it('should find element by text', function(done) {
      browser
        .elementByXPath("//text[@value='Accessibility']").text()
          .should.become("Accessibility")
        .nodeify(done);
    });
    it('should find element by partial text', function(done) {
      browser
        .elementByXPath("//text[contains(@value, 'Accessibility')]").text()
          .should.become("Accessibility")
        .nodeify(done);
    });
    it('should find the last element', function(done) {
      browser
        .elementByXPath("//text[last()]").text()
        .then(function(text) {
          ["OS", "Text", "Views"].should.include(text);
        }).nodeify(done);
    });
    it('should find element by xpath index and child', function(done) {
      browser
        .elementByXPath("//frame[1]/frame[1]/list[1]/text[3]").text()
          .should.become("App")
        .nodeify(done);
    });
    it('should find element by index and embedded desc', function(done) {
      browser
        .elementByXPath("//frame/frame[1]//text[3]").text()
          .should.become("App")
        .nodeify(done);
    });
    it('should get an error when strategy doesnt exist', function(done) {
      browser
        .elementByCss('button').catch(function(err) {
          err.cause.value.message.should.equal("Invalid locator strategy: css selector");
          throw err;
        }).should.be.rejectedWith(/status: 9/)
        .nodeify(done);
    });
  });

  describe('unallowed tag names', function() {
    it('should not find secure fields', function(done) {
      browser
        .elementsByTagName('secure').catch(function(err) { throw JSON.stringify(err.cause.value); })
          .should.be.rejectedWith(/not supported in Android/)
        .nodeify(done);
    });
  });
});
