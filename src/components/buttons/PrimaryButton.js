import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../icons/SvgIcon';

export default function PrimaryButton({to, text, height, width, onClick}) {

    return (
        <ButtonWrapper>
            <Link style={{textDecoration: "none"}} to={to}>
                <StyledButton onClick={onClick} height={height} width={width}>
                    <StyledButtonText>
                        {text}
                    </StyledButtonText>
                    <StyledIconWrapper>
                        <Icon path='/images/general/arrow-up-down-icon.svg' width={9} height={14} alt="Create arrow" />
                    </StyledIconWrapper>
                </StyledButton>
            </Link>
        </ButtonWrapper>
    )
}

const StyledIconWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    width: fit-content;
`;  

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
    border-radius: 1px;
    column-gap: 10px;
    
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: solid 1px #322d34;

    &:hover {
        opacity: .8;
    }

`;

const StyledButtonText = styled.span `
    color: #a978ab;
    font-size: 16px;
    font-weight: 400;
`;
