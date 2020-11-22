"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const socket_io_1 = require("socket.io");
class ChatServer {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: '*',
            }
        });
        this.run();
    }
    run() {
        this.io.of((name, query, next) => {
            next(null, true);
        })
            .on('connection', (socket) => {
            const namespace = socket.nsp;
            socket.on('chat message', data => {
                namespace.emit('chat message', data);
            });
        });
    }
}
exports.ChatServer = ChatServer;
//# sourceMappingURL=ChatServer.js.map