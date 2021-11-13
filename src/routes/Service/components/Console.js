import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Activity from './Activity';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from 'xterm-addon-attach';
import '../../../../node_modules/xterm/css/xterm.css';
const proxmox = require('proxmox-client');

export default function Console({data, serviceConsole, serviceNotActivated}) {
    const XTerm = useRef(null);

    useEffect(() => {

        if (serviceNotActivated) {
           return null; 
        }

        // list nodes
        let term;
        const fitAddon = new FitAddon();

        term = new Terminal({
            
        });

        //Styling
        term.setOption("theme", {
            
            background: "black",
            foreground: "white"
        
        });

        term.loadAddon(fitAddon);
        term.open(XTerm.current);
        term.write(' Please wait \x1B[1;3;31mConnecting...\x1B[0m $ ')

        fitAddon.fit();
        
        proxmox.auth('localhost:3000', serviceConsole.username, serviceConsole.password).then(() => {
            
            proxmox.post(`/nodes/${serviceConsole.node}/${serviceConsole.type}/${serviceConsole.machine}/termproxy`, undefined).then((res) => {
                
                if(res.status !== 200) {
                
                    console.log("statusCode is not 200");
                
                } else if (res.status === 200) {
                    term.write(' Service was connected successfully $ ')
                }

                res = JSON.parse(res.text).data;
                console.log(res);
                let ticket = encodeURIComponent(res.ticket);
                let port = encodeURIComponent(res.port);
                
                let socketUrl = 'ws://localhost:3000/api2/json/nodes/'+serviceConsole.node+'/'+serviceConsole.type+'/'+serviceConsole.machine+'/vncwebsocket?port='+port+'&vncticket='+ticket
                const socket = new WebSocket(socketUrl);
                
                socket.binaryType = 'arraybuffer';
                
                socket.onopen = function (e) {
                
                    socket.send(serviceConsole.username+":" + res.ticket + "\n");

                };

                const attachAddon = new AttachAddon(socket);
                term.loadAddon(attachAddon);
                term.onData(function(data) {

                    if (socket.CONNECTING) {
                        socket.send("0:" + unescape(encodeURIComponent(data)).length.toString() + ":" +  data);
                    }
                    
                });

            })
        
            .catch((err) => {
                console.log('Error:', err);
            });

        
        }).catch((err) => {
            console.log('Error:', err);
        });

    });

    return (
        <Wrapper>
            <InnerWrapper>
                {serviceNotActivated ? (
                    <MessageWrapper>
                        <Message> You cannot use Console if service status is inactive or pending, please make sure this service is activated to use console</Message>
                    </MessageWrapper>
                ) : (
                    <ConsoleWrapper>
                        <ConsoleElem ref={XTerm}>
                        
                        </ConsoleElem>
                    </ConsoleWrapper>
                )}
            </InnerWrapper>
        </Wrapper>
    )
}

const Message = styled.div `
    color: #CED2D8;
    font-size: 18px;

`;

const MessageWrapper = styled.div `
    width: 100%;
    height: fit-content;
    max-width: 800px;
    padding-top: 10px;
`;

const ConsoleElem = styled.div `
    width: fit-content;
    height: fit-content;
`;

const ConsoleWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    padding: 15px;
    background: black;
`

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1400px;
`;


const Wrapper = styled.div `
    width: 100%;
    margin-top: 30px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;