import { Server as IOServer, Socket } from 'socket.io';
import { Server } from 'http';

export class ChatServer {
  private io: IOServer;
  
  constructor(server: Server) {
    this.io = new IOServer(server, {
      cors: {
        origin: '*',
      }
    });
    this.run();
  }

  private run() {
    //@ts-ignore
    this.io.of((name, query, next) => {
      //@ts-ignore
      next(null, true);
    })
    .on('connection', (socket: Socket) => {
      const namespace = socket.nsp;
      socket.on('chat message', data => {
        namespace.emit('chat message', data)
      })
    })
  }
}