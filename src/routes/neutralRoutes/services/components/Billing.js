import React from 'react'
import styled from 'styled-components'
import VPSDetailsSection from './VPSDetailsSection';

export default function Billing({service}) {

    let serviceInformation = service.body
    const generalIconsPath = '/images/serviceInformationIcons/serviceGeneralInformation'

    let billingInformation = [
        {
            svg: generalIconsPath + '/profile_icon.svg',
            heading: "Plan Type",
            value: serviceInformation.plan
        },
        {
            svg: generalIconsPath + '/template_icon.svg',
            heading: "Payment Period",
            value: "Montly"
        },

        {
            svg: generalIconsPath + '/node_icon.svg',
            heading: "Payment Method",
            value: "Stripe"
        },
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                <VPSDetailsSection list={billingInformation} heading='Billing General Information' editPath='/' />
            </InnerWrapper>
        </Wrapper>

    )
}

const RowGap = styled.div `
    width: 100%;
    height: 45px;
`;

const InnerWrapper = styled.div `
    max-width: 2000px;
    width: 95%;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;