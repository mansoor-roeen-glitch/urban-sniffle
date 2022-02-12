// Dependencies
import React from 'react';
import styled from 'styled-components';

export default function Message({...props}) {

    // Passed Props
    const {
        title,
        description,
        button,
        success,
    } = props

    return (
        <MessagetOuterWrapper>
            <MessagetWrapper>
                <MessagetHeader>
                    <MessagetHeading success={success}>
                        {title}
                    </MessagetHeading>
                </MessagetHeader>
                <MessagetDesc>
                    <MessagetDescText>
                        {description}
                    </MessagetDescText>
                </MessagetDesc>
                <MessagetButtons>
                    <MessagetButton onClick={button.onClick} >
                        {button.label}
                    </MessagetButton>
                </MessagetButtons>
            </MessagetWrapper>
        </MessagetOuterWrapper>
    );

}


const MessagetButton = styled.button `
    cursor: pointer;
    color: #e5e6e9;
    width: fit-content;
    border: solid 1px #252c36;
    background: #10151c;
    
    border-radius: 4px;
    padding: 0px 20px;
    height: 38px;
    font-size: 14px;

    &:hover {
        opacity: .9;
    }
`;

const MessagetButtons = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;

    width: 92%;
    column-gap: 20px;
    margin: 10px 0px;
`;

const MessagetDescText = styled.span `
    font-size: 15px;
    font-weight: 400;
    color: rgb(170, 173, 181);
    width: 92%;
    
    height: fit-content;
`;

const MessagetDesc = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 10px 0px;
    padding: 15px 0px;
    width: 100%;

    &::before {
        content: '';
        position: absolute;
        background: #26272a;

        top: 0px;
        height: 1px;
        width: 100%;
    }

    &::after {
        content: '';
        position: absolute;
        background: #26272a;

        bottom: 0px;
        height: 1px;
        width: 100%;
    }

`;

const MessagetHeading = styled.span `
    color: ${props => props.success ? '#4da56a' : '#a54d4d'};
    height: fit-content;

    width: 100%;  
    font-size: 18px;
    font-weight: 500;
`;

const MessagetHeader = styled.div `
    display: flex;
    align-items: center; 
    justify-content: center;

    width: 92%;
    height: 40px;
    margin-top: 10px;
`;

const MessagetWrapper = styled.div `
    display: flex;
    justify: center;
    align-items: center;
    height: fit-content;
    flex-direction: column;
    position: fixed;
    background: #0d1117;
    
    top: 50%;
    left: 50%;
    z-index: 99;
    width: 500px;
    padding: 10px 0px;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.05));
`;

const MessagetOuterWrapper = styled.div `
    &::before {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);

        width: 100%; 
        height: 100%;
        background-color: #04060c;
        opacity: 0.8;
        z-index: 99;
    }
`;