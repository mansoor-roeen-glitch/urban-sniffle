// Dependencies
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import '../../../../node_modules/xterm/css/xterm.css';
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { handleTerminalAuthentication } from '../functions/console';

export default function Console({service, terminalData, status}) {
    
    // Component Variables

    let terminalStates = {
        start:         1,
        connecting:    2,
        connected:     3,
        disconnecting: 4,
        disconnected:  5,
        reconnecting:  6,
    };
    
    let terminalState = terminalStates.start;

    // Component States
    const XTerm = useRef(null);     
    
    // Component Functions
    const handleTerminalInitialization = () => {
        
        // Terminal Initialization
        let term;
        const fitAddon = new FitAddon();
        term = new Terminal({});
        
        // Terminal Styling
        term.setOption("theme", {
            background: "black",
            foreground: "#DDDDDD"
        });

        // Terminal Initialization
        term.loadAddon(fitAddon);
        term.open(XTerm.current);
        term.write('connecting serial terminal ...')
        fitAddon.fit();

        // Terminal Authentication And Connection
        handleTerminalAuthentication({terminalData, term, terminalStates, terminalState});

    }

    // Use Effect
    useEffect(handleTerminalInitialization, []);

    return (
        <Wrapper>
            <InnerWrapper>
                <ConsoleElemWrapper>
                    <ConsoleElem ref={XTerm} />
                </ConsoleElemWrapper>
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

const ConsoleElemWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    padding: 15px;
    background: black;
`

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1600px;
`;


const Wrapper = styled.div `
    width: 100%;
    margin-top: 30px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;