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
                <StyledHeading error={error}>
                    {heading}
                </StyledHeading>    
            </HeadingWrapper>        
            <ContentWrapper error={error}>
                <ContentInput error={error} onChange={(event) => {setError(false); onChange(prevState => ({...prevState, hasErrorMessage: false, errorMes: "", value: event.target.value}))}} inputValue={inputValue} type={htmltype} maxLength={40} minLength={5} placeholder={value} name={heading} /> 
                <ContentLabel htmlFor={heading} itemType={htmltype}>
                    {heading}
                </ContentLabel>
            </ContentWrapper>
            {error && (
                <MessageWrapper>
                    <MessageIcon>

                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1C8.757 1 11 3.243 11 6C11 8.757 8.757 11 6 11C3.243 11 1 8.757 1 6C1 3.243 3.243 1 6 1ZM6 0C2.6865 0 0 2.6865 0 6C0 9.3135 2.6865 12 6 12C9.3135 12 12 9.3135 12 6C12 2.6865 9.3135 0 6 0ZM5.5 3H6.5V7H5.5V3ZM6 9.125C5.655 9.125 5.375 8.845 5.375 8.5C5.375 8.155 5.655 7.875 6 7.875C6.345 7.875 6.625 8.155 6.625 8.5C6.625 8.845 6.345 9.125 6 9.125Z" fill="#992B2B"/>
                        </svg>
    
                    </MessageIcon>
                    <MessageText>
                        {errorMessage}
                    </MessageText>
                </MessageWrapper>
            ) }
        </Wrapper>
    )
}

const MessageText = styled.span `
    color: #A42929;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;

    display: flex;
    align-items: center;
`;

const MessageIcon = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MessageWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;

    column-gap: 5px;
    background: transparent;

    position: absolute;
    bottom: -25px;
`;

const StyledHeading = styled.span `
    font-weight: 500;
    color: ${props => props.error ? '#A42929': 'var(--primary-purple)'};
    opacity: .9;
    text-transform: uppercase;
    font-size: 0.9rem;
`;

const ContentInput = styled.input `
    font-size: 1rem;
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
    width: 100%;

    border-width: 1px;
    border-color: ${props => !props.error ? `#3e364f` : `var(--border-red)`};
    border-style: solid;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;

    height: 42px;
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