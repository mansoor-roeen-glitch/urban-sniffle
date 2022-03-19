import styled from 'styled-components'
import React, { useEffect } from 'react'
import VPSDetailsSection from './VPSDetailsSection';
import getServiceInformationList from '../functions/getServiceInformationList';

export default function Details({ service, user }) {

    // Details Lists
    const [serviceGeneralInformation, setServiceGeneralInformation] = React.useState([]);
    const [servicePlanInformation, setServicePlanInformation] = React.useState([]);

    // Returns a url to update service
    const updatePath = () => {
        return `/services/${service.body.id}/${service.body.hostname}/update`;
    }

    // This function fetches the details array
    const updateListData = () => {
        const {
            planInformation,
            generalInformation,
        } = getServiceInformationList({serviceInformation: service.body, ownerInformation: user.body})

        setServiceGeneralInformation(generalInformation)
        setServicePlanInformation(planInformation)
    }


    // Details Initialization 
    useEffect(updateListData, [])

    return (

        <Wrapper>
            <InnerWrapper>
                <VPSDetailsSection list={serviceGeneralInformation} heading="General Information" updatePath={updatePath()} isEditable={true} />
                <VPSDetailsSection list={servicePlanInformation} heading="Plan Information" updatePath={updatePath()} isEditable={user.body.is_staff} />
            </InnerWrapper>
        </Wrapper>

    )
}


// Styled Components ^^

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
    margin-top: 45px;
    display: flex;
    column-gap: 26px;
`;

const RowGap = styled.div `
    width: 100%;
    height: 45px;
`;

const Content = styled.div `
    margin-top: ${props => props.marginTop};
`;

const InnerWrapper = styled.div `
    overflow: none;
    height: fit-content;
    
    width: 95%;
    max-width: 2000px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;