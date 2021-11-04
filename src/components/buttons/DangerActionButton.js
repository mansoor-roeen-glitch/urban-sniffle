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
    background: transparent;

    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: #bb4040;

    transition: .4s ease;

    &:hover {

        background: #a13434;
        border-color: #a13434;

        span {
            color: var(--white);
            opacity: .8;
        }

    }

`;

const StyledButtonText = styled.span `
    background: transparent;
    color: #bb4040;
    font-size: 18px;
    font-weight: 500;
`;
