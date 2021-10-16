import React from 'react'
import styled from 'styled-components'

export default function Profile({path, width, height, alt, color}) {
    return (
        <StyledSvgWrapper>
            <img width={width} height={height} src={path} alt={alt} ></img>
        </StyledSvgWrapper>
    )
}

const StyledSvgWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    height: fit-content;
    width: fit-content;
`;