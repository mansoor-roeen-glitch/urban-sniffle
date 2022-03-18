import styled from 'styled-components'
import React, { useEffect } from 'react'
import VPSDetailsSection from './VPSDetailsSection';
import getServiceInformationList from '../functions/getServiceInformationList';

export default function Details({ service, user }) {

    
    // Component Variables ^^
    let edit_path = `/services/${service.body.id}/${service.body.hostname}/update`;

    
    // React State Hooks ^^

    const [serviceGeneralInformation, setServiceGeneralInformation] = React.useState([]);
    const [servicePlanInformation, setServicePlanInformation] = React.useState([]);


    // Functions ^^

    const updateListData = () => {

        const {

            planInformation,
            generalInformation,

        } = getServiceInformationList({serviceInformation: service.body, ownerInformation: user.body})

        setServiceGeneralInformation( generalInformation )
        setServicePlanInformation( planInformation )

    }


    // React Use Effects Hooks ^^

    useEffect(updateListData, [])


    // JSX For Render ^^ 

    return (

        <Wrapper>
            <InnerWrapper>
                    
                    <VPSDetailsSection list={serviceGeneralInformation} heading="General Information" editPath={edit_path} />
                    <VPSDetailsSection list={servicePlanInformation} heading="Plan Information" editPath={edit_path} />
        
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