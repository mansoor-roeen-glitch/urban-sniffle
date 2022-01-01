import React from 'react'
import styled from 'styled-components'

export default function PrimaryHeading({text}) {
    return (
        <StyledHeader>{text}</StyledHeader>
    )
}

const StyledHeader = styled.h2 `
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 150%;
    color: #c9ced6;
`;
