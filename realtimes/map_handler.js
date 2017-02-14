var logger = require('../utils/logger');
function MapHanlder(server) {
    this.io = require('socket.io')(server);

    this.subscribe = function (socket, room) {
        logger.debug("subscribe room:" + room);
        socket.join(room);
    };

    this.sendLocation = function (socket, data) {
        logger.debug("sending location:" + data);
    };

    this.disconnect = function (socket) {
        logger.debug("disconnect");
    }
}

MapHanlder.prototype.run = function run() {
    this.io.on('connection', function (socket) {
        socket.on('subscribe', function (room) {
            this.subscribe(socket, room);
        }.bind(this));
        socket.on('send location', function (data) {
            this.sendLocation(socket, data);
        }.bind(this));
        socket.on('disconnect', function (room) {
            this.disconnect(socket);
        }.bind(this));
    });
};

exports = module.exports = MapHanlder;