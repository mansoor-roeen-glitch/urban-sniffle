import React from 'react'
import styled from 'styled-components'

export default function Activity({activity}) {
    return (
        <Wrapper>
            <MessageWrapper>
                <Author>
                    {activity.name}
                </Author>
                &nbsp;
                <Message>
                    {activity.message}
                </Message>
            </MessageWrapper>
            <EmitTimeWrapper>
                <EmitTime>
                    {activity.emitTime}
                </EmitTime>
            </EmitTimeWrapper>
        </Wrapper>
    )
}

const EmitTime = styled.span `
    color: var(--white);
    opacity: .5;
    font-size: 0.97rem;
    font-weight: 300;
`;

const Wrapper = styled.div `
    width: 93%;
    height: fit-content;
    background: var(--primary-background);

    padding: 15px;

`;

const MessageWrapper = styled.p `
    margin-bottom: 10px;
    height: fit-content;
    width: fit-content;

    font-style: normal;
    font-weight: 300;
    font-size: 18px;
`;

const Author = styled.span `
    color: var(--primary-purple);
    font-size: inherit;
    font-weight: inherit;
`;

const Message = styled.span `
    color: var(--white);
    opacity: .7;
    font-size: inherit;
    font-weight: inherit;
`;

const EmitTimeWrapper = styled.div ``;