var logger = require('../utils/logger');
function MapHanlder(server) {
    this.io = require('socket.io')(server);

    this.subscribe = function (socket, room) {
        logger.debug("subscribe room:" + room);
        socket.join(room);
    };

    this.sendLocation = function (socket, data) {
        logger.debug("sending location:" + data);
        socket.broadcast.to(data.room).emit("receive location", {
            latitude: data.latitude,
            longitude: data.longitude,
            orientation: data.orientation
        })
    };

    this.disconnect = function (socket) {
        logger.debug("disconnect");
    }
}

MapHanlder.prototype.run = function run() {
    var self = this;
    self.io.on('connection', function (socket) {
        setInterval(function() {
            self.io.emit("heartbeat", "heartbeat in:" + new Date().toLocaleString());
        }, 2000);

        socket.on('subscribe', function (room) {
            this.subscribe(socket, room);
        }.bind(self));
        socket.on('send location', function (data) {
            this.sendLocation(socket, data);
        }.bind(self));
        socket.on('disconnect', function (room) {
            this.disconnect(socket);
        }.bind(self));
    });
};

exports = module.exports = MapHanlder;