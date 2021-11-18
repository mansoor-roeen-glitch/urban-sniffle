import React, { useEffect } from 'react'
import styled from 'styled-components'

export default function ErrorMessage({message, duration, isVisible}) {
    
    const [isError, setIsError] = React.useState(false);

    useEffect(() => {

        if (isVisible) {
            setIsError(true)

            setTimeout(() => {
                setIsError(false);
            }, duration * 1000)
        } else {
            setIsError(false)
        }

    }, [isVisible])

    
    if (!isError) {
        return null;
    }

    return (
        <Wrapper duration={duration}>
            <IconWrapper>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1.75C15.3247 1.75 19.25 5.67525 19.25 10.5C19.25 15.3247 15.3247 19.25 10.5 19.25C5.67525 19.25 1.75 15.3247 1.75 10.5C1.75 5.67525 5.67525 1.75 10.5 1.75ZM10.5 0C4.70138 0 0 4.70138 0 10.5C0 16.2986 4.70138 21 10.5 21C16.2986 21 21 16.2986 21 10.5C21 4.70138 16.2986 0 10.5 0ZM9.35375 6.58525C9.26712 5.87913 9.81575 5.25 10.5333 5.25C11.2079 5.25 11.7381 5.8415 11.6532 6.51963L10.9909 11.816C10.9602 12.0636 10.7494 12.25 10.5 12.25C10.2506 12.25 10.0397 12.0636 10.0082 11.816L9.35375 6.58525V6.58525ZM10.5 15.9688C9.89625 15.9688 9.40625 15.4787 9.40625 14.875C9.40625 14.2713 9.89625 13.7812 10.5 13.7812C11.1037 13.7812 11.5938 14.2713 11.5938 14.875C11.5938 15.4787 11.1037 15.9688 10.5 15.9688Z" fill="#D74B4B"/>
                </svg>
            </IconWrapper>

            <MessageWrapper>
                <Message> {message} </Message>
            </MessageWrapper>
        </Wrapper>
    )
}

const Message = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: normal;
    display: flex;
    align-items: center;
    text-align: center;

    color: #D74B4B;
`;

const MessageWrapper = styled.div `
    width: fit-content;
    height: fit-content;
    text-align: center;
`;

const IconWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;

`;

const Wrapper = styled.div `
    width: 450px;
    height: 50px;
    background: #1D1212;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;

    position: fixed;
    top: 45%;
    left: auto;
    right: auto;
    z-index: 20;

    animation: animate ${props => `${props.duration}s`} ease forwards;

    @keyframes animate {
        0% {
            opacity: 1;
            top: 40%;
        }
        
        100%{
            top: 10%;
        }
    }

`;