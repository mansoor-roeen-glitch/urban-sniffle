import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function PrimaryButton({to, text}) {
    return (
        <ButtonWrapper>
            <Link style={{textDecoration: "none"}} to={to}>
                <StyledButton>
                    <StyledButtonText>
                        {text}
                    </StyledButtonText>
                </StyledButton>
            </Link>
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
    width: 80px;
    height: 40px;
    background: transparent;
    border-color: var(--primary-purple);
    border-width: 0.5px;
    border-style: solid;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }

`;

const StyledButtonText = styled.span `
    background: transparent;
    color: var(--primary-purple);
    font-size: 18px;
    font-weight: 300;
`;
