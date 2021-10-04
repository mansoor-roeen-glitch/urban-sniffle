import React from 'react'
import styled from 'styled-components'

export default function PrimaryHeading({text}) {
    return (
        <StyledHeader>{text}</StyledHeader>
    )
}

const StyledHeader = styled.h2 `
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    color: var(--white);
    opacity: .85;
`;
