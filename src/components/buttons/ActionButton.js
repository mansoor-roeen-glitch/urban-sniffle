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
    background: #763470;

    border-radius: 5px;
    transition: .4s ease;

    border: solid 1px #383f48;

    &:hover {
        
        background: #5e3a5a;

        span {
            opacity: .9;
        }

    }

`;

const StyledButtonText = styled.span `
    background: transparent;
    color: white;
    font-size: 14px;
    font-weight: 400;

    @media screen and (max-width: 600px) {
        font-size: 0.85rem;
        text-transform: uppercase;
    }
`;
