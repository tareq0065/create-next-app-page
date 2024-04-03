#!/usr/bin/env node
import require$$0 from 'fs';
import require$$1 from 'path';
import require$$2 from 'inquirer';

var __dirname = '/Users/tareqaziz/workspace/npm/create-next-app-page/src';

var global$1 = (typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {});

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version$1 = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version$1,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var src = {};

var name$1 = "@airoom/create-next-app-page";
var version = "0.1.7";
var description = "CLI to scaffold Next.js pages";
var main = "dist/index.js";
var type = "module";
var scripts = {
	build: "rollup -c",
	"build:link": "rollup -c && npm link --force",
	prepublishOnly: "npm run build"
};
var bin = {
	cnap: "./dist/index.mjs"
};
var files = [
	"dist",
	"templates/**/*"
];
var keywords = [
	"nextjs",
	"nextjs-app-router",
	"cli",
	"nextjs-cli",
	"scaffolding",
	"page-generator",
	"component-generator",
	"boilerplate-generator",
	"react",
	"developer-tools",
	"code-generation",
	"template",
	"nextjs-template",
	"project-setup",
	"build-tools",
	"automation",
	"file-generator"
];
var bugs = {
	url: "https://github.com/tareq0065/create-next-app-page/issues"
};
var repository = {
	type: "git",
	url: "https://github.com/tareq0065/create-next-app-page.git"
};
var author = {
	name: "Tareq Aziz",
	email: "tareqaziz0065@gmail.com",
	url: "https://github.com/tareq0065"
};
var maintainers = [
	{
		name: "Tareq Aziz",
		email: "tareqaziz0065@gmail.com",
		url: "https://github.com/tareq0065"
	}
];
var license = "MIT";
var devDependencies = {
	"@babel/core": "^7.24.3",
	"@babel/preset-env": "^7.24.3",
	"@rollup/plugin-babel": "^6.0.4",
	"@rollup/plugin-commonjs": "^25.0.7",
	"@rollup/plugin-json": "^6.1.0",
	"@rollup/plugin-node-resolve": "^15.2.3",
	prettier: "^3.2.5",
	rollup: "^4.13.2",
	"rollup-plugin-copy": "^3.5.0",
	"rollup-plugin-node-builtins": "^2.1.2",
	"rollup-plugin-node-globals": "^1.4.0"
};
var dependencies = {
	inquirer: "^9.2.17",
	yargs: "^17.7.2"
};
var require$$3 = {
	name: name$1,
	version: version,
	description: description,
	main: main,
	type: type,
	scripts: scripts,
	bin: bin,
	files: files,
	keywords: keywords,
	bugs: bugs,
	repository: repository,
	author: author,
	maintainers: maintainers,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies
};

const fs = require$$0;
const path = require$$1;
const inquirer = require$$2;
const { name } = require$$3;

function findTemplatesDir() {
  // Common paths to check
  const possiblePaths = [
    path.join(__dirname, 'templates'), // Local development
    path.join(__dirname, '..', 'templates'), // Global, standard Node.js
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      'lib',
      'node_modules',
      name,
      'templates',
    ), // nvm or n
    // Add more paths as needed
  ];

  // Check each path and return the first one that exists
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }

  // Fallback or throw an error if the templates directory cannot be found
  throw new Error('Templates directory not found');
}

// Function to ask for path and page name
async function getPathAndPageName() {
  const questions = [
    {
      type: 'input',
      name: 'path',
      message: 'Path:',
      validate: function (value) {
        const pass = value.match(/^[a-zA-Z0-9\/]*$/);
        if (pass) {
          return true;
        }

        return 'Please enter a valid path (alphanumeric and slashes only)';
      },
    },
    {
      type: 'input',
      name: 'pageName',
      message: 'Page name:',
      validate: function (value) {
        // Simple CamelCase validation: starts with an uppercase letter followed by lowercase letters/numbers
        if (/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return true;
        }
        return 'Please enter a valid page name in CamelCase (e.g., MyPage)';
      },
    },
  ];

  return inquirer.prompt(questions);
}

async function createComponent() {
  const { path: userPath, pageName } = await getPathAndPageName();
  const basePath = './' + path.join(process.cwd(), 'app', userPath);
  const templatesDir = findTemplatesDir();

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  fs.readdirSync(templatesDir).forEach((file) => {
    let content = fs.readFileSync(path.join(templatesDir, file), 'utf8');

    // Dynamically replace the component name based on the file type
    if (file === 'page.js') {
      content = content.replace(/PageName/g, pageName);
    } else if (file === 'template.js') {
      content = content.replace(/PageNameTemplate/g, `${pageName}Template`);
    } else if (file === 'layout.js') {
      content = content.replace(/PageNameLayout/g, `${pageName}Layout`);
    } else if (file === 'loader.js') {
      content = content.replace(/PageNameLoader/g, `${pageName}Loader`);
    }

    fs.writeFileSync(path.join(basePath, file), content);
  });

  console.log(`Component '${pageName}' created successfully at '${userPath}'`);
}

createComponent();

export { src as default };
