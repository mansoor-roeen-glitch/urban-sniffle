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
    font-size: 1rem;
    font-weight: 400;
    color: var(--primary-purple);
    opacity: .9;
    text-transform: uppercase;
`;

const ContentText = styled.span `
    font-size: 1.15rem;
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
    height: 47px;
    width: 100%;

    border-width: 1px;
    border-color: var(--border-purple);
    border-style: solid;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
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
    row-gap: 20px;
`; 