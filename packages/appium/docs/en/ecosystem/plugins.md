---
hide:
  - toc

title: Appium Plugins
---

Plugins offer various ways to extend or modify Appium's behaviour. They are _completely optional_
and are not needed for standard automation functionality, but you may find them to be useful
for more specialised automation workflows.

### Official Plugins

This is the list of plugins that are currently maintained by the Appium team:

|Plugin|Installation Key|Description|Supported By|
|---|---|---|---|
|[Execute Driver](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin)|`execute-driver`|Run entire batches of commands in a single call to the Appium server|Appium Team|
|[Images](https://github.com/appium/appium/tree/master/packages/images-plugin)|`images`|Image matching and comparison features|Appium Team|
|[Relaxed Caps](https://github.com/appium/appium/tree/master/packages/relaxed-caps-plugin)|`relaxed-caps`|Relax Appium's requirement for vendor prefixes on capabilities|Appium Team|
|[Universal XML](https://github.com/appium/appium/tree/master/packages/universal-xml-plugin)|`universal-xml`|Instead of the standard XML format for iOS and Android, use an XML definition that is the same across both platforms|Appium Team|

### Other Plugins

These plugins are not maintained by the Appium team and can provide additional functionality:

|Plugin|Installation Key|Description|Supported By|
|---|---|---|---|
|[AltUnity](https://github.com/headspinio/appium-altunity-plugin)|`--source=npm appium-altunity-plugin`|Target Unity games and apps for automation with a new context, via the AltUnityTester framework|HeadSpin|
|[Device Farm](https://github.com/AppiumTestDistribution/appium-device-farm)|`--source=npm appium-device-farm`|Manage and create driver session on connected android devices and iOS Simulators.|`@AppiumTestDistribution`|
|[OCR](https://github.com/jlipps/appium-ocr-plugin)|`--source=npm appium-ocr-plugin`|Find elements via OCR text|`@jlipps`|
|[Reporter](https://github.com/AppiumTestDistribution/appium-reporter-plugin)|`--source=npm appium-reporter-plugin`|Generates standalone consolidated html report with screenshots. Reports can be fetched from appium server, without worrying about heavy lifting such as screenshot capturing, report generation etc.|`@AppiumTestDistribution`|

!!! note

    If you maintain an Appium plugin that you would like to be listed in the Appium docs, feel free
    to make a PR to add it to this section with a link to the documentation for the plugin.