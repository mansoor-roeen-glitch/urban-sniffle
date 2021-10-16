import React from 'react'
import styled from 'styled-components'

export default function PrimaryInput({heading, value, htmltype}) {
    return (
        <Wrapper>
            <HeadingWrapper>
                <StyledHeading>
                    {heading}
                </StyledHeading>    
            </HeadingWrapper>        
            <ContentWrapper>
                <ContentInput maxLength={40} minLength={5} placeholder={value} name={heading} /> 
                <ContentLabel htmlFor={heading} itemType={htmltype}>
                    hostname
                </ContentLabel>
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

const ContentInput = styled.input `
    font-size: 1.15rem;
    font-weight: 300;
    font-style: normal;
    color: var(--white);
    opacity: .85;

    height: 100%;
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
`;

const ContentLabel = styled.label `
    display: none;
`;

const ContentWrapper = styled.div `
    height: 47px;
    width: 100%;

    border-width: 0.5px;
    border-color: var(--secondary-purple);
    border-style: solid;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;
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