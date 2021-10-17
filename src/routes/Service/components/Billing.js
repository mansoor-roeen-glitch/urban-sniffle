import React from 'react'
import styled from 'styled-components'
import Section from './Section';

export default function Billing({data}) {

    const bd = [
        {
            heading: "Plan Type",
            value: data.plan + " plan",
            type: "detail"
        },
        {
            heading: "Monthly Charge",
            value: "$1.00",
            type: "detail"
        },
        {
            heading: "Payment Method",
            value: data.billing_type,
            type: "detail"
        }
    ]

    const pb = [
        {
            heading: "Bandwidth",
            value: data.service_plan.bandwidth,
            type: "detail"
        },
        {
            heading: "Size",
            value: data.service_plan.size,
            type: "detail"
        },
        {
            heading: "Ram",
            value: data.service_plan.ram,
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