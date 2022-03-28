import React from 'react'
import styled from 'styled-components'

export default function PrimaryOption({option, isOptionInLastPosition}) {
    return (
        <StyledOptionWrapper isOptionInLastPosition={isOptionInLastPosition}>
            <StyledOption>
                <StyledOptionText>
                    {option.label}
                </StyledOptionText>
            </StyledOption>
        </StyledOptionWrapper>
    )
}

const StyledOptionWrapper = styled.div `
    height: 40px;
    width: 100%;
    padding: 0px 14px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: ${props => props.isOptionInLastPosition ? 'none' : 'solid 1px #242424'};

    &:hover {
        opacity: .8;
    }

`;

const StyledOption = styled.div `
    height: fit-content;
    width: fit-content;
`;

const StyledOptionText = styled.h1 `
    font-size: 15px;
    font-weight: 300;
    color: #d3d6db;
`;