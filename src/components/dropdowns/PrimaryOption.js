import React from 'react'
import styled from 'styled-components'

export default function PrimaryOption({option, isOptionInLastPosition}) {
    return (
        <StyledOptionWrapper isOptionInLastPosition={isOptionInLastPosition}>
            <StyledOption>
                <StyledOptionText>
                    {option.name}
                </StyledOptionText>
            </StyledOption>
        </StyledOptionWrapper>
    )
}

const StyledOptionWrapper = styled.div `
    height: 54px;
    margin: 0px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 20px;
    
    border-bottom: ${props => props.isOptionInLastPosition ? "none" : "solid 1px #d8d3e51f"};


    &:hover {
        opacity: .8;
    }

`;

const StyledOption = styled.div `
    height: fit-content;
    width: fit-content;
`;

const StyledOptionText = styled.h1 `
    font-size: 1rem;
    font-weight: 300;
    font-style: normal;
    color: var(--white);
    opacity: .85;
`;