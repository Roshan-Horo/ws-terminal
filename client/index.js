import { TerminalUI } from './TerminalUI.js';
import io from 'socket.io-client'

const serverAddress = "wss://western-saw.codedamn.app:1338/"

function connectToSocket(serverAddress){
    return new Promise(res => {
        const socket = io(serverAddress);
        res(socket)
    })
}

function startTerminal(container, socket){
    // create an xterm.js instance
    const terminal = new TerminalUI(socket)

    // Attach created terminal to a DOM element.
    terminal.attachTo(container);

    // when terminal attached to DOM, start listening for input, output events.
    terminal.startListening();
}

function start(){
    const container = document.getElementById('terminal-container');

    // connect to socket and when it is available, start terminal.
    connectToSocket(serverAddress)
        .then(socket => {
            startTerminal(container, socket)
        })
}

start()