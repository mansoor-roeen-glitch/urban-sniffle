// Dependencies
import { AttachAddon } from 'xterm-addon-attach';
const proxmox = require('proxmox-client');


function handleTerminalConnection ({terminalData, term, terminalState, terminalStates}) {
    
    proxmox.post('/nodes/'+terminalData.node+'/'+terminalData.type+'/'+terminalData.machine+'/termproxy', undefined).then((res) => {
        
        if(res.status !== 200) {
            terminalData.log("statusCode is not 200");
        }
        
        res = JSON.parse(res.text).data;

        let protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
        let ticket = encodeURIComponent(res.ticket);
        let port = encodeURIComponent(res.port);

        let socketUrl = protocol+window.location.host+'/api2/json/nodes/'+terminalData.node+'/'+terminalData.type+'/'+terminalData.machine+'/vncwebsocket?port='+port+'&vncticket='+ticket
        const socket = new WebSocket(socketUrl);
        socket.binaryType = 'arraybuffer';

        socket.onopen = function (e) {
            socket.send(terminalData.username+":" + res.ticket + "\n");
            terminalState = terminalStates.connected;
        };

        const attachAddon = new AttachAddon(socket);
        term.loadAddon(attachAddon);
        term.onData(function(data) {
            if (terminalState === terminalStates.connected) {
                socket.send("0:" + unescape(encodeURIComponent(data)).length.toString() + ":" + data);
            }
        });
    })

    // Terminal Connection Error Handler
    .catch((err) => {
        console.log('Error:', err);
    });

}

function handleTerminalAuthentication ({terminalData, term, terminalState, terminalStates}) {

    proxmox.auth(window.location.protocol+'//'+window.location.host, terminalData.username, terminalData.password).then(() => {
            
        // Terminal Connection
        handleTerminalConnection({terminalData, term, terminalState, terminalStates})

    // Terminal Authentication Error Handler
    }).catch((err) => {
        console.log(err);
    });


}

export {handleTerminalAuthentication, handleTerminalConnection}