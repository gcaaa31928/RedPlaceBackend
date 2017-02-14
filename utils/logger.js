var Log = require('log'),
    log = new Log('debug');
var logger = function () {
};

logger.prototype.info = function info(msg) {
    log.info(msg);
};

logger.prototype.debug = function debug(msg) {
    log.debug(msg);
};

logger.prototype.error = function error(msg) {
    log.error(msg);
};

exports = module.exports = new logger();