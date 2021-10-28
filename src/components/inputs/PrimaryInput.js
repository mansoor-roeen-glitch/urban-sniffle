import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

export default function PrimaryInput({heading, value, htmltype, onChange, inputValue, errorMes, messageDur, hasErrorMessage}) {

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState();
    const [messageDuration, setMessageDuration] = useState(messageDur); 

    const handleErrorMessage = () => {

        setError(true)
        setErrorMessage(errorMes)

        setTimeout(() => {

            onChange((prevState) => ({
                
                ...prevState,
                errorMes: "",
                hasErrorMessage: false

            }))

            setError(false);
            setErrorMessage("")

        }, messageDuration)

    }

    useEffect(() => {

        if (hasErrorMessage) {
            handleErrorMessage();
        }

    }, [hasErrorMessage])

    return (
        <Wrapper>
            <HeadingWrapper>
                <StyledHeading>
                    {heading}
                </StyledHeading>    
            </HeadingWrapper>        
            <ContentWrapper error={error}>
                <ContentInput error={error} onChange={(event) => {setError(false); onChange(prevState => ({...prevState, hasErrorMessage: false, errorMes: "", value: event.target.value}))}} inputValue={inputValue} type={htmltype} maxLength={40} minLength={5} placeholder={value} name={heading} /> 
                <ContentLabel htmlFor={heading} itemType={htmltype}>
                    {heading}
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

    &::placeholder {
        color: var(--white);
        opacity: .6;
    }
`;

const ContentLabel = styled.label `
    display: none;
`;

const ContentWrapper = styled.div `
    height: 47px;
    width: 100%;

    border-width: 1px;
    border-color: ${props => !props.error ? `var(--border-purple)` : `var(--border-red)`};
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