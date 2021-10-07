import React from 'react'
import styled, { ServerStyleSheet } from 'styled-components'
import Activity from './Activity';

export default function Console() {

    const activities = [
        {
            name: "drunkenpirate47x",
            message: "Destroyed the service",
            emitTime: "Jun 19 at 1:24 AM"
        },
        {
            name: "drunkenpirate47x",
            message: "Started the service",
            emitTime: "Jun 8 at 1:25 AM"
        }
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                <ConsoleWrapper>
                    <TemporaryText>
                                        Microsoft Windows [Version 10.0.18363.1734]
                    (c) 2019 Microsoft Corporation. All rights reserved.

                    C:\Users\user Microsoft Windows [Version 10.0.18363.1734]
                    'Microsoft' is not recognized as an internal or external command,
                    operable program or batch file.

                    </TemporaryText>
                </ConsoleWrapper>
                <ActivityWrapper>
                    <ActivityHeading>
                        <ActivityText>
                            Latest activities
                        </ActivityText>
                    </ActivityHeading>
                    {activities.map((activity, index) => {
                        return (<Activity activity={activity} key={index} />)
                    })}
                </ActivityWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ActivityText = styled.span `
    color: var(--white);
    opacity: .8;

    font-style: normal;
    font-weight: 400;
    font-size: 1.497rem;
`;

const ActivityHeading = styled.div `
    width: 100%;
    height: fit-content;
    margin-bottom: 10px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActivityWrapper = styled.div `
    background: var(--secondary-background);
    height: 100%;
    padding: 25px 0px;

    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
`; 

const TemporaryText = styled.p `
    color: var(--white);
    position: absolute;
    top: 40px;
    left: 30px;
    padding-right: 30px;
    max-width: 500px;
`;

const ConsoleWrapper = styled.div `
    height: 100%;
    background: black;
`

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1400px;
    height: 500px;

    display: grid;
    grid-template-columns: 2.6fr auto;
    grid-template-rows: auto;
    column-gap: 70px;

    @media screen and (max-width: 1400px) {
        column-gap: 35px;
    }

    @media screen and (max-width: 1000px) {
        grid-template-columns: auto;
        grid-template-rows: 450px 400px;
        column-gap: 0px;
        row-gap: 30px;
        height: fit-content;
        padding-bottom: 50px;
    }
`;


const Wrapper = styled.div `
    width: 100%;
    margin-top: 30px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;