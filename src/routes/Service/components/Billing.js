import React from 'react'
import styled from 'styled-components'
import Section from './Section';

export default function Billing() {

    const bd = [
        {
            heading: "Plan Type",
            value: "Basic plan",
            type: "dropdown",
            options: [
                {
                    value: "Basic Plan",
                    pricing: "$15.00",
                    type: "option"
                },
                {
                    value: "Normal Plan",
                    pricing: "$30.00",
                    type: "option"
                },
                {
                    value: "Advance Plan",
                    pricing: "$50.00",
                    type: "option"
                }
            ],
            selected: 0
        },
        {
            heading: "Monthly Charge",
            value: "$1.00",
            type: "detail"
        },
        {
            heading: "Payment Method",
            value: "click to reveal",
            type: "detail"
        }
    ]

    const pb = [
        {
            heading: "Bandwidth",
            value: "1024",
            type: "detail"
        },
        {
            heading: "Size",
            value: "128",
            type: "detail"
        },
        {
            heading: "Ram",
            value: "1024",
            type: "detail"
        },
        
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                <Section data={bd} heading="Billing Details" rows={2} rowHeight={170 / 2} />
                <Section data={pb} heading="Plan Benifits" rows={2} rowHeight={170 / 2} />
            </InnerWrapper>
        </Wrapper>
    )
}

const InnerWrapper = styled.div `
    max-width: 1400px;
    width: 92%;
    padding-top: 60px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    
    display: flex;
    align-items: center;
    justify-content: center;
`;