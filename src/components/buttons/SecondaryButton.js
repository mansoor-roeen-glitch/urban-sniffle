import React from 'react'
import styled from 'styled-components'

export default function SecondaryButton({text, onClick}) {
    return (
        <Wrapper>
            <Button onClick={onClick}>
                <ButtonText>{text}</ButtonText>
            </Button>
        </Wrapper>
    )
}


const Wrapper = styled.div `
    width: 100%;
    height: 100%;
    background: #929FB2;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button `

    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
    height: 100%;
    background: transparent;
    cursor: pointer;
`;

const ButtonText = styled.span `
    color: var(--primary-background);
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    letter-spacing: 0.02em;
`;