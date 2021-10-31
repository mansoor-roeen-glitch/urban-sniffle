import React from 'react'
import styled from 'styled-components';

export default function PrimaryButton({ text, height, width, onClick }) {

    return (
        <ButtonWrapper>
            <StyledButton onClick={onClick} height={height} width={width}>
                <StyledButtonText>
                    {text}
                </StyledButtonText>
            </StyledButton>
        </ButtonWrapper>
    )
}


const ButtonWrapper = styled.div `
    width: auto;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledButton = styled.button `
    width: ${props => props.width};
    height: ${props => props.height};

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #846da4;

    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: #846da4;

    transition: .4s ease;

    &:hover {
        background: transparent;
        
        span {
            color: #bda6d8;
            opacity: .8;
        }

    }

`;

const StyledButtonText = styled.span `
    background: transparent;
    color: var(--primary-background);
    font-size: 18px;
    font-weight: 600;
`;