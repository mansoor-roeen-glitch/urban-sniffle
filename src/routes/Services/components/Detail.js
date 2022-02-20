import React from 'react'
import styled from 'styled-components'

export default function Detail({heading, value}) {
    return (
        <Wrapper>
            <HeadingWrapper>
                <StyledHeading>
                    {heading}
                </StyledHeading>    
            </HeadingWrapper>        
            <ContentWrapper>
                <ContentTextWrapper>
                    <ContentText>
                        {value}
                    </ContentText>
                </ContentTextWrapper>
            </ContentWrapper>
        </Wrapper>
    )
}

const StyledHeading = styled.span `
    font-size: 0.9rem;
    font-weight: 500;
    color: #7b8187;
    opacity: .9;
    text-transform: uppercase;
`;

const ContentText = styled.span `
    font-size: 1rem;
    font-weight: 300;
    font-style: normal;
    color: var(--white);
    opacity: .85;
`;

const ContentTextWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const ContentWrapper = styled.div `
    height: 42px;
    width: 100%;

    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    background-color: #141923;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Wrapper = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 14px;
`; 