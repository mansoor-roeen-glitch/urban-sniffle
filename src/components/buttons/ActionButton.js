import React from 'react'
import styled from 'styled-components';

export default function PrimaryButton({ text, height, width, onClick, isDisabled }) {

    return (
        <ButtonWrapper>
            <StyledButton onClick={isDisabled ? null : onClick} height={height} width={width} isDisabled={isDisabled}>
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
    cursor: ${props => props.isDisabled ? 'not-allowed': 'pointer'};
    background: #763470;
    border-radius: 5px;
    transition: .4s ease;
    border: solid 1px #383f48;
    opacity: ${props => props.isDisabled ? '0.4' : '1'};

    &:hover {
        
        background: ${props => props.isDisabled ? '#763470' : '#5e3a5a'};

        span {
            opacity: ${props => props.isDisabled ? '1' : '0.9'};
        }

    }

`;

const StyledButtonText = styled.span `
    color: white;
    font-size: 14px;
    font-weight: 400;
`;
