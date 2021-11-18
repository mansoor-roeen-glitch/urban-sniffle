import React, { useEffect } from 'react'
import styled from 'styled-components'

export default function SuccessMessage({message, duration, isVisible}) {
    
    const [isSuccess, setIsSuccess] = React.useState(false);

    useEffect(() => {

        if (isVisible) {
            setIsSuccess(true)

            setTimeout(() => {
                setIsSuccess(false);
            }, duration * 1000)
        } else {
            setIsSuccess(false)
        }

    }, [isVisible])

    
    if (!isSuccess) {
        return null;
    }

    return (
        <Wrapper duration={duration}>
            <IconWrapper>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 0C4.70138 0 0 4.70138 0 10.5C0 16.2986 4.70138 21 10.5 21C16.2986 21 21 16.2986 21 10.5C21 4.70138 16.2986 0 10.5 0ZM9.40625 14.4532L5.46875 10.6741L6.69025 9.4185L9.3835 11.9884L14.7254 6.54762L15.9688 7.7805L9.40625 14.4532Z" fill="#429454"/>
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

    color: #429454;
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

    position: relative;
`;

const Wrapper = styled.div `
    width: 450px;
    height: 50px;
    background: #121D12;
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
            top: 35%;
        }
        
        100%{
            top: 7%;
        }
    }

`;