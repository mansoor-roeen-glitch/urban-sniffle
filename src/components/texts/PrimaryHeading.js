import React from 'react'
import styled from 'styled-components'

export default function PrimaryHeading({text}) {
    return (
        <StyledHeader>{text}</StyledHeader>
    )
}

const StyledHeader = styled.h2 `
    font-style: normal;
    font-weight: 500;
    font-size: 1.82rem;
    color: var(--white);
    opacity: .85;
`;
