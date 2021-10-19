import React, { useEffect, useRef }  from 'react'
import styled from 'styled-components'
import Activity from './Activity';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from 'xterm-addon-attach';
const proxmox = require('proxmox-client');

export default function Console({data, serviceConsole}) {
    let states = {
        start:         1,
        connecting:    2,
        connected:     3,
        disconnecting: 4,
        disconnected:  5,
        reconnecting:  6,
    };
    let state = states.start;
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
      proxmox.post('/nodes/'+serviceConsole.node+'/'+serviceConsole.type+'/'+serviceConsole.machine+'/termproxy', undefined).then((res) => {
        if(res.status !== 200) {
          console.log("statusCode is not 200");
        }
        res = JSON.parse(res.text).data;
        console.log(res);
        let protocol = (window.location.protocol === 'https:') ? 'wss://' : 'ws://';
        let ticket = encodeURIComponent(res.ticket);
        let port = encodeURIComponent(res.port);
        let socketUrl = protocol+window.location.host+'/api2/json/nodes/'+serviceConsole.node+'/'+serviceConsole.type+'/'+serviceConsole.machine+'/vncwebsocket?port='+port+'&vncticket='+ticket
        const socket = new WebSocket(socketUrl);
        socket.binaryType = 'arraybuffer';
        socket.onopen = function (e) {
            socket.send(serviceConsole.username+":" + res.ticket + "\n");
            state = states.connected;
        };
        const attachAddon = new AttachAddon(socket);
        term.loadAddon(attachAddon);
        term.onData(function(data) {
            if (state === states.connected) {
                socket.send("0:" + unescape(encodeURIComponent(data)).length.toString() + ":" + data);
            }
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
      }).catch((err) => {
        console.log(err);
      });
    });
    const activities = [
        {
            name: "drunkenpirate47x",
            message: "Destroyed the service",
            emitTime: "Jun 19 at 1:24 AM"
        },
        {
            name: "drunkenpirate47x",
            message: "Started the service",
            emitTime: "Jun 8 at 1:25 AM"
        }
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                <ConsoleWrapper ref={XTerm}>
                </ConsoleWrapper>
                <ActivityWrapper>
                    <ActivityHeading>
                        <ActivityText>
                            Latest activities
                        </ActivityText>
                    </ActivityHeading>
                    {activities.map((activity, index) => {
                        return (<Activity activity={activity} key={index} />)
                    })}
                </ActivityWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ActivityText = styled.span `
    color: var(--white);
    opacity: .8;

    font-style: normal;
    font-weight: 500;
    font-size: 1.497rem;
`;

const ActivityHeading = styled.div `
    width: 100%;
    height: fit-content;
    margin-bottom: 10px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActivityWrapper = styled.div `
    background: var(--secondary-background);
    height: 100%;
    padding: 35px 10px;

    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
`; 

const TemporaryText = styled.p `
    color: var(--white);
    position: absolute;
    top: 40px;
    left: 30px;
    padding-right: 30px;
    max-width: 500px;
`;

const ConsoleWrapper = styled.div `
    height: 100%;
    background: black;
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