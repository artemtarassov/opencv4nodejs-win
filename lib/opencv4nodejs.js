const promisify = require('./promisify');
const extendWithJsSources = require('./src');
const path = require('path');
const fs = require('fs');
const isElectron = process.versions.hasOwnProperty('electron');

if (isElectron) {
  var electron;
  try {
    electron = require("electron");
  } catch(e) {
  }
  if(electron && electron.app) {
    const appPath = (electron.app).getAppPath();
    const erbNodeModules="release/app/node_modules/opencv4nodejs-prebuilt/build/Release/opencv4nodejs.node";
    const forgeNodeModules="node_modules/opencv4nodejs-prebuilt/build/Release/opencv4nodejs.node";
    let modulePath = path.resolve(appPath, erbNodeModules);
    if(!fs.existsSync(modulePath)) {
      modulePath=path.resolve(appPath, forgeNodeModules);
    }
    bindings = require(modulePath);
  } else {
    bindings = require('../build/Release/opencv4nodejs.node');
  }
} else {
  bindings = require('../build/Release/opencv4nodejs.node');
}

// promisify async methods
cv = promisify(bindings);
cv = extendWithJsSources(cv);

module.exports = cv;
