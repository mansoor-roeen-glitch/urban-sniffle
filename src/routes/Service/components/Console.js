import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Activity from './Activity';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from 'xterm-addon-attach';
const proxmox = require('proxmox-client');

export default function Console({data, serviceConsole}) {

    console.log(serviceConsole)

    const XTerm = useRef(null);

    useEffect(() => {
        console.log("myContainer..", XTerm.current);

        // list nodes
        let term;
        const fitAddon = new FitAddon();

        term = new Terminal({

            convertEol: true,
            fontFamily: `'Fira Mono', monospace`,
            fontSize: 15,
            fontWeight: 900,
            rendererType: "dom" // default is canvas
        
        });

        //Styling
        term.setOption("theme", {
            
            background: "black",
            foreground: "white"
        
        });

        term.loadAddon(fitAddon);
        term.open(XTerm.current);
        fitAddon.fit();
        
        proxmox.auth('localhost:3000', serviceConsole.username, serviceConsole.password).then(() => {
            
            proxmox.post(`/nodes/${serviceConsole.node}/${serviceConsole.type}/${serviceConsole.machine}/termproxy`, undefined).then((res) => {
                
                if(res.status !== 200) {
                
                    console.log("statusCode is not 200");
                
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
                <ConsoleWrapper ref={XTerm}>
                
                </ConsoleWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ConsoleWrapper = styled.div `
    height: fit-content;
    width: fit-content;
`

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1400px;
    height: 500px;

    display: grid;
    grid-template-columns: 2.6fr auto;
    grid-template-rows: auto;
    column-gap: 30px;

    @media screen and (max-width: 1400px) {
        column-gap: 35px;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: auto;
        grid-template-rows: 450px 400px;
        column-gap: 0px;
        row-gap: 30px;
        height: fit-content;
        padding-bottom: 50px;
    }
`;


const Wrapper = styled.div `
    width: 100%;
    margin-top: 30px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;