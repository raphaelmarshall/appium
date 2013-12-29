// WD.js driver
var wd = require("wd");

// Test libraries
require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

// Enable chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// Appium server info
var host = process.env.APPIUM_HOST || "localhost",
    port = parseInt(process.env.APPIUM_PORT || 4723);

// Browser/app config
var desired={
  device: 'iPhone Simulator', 
  name: "Appium: with WD", 
  platform: "Mac", 
  app: "safari",
  // version: "6.0",
  browserName: "",
  newCommandTimeout: 60
};

// Instantiate a new browser session
var browser = wd.promiseChainRemote(host , port);

// See whats going on
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

// Run the test
browser
  .init(desired)
  .get("http://saucelabs.com/test/guinea-pig")
  .waitForElementById('i_am_an_id', 5000)
    .text().should.become("I am a div")
  .elementById('comments')
    .sendKeys("This is an awesome comment")
  .elementById('submit')
    .click()
  .waitForElementById('your_comments', 
    wd.asserters.textInclude("This is an awesome comment"))
  .fin(function() { return browser.quit(); })
  .done();
