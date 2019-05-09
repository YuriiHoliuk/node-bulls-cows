const http = require('http');

const SERVER_PROP_NAME = 'httpServer';
const symbolServerKey = Symbol(SERVER_PROP_NAME);

class GameServer {
    constructor(handler) {
        this[symbolServerKey] = http.createServer(handler);
    }

    listen(port) {
        this[symbolServerKey].listen(port);
    }

    stopListen(port) {
        this[symbolServerKey].close();
    }
}

module.exports = GameServer;
