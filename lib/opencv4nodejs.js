const promisify = require('./promisify');
const extendWithJsSources = require('./src');

bindings = require('../build/Release/opencv4nodejs.node');

// promisify async methods
cv = promisify(bindings);
cv = extendWithJsSources(cv);

module.exports = cv;
