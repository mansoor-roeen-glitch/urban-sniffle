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
    background: #21262d;

    border-radius: 5px;
    border: solid 1px #323a46;

    transition: .4s ease;

    &:hover {

        background: #b1281b;
        border-color: #a13434;

        span {
            
            color: var(--white);
            opacity: .8;
        
        }

    }

`;

const StyledButtonText = styled.span `
    color: #f75040;
    font-size: 16px;
    font-weight: 400;

    @media screen and (max-width: 600px) {
        font-size: 0.85rem;
        text-transform: uppercase;
    }
`;
