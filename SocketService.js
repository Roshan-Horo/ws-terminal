const socketIO = require('socket.io')
const ptyService = require('./PtyService.js')

class SocketService {
    constructor() {
        this.socket = null;
        this.pty = null
    }

    attachServer(server){
        if(!server){
            throw new Error('Server not found')
        }

        const io = socketIO(server)
        console.log('Created socket server. Waiting for client connection.');

        // connection event - when client connects
        io.on('connection', socket => {
            console.log('client connect to socket : ', socket.id)

            this.socket = socket;

        this.socket.on('disconnect', () => {
            console.log('Disconnected Socket: ', socket.id)
        })

        // create a new pty service for client
        this.pty = new ptyService(this.socket)

        // attach event listener for socket.io
        this.socket.on('input', input => {
            // runs this listener when socket receives "input" events from socket.io client
            // input event is emitted on client side when user types in terminal UI
            this.pty.write(input)
        })

        })

    }
}

module.exports = SocketService;