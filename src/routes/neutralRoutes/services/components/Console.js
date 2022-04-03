// Dependencies
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import '../../../../../node_modules/xterm/css/xterm.css';
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
        
        // if terminal data is missing then show error in terminal
        if (terminalData.success === false) {
            term.write('Failed to authenticate, please make sure service is active');
            fitAddon.fit();     

            // make sure the rest of the code is not gonna run 
            return null;
        }

        term.write('connecting serial terminal ...')
        fitAddon.fit();

        // Terminal Authentication And Connection
        handleTerminalAuthentication({terminalData: terminalData.body, term, terminalStates, terminalState});

    }

    // initialize the terminal ... 
    useEffect(handleTerminalInitialization, [terminalData]);
    

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
`

const InnerWrapper = styled.div `
    width: 95%;
    max-width: 2000px;
`;


const Wrapper = styled.div `
    width: 100%;

    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;