import { Terminal } from 'xterm';
import 'xterm/css/xterm.css'

export class TerminalUI {
    constructor(socket){
        this.terminal = new Terminal()
    
    this.terminal.setOption("theme", {
        background: '#202B33',
        foreground: '#F5F8FA'
    })

    this.socket = socket;

    }

    // attach event listeners for terminal UI and socket.io client
    startListening() {
        this.terminal.onData(data => this.sendInput(data))
        this.socket.on('output', data => {
            // when there is data from pty server terminal, print on terminal
        this.write(data)
        })
    }

    write(text){
        this.terminal.write(text)
    }

    // function to print new line on terminal
    prompt(){
        this.terminal.write('\\r\\n$ ');
    }

    // send terminal input ( command ) to pty on server

    sendInput(input){
        this.socket.emit('input', input)
    }

    // attach terminal to dom

    attachTo(container){
        this.terminal.open(container);
        // default text to display on terminal
        this.terminal.write("Terminal Connected to Server")
        this.terminal.write('');
        this.prompt()
    }

    clear(){
        this.terminal.clear()
    }
}