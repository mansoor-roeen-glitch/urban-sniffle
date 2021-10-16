import React from 'react'
import styled from 'styled-components'

export default function SecondaryHeading({text}) {
    return (
        <StyledHeader>{text}</StyledHeader>
    )
}

const StyledHeader = styled.h2 `

    width: 100%;
    font-style: normal;
    letter-spacing: 2%;
    font-weight: 500;
    font-size: 2.05rem;
    color: var(--white);
    opacity: .85;

    display: flex;
    align-items: center;
    justify-content: center;
`;