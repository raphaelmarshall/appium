export default [
  {
    argSpec: {
      arg: 'address',
      defaultValue: '0.0.0.0',
      dest: 'address',
      extName: undefined,
      extType: undefined,
      name: 'address',
      rawDest: 'address',
      ref: 'appium.json#/properties/server/properties/address',
    },
    schema: {
      $comment: 'I think hostname covers both DNS and IPv4...could be wrong',
      appiumCliAliases: ['a'],
      default: '0.0.0.0',
      description: 'IP address to listen on',
      format: 'hostname',
      title: 'address config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'allow-cors',
      defaultValue: false,
      dest: 'allowCors',
      extName: undefined,
      extType: undefined,
      name: 'allow-cors',
      rawDest: 'allowCors',
      ref: 'appium.json#/properties/server/properties/allow-cors',
    },
    schema: {
      default: false,
      description:
        'Whether the Appium server should allow web browser connections from any host',
      title: 'allow-cors config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'allow-insecure',
      defaultValue: [],
      dest: 'allowInsecure',
      extName: undefined,
      extType: undefined,
      name: 'allow-insecure',
      rawDest: 'allowInsecure',
      ref: 'appium.json#/properties/server/properties/allow-insecure',
    },
    schema: {
      appiumCliTransformer: 'csv',
      default: [],
      description:
        'Set which insecure features are allowed to run in this server\'s sessions. Features are defined on a driver level; see documentation for more details. Note that features defined via "deny-insecure" will be disabled, even if also listed here. If string, a path to a text file containing policy or a comma-delimited list.',
      items: {type: 'string'},
      title: 'allow-insecure config',
      type: 'array',
      uniqueItems: true,
    },
  },
  {
    argSpec: {
      arg: 'base-path',
      defaultValue: '',
      dest: 'basePath',
      extName: undefined,
      extType: undefined,
      name: 'base-path',
      rawDest: 'basePath',
      ref: 'appium.json#/properties/server/properties/base-path',
    },
    schema: {
      appiumCliAliases: ['pa'],
      default: '',
      description:
        'Base path to use as the prefix for all webdriver routes running on the server',
      title: 'base-path config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'callback-address',
      defaultValue: undefined,
      dest: 'callbackAddress',
      extName: undefined,
      extType: undefined,
      name: 'callback-address',
      rawDest: 'callbackAddress',
      ref: 'appium.json#/properties/server/properties/callback-address',
    },
    schema: {
      appiumCliAliases: ['ca'],
      description: 'Callback IP address (default: same as "address")',
      title: 'callback-address config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'callback-port',
      defaultValue: 4723,
      dest: 'callbackPort',
      extName: undefined,
      extType: undefined,
      name: 'callback-port',
      rawDest: 'callbackPort',
      ref: 'appium.json#/properties/server/properties/callback-port',
    },
    schema: {
      appiumCliAliases: ['cp'],
      default: 4723,
      description: 'Callback port (default: same as "port")',
      maximum: 65535,
      minimum: 1,
      title: 'callback-port config',
      type: 'integer',
    },
  },
  {
    argSpec: {
      arg: 'debug-log-spacing',
      defaultValue: false,
      dest: 'debugLogSpacing',
      extName: undefined,
      extType: undefined,
      name: 'debug-log-spacing',
      rawDest: 'debugLogSpacing',
      ref: 'appium.json#/properties/server/properties/debug-log-spacing',
    },
    schema: {
      default: false,
      description:
        'Add exaggerated spacing in logs to help with visual inspection',
      title: 'debug-log-spacing config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'default-capabilities',
      defaultValue: undefined,
      dest: 'defaultCapabilities',
      extName: undefined,
      extType: undefined,
      name: 'default-capabilities',
      rawDest: 'defaultCapabilities',
      ref: 'appium.json#/properties/server/properties/default-capabilities',
    },
    schema: {
      $comment: 'TODO',
      appiumCliAliases: ['dc'],
      description:
        'Set the default desired capabilities, which will be set on each session unless overridden by received capabilities. If a string, a path to a JSON file containing the capabilities, or raw JSON.',
      title: 'default-capabilities config',
      type: 'object',
    },
  },
  {
    argSpec: {
      arg: 'deny-insecure',
      defaultValue: [],
      dest: 'denyInsecure',
      extName: undefined,
      extType: undefined,
      name: 'deny-insecure',
      rawDest: 'denyInsecure',
      ref: 'appium.json#/properties/server/properties/deny-insecure',
    },
    schema: {
      $comment: 'Allowed values are defined by drivers',
      appiumCliTransformer: 'csv',
      default: [],
      description:
        'Set which insecure features are not allowed to run in this server\'s sessions. Features are defined on a driver level; see documentation for more details. Features listed here will not be enabled even if also listed in "allow-insecure", and even if "relaxed-security" is enabled. If string, a path to a text file containing policy or a comma-delimited list.',
      items: {type: 'string'},
      title: 'deny-insecure config',
      type: 'array',
      uniqueItems: true,
    },
  },
  {
    argSpec: {
      arg: 'keep-alive-timeout',
      defaultValue: 600,
      dest: 'keepAliveTimeout',
      extName: undefined,
      extType: undefined,
      name: 'keep-alive-timeout',
      rawDest: 'keepAliveTimeout',
      ref: 'appium.json#/properties/server/properties/keep-alive-timeout',
    },
    schema: {
      appiumCliAliases: ['ka'],
      default: 600,
      description:
        'Number of seconds the Appium server should apply as both the keep-alive timeout and the connection timeout for all requests. A value of 0 disables the timeout.',
      minimum: 0,
      title: 'keep-alive-timeout config',
      type: 'integer',
    },
  },
  {
    argSpec: {
      arg: 'local-timezone',
      defaultValue: false,
      dest: 'localTimezone',
      extName: undefined,
      extType: undefined,
      name: 'local-timezone',
      rawDest: 'localTimezone',
      ref: 'appium.json#/properties/server/properties/local-timezone',
    },
    schema: {
      default: false,
      description: 'Use local timezone for timestamps',
      title: 'local-timezone config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'log',
      defaultValue: undefined,
      dest: 'logFile',
      extName: undefined,
      extType: undefined,
      name: 'log',
      rawDest: 'logFile',
      ref: 'appium.json#/properties/server/properties/log',
    },
    schema: {
      appiumCliAliases: ['g'],
      appiumCliDest: 'logFile',
      description: 'Also send log output to this file',
      title: 'log config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'log-filters',
      defaultValue: undefined,
      dest: 'logFilters',
      extName: undefined,
      extType: undefined,
      name: 'log-filters',
      rawDest: 'logFilters',
      ref: 'appium.json#/properties/server/properties/log-filters',
    },
    schema: {
      $comment: 'TODO',
      description: 'One or more log filtering rules',
      items: {type: 'string'},
      title: 'log-filters config',
      type: 'array',
    },
  },
  {
    argSpec: {
      arg: 'log-level',
      defaultValue: 'debug',
      dest: 'loglevel',
      extName: undefined,
      extType: undefined,
      name: 'log-level',
      rawDest: 'loglevel',
      ref: 'appium.json#/properties/server/properties/log-level',
    },
    schema: {
      appiumCliDest: 'loglevel',
      default: 'debug',
      description: 'Log level (console[:file])',
      enum: [
        'info',
        'info:debug',
        'info:info',
        'info:warn',
        'info:error',
        'warn',
        'warn:debug',
        'warn:info',
        'warn:warn',
        'warn:error',
        'error',
        'error:debug',
        'error:info',
        'error:warn',
        'error:error',
        'debug',
        'debug:debug',
        'debug:info',
        'debug:warn',
        'debug:error',
      ],
      title: 'log-level config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'log-no-colors',
      defaultValue: false,
      dest: 'logNoColors',
      extName: undefined,
      extType: undefined,
      name: 'log-no-colors',
      rawDest: 'logNoColors',
      ref: 'appium.json#/properties/server/properties/log-no-colors',
    },
    schema: {
      default: false,
      description: 'Do not use color in console output',
      title: 'log-no-colors config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'log-timestamp',
      defaultValue: false,
      dest: 'logTimestamp',
      extName: undefined,
      extType: undefined,
      name: 'log-timestamp',
      rawDest: 'logTimestamp',
      ref: 'appium.json#/properties/server/properties/log-timestamp',
    },
    schema: {
      default: false,
      description: 'Show timestamps in console output',
      title: 'log-timestamp config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'long-stacktrace',
      defaultValue: false,
      dest: 'longStacktrace',
      extName: undefined,
      extType: undefined,
      name: 'long-stacktrace',
      rawDest: 'longStacktrace',
      ref: 'appium.json#/properties/server/properties/long-stacktrace',
    },
    schema: {
      default: false,
      description:
        'Add long stack traces to log entries. Recommended for debugging only.',
      title: 'long-stacktrace config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'no-perms-check',
      defaultValue: false,
      dest: 'noPermsCheck',
      extName: undefined,
      extType: undefined,
      name: 'no-perms-check',
      rawDest: 'noPermsCheck',
      ref: 'appium.json#/properties/server/properties/no-perms-check',
    },
    schema: {
      default: false,
      description:
        'Do not check that needed files are readable and/or writable',
      title: 'no-perms-check config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'nodeconfig',
      defaultValue: undefined,
      dest: 'nodeconfig',
      extName: undefined,
      extType: undefined,
      name: 'nodeconfig',
      rawDest: 'nodeconfig',
      ref: 'appium.json#/properties/server/properties/nodeconfig',
    },
    schema: {
      $comment:
        'Selenium Grid 3 is unmaintained and Selenium Grid 4 no longer supports this file.',
      description:
        'Path to configuration JSON file to register Appium as a node with Selenium Grid 3; otherwise the configuration itself',
      title: 'nodeconfig config',
      type: 'object',
    },
  },
  {
    argSpec: {
      arg: 'port',
      defaultValue: 4723,
      dest: 'port',
      extName: undefined,
      extType: undefined,
      name: 'port',
      rawDest: 'port',
      ref: 'appium.json#/properties/server/properties/port',
    },
    schema: {
      appiumCliAliases: ['p'],
      default: 4723,
      description: 'Port to listen on',
      maximum: 65535,
      minimum: 1,
      title: 'port config',
      type: 'integer',
    },
  },
  {
    argSpec: {
      arg: 'relaxed-security',
      defaultValue: false,
      dest: 'relaxedSecurityEnabled',
      extName: undefined,
      extType: undefined,
      name: 'relaxed-security',
      rawDest: 'relaxedSecurityEnabled',
      ref: 'appium.json#/properties/server/properties/relaxed-security',
    },
    schema: {
      appiumCliDest: 'relaxedSecurityEnabled',
      default: false,
      description:
        'Disable additional security checks, so it is possible to use some advanced features, provided by drivers supporting this option. Only enable it if all the clients are in the trusted network and it\'s not the case if a client could potentially break out of the session sandbox. Specific features can be overridden by using "deny-insecure"',
      title: 'relaxed-security config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'session-override',
      defaultValue: false,
      dest: 'sessionOverride',
      extName: undefined,
      extType: undefined,
      name: 'session-override',
      rawDest: 'sessionOverride',
      ref: 'appium.json#/properties/server/properties/session-override',
    },
    schema: {
      default: false,
      description: 'Enables session override (clobbering)',
      title: 'session-override config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'strict-caps',
      defaultValue: false,
      dest: 'strictCaps',
      extName: undefined,
      extType: undefined,
      name: 'strict-caps',
      rawDest: 'strictCaps',
      ref: 'appium.json#/properties/server/properties/strict-caps',
    },
    schema: {
      default: false,
      description:
        'Cause sessions to fail if desired caps are sent in that Appium does not recognize as valid for the selected device',
      title: 'strict-caps config',
      type: 'boolean',
    },
  },
  {
    argSpec: {
      arg: 'tmp',
      defaultValue: undefined,
      dest: 'tmpDir',
      extName: undefined,
      extType: undefined,
      name: 'tmp',
      rawDest: 'tmpDir',
      ref: 'appium.json#/properties/server/properties/tmp',
    },
    schema: {
      appiumCliDest: 'tmpDir',
      description:
        'Absolute path to directory Appium can use to manage temp files. Defaults to C:\\Windows\\Temp on Windows and /tmp otherwise.',
      title: 'tmp config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'trace-dir',
      defaultValue: undefined,
      dest: 'traceDir',
      extName: undefined,
      extType: undefined,
      name: 'trace-dir',
      rawDest: 'traceDir',
      ref: 'appium.json#/properties/server/properties/trace-dir',
    },
    schema: {
      description:
        'Absolute path to directory Appium can use to save iOS instrument traces; defaults to <tmp>/appium-instruments',
      title: 'trace-dir config',
      type: 'string',
    },
  },
  {
    argSpec: {
      arg: 'use-drivers',
      defaultValue: [],
      dest: 'useDrivers',
      extName: undefined,
      extType: undefined,
      name: 'use-drivers',
      rawDest: 'useDrivers',
      ref: 'appium.json#/properties/server/properties/use-drivers',
    },
    schema: {
      appiumCliDescription:
        'A list of drivers to activate. Can be a comma-delimited string or path to CSV file. By default, all installed drivers will be activated.',
      default: [],
      description:
        'A list of drivers to activate. By default, all installed drivers will be activated.',
      items: {type: 'string'},
      title: 'use-drivers config',
      type: 'array',
      uniqueItems: true,
    },
  },
  {
    argSpec: {
      arg: 'use-plugins',
      defaultValue: [],
      dest: 'usePlugins',
      extName: undefined,
      extType: undefined,
      name: 'use-plugins',
      rawDest: 'usePlugins',
      ref: 'appium.json#/properties/server/properties/use-plugins',
    },
    schema: {
      appiumCliDescription:
        'A list of plugins to activate. Can be a comma-delimited string, path to CSV file, or the string "all" to use all installed plugins.',
      default: [],
      description:
        'A list of plugins to activate. To activate all plugins, the value should be an array with a single item "all".',
      items: {type: 'string'},
      title: 'use-plugins config',
      type: 'array',
      uniqueItems: true,
    },
  },
  {
    argSpec: {
      arg: 'webhook',
      defaultValue: undefined,
      dest: 'webhook',
      extName: undefined,
      extType: undefined,
      name: 'webhook',
      rawDest: 'webhook',
      ref: 'appium.json#/properties/server/properties/webhook',
    },
    schema: {
      $comment:
        'This should probably use a uri-template format to restrict the protocol to http/https',
      appiumCliAliases: ['G'],
      description: 'Also send log output to this http listener',
      format: 'uri',
      title: 'webhook config',
      type: 'string',
    },
  }
];
