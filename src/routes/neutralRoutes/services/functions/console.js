// Dependencies
import { AttachAddon } from 'xterm-addon-attach';
const proxmox = require('proxmox-client');


function handleTerminalConnection ({terminalData, term, terminalState, terminalStates}) {

    let {node, type, machine, username} = terminalData;
    let postRequestPath = `/nodes/${node}/${type}/${machine}/termproxy`;

    proxmox.post(postRequestPath, undefined)
        
        .then((response) => {
    
            // faled to post, break function;
            if (response.status !== 200) {
                terminalData.log("statusCode is not 200" + '\n');
                return null;
            }

            // parse the response data
            response = JSON.parse(response.text).data;

            let protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
            let ticket = encodeURIComponent(response.ticket);
            let port = encodeURIComponent(response.port);
            
            // socket connection url
            let socketUrl = `${protocol}${window.location.host}/api2/json/nodes/${node}/${type}/${machine}/vncwebsocket?port=${port}&vncticket=${ticket}`
            let sUrl = protocol+window.location.host+'/api2/json/nodes/'+node+'/'+type+'/'+machine+'/vncwebsocket?port='+port+'&vncticket='+ticket

            // socket initialization
            const socket = new WebSocket(sUrl);
            socket.binaryType = 'arraybuffer';

            // socket on open event initialization
            socket.onopen = function (e) { 
                socket.send(username+":" + response.ticket + "\n");
                terminalState = terminalStates.connected;
            };

            // attach addon initilization with socket
            const attachAddon = new AttachAddon(socket);
            term.loadAddon(attachAddon);
        
            // on terminal data change, trigger this event
            term.onData(function(data) {
                if (terminalState !== terminalState.connected) {
                    console.log('TERMINAL-NOT-CONNECTED')
                }
                
                // send data with socket.send
                socket.send("0:" + unescape(encodeURIComponent(data)).length.toString() + ":" + data);
            });
    
    })

    
    // Terminal Connection Error Handler
    .catch((err) => {
    
        console.log('Error:', err);
    
    });

}

function handleTerminalAuthentication ({terminalData, term, terminalState, terminalStates}) {
    
    let {username, password} = terminalData;
    let authenticationPath = `${window.location.protocol}//${window.location.host}`;

    // proxmox authentication
    // if succeeds then run handleTerminalConnection 
    // if fails, show error
    proxmox.auth(authenticationPath, username, password)
        .then(() => handleTerminalConnection({terminalData, term, terminalState, terminalStates}))
        .catch((err) => {console.log(err)});

    
}

export {handleTerminalAuthentication, handleTerminalConnection}