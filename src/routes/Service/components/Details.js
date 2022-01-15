import axios from 'axios';
import styled from 'styled-components'
import React, { useEffect } from 'react'
import Svg from '../../../components/icons/SvgIcon'
import VPSDetailsSection from './VPSDetailsSection';
import getServiceInformationList from '../functions/getServiceInformationList';

export default function Details({ data, serviceStatus, userDetails, config }) {

    // React Hooks ^^

    const [plan, setPlan] = React.useState(0)
    const [status, setStatus] = React.useState(0)
    const [node, setNode] = React.useState(0)
    const [template, setTemplate] = React.useState(0)
    const [planType, setPlanType] = React.useState(0)
    const [pool, setPool] = React.useState(0)
    
    const [dropdownDetailsLoading, setDropdownDetailsLoading] = React.useState(true);
    const [dropdownDetailsSuccess, setDropdownDetailsSuccess] = React.useState();
    const [dropdownDetailsError, setDropdownDetailsError] = React.useState();
    const [dropdownDetails, setDropdownDetails] = React.useState();
    
    const [success, setSuccess] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();
    const [showMessage, setShowMessage] = React.useState(false);

    const [serviceGeneralInformation, setServiceGeneralInformation] = React.useState([]);
    const [servicePlanInformation, setServicePlanInformation] = React.useState([]);


    // Functions ^^

    const successRedirect = () => {
        window.location.pathname = '/';
    }

    const updateListData = () => {

        const {

            planInformation,
            generalInformation,

        } = getServiceInformationList({serviceInformation: data})

        setServiceGeneralInformation( generalInformation )
        setServicePlanInformation( planInformation )

    }


    // React Use Effects Hooks ^^

    useEffect(updateListData, [])


    // JSX For Render

    return (

        <Wrapper>
            <InnerWrapper>
                    
                    <VPSDetailsSection list={serviceGeneralInformation} heading="General Information" />
                    <VPSDetailsSection list={servicePlanInformation} heading="Plan Information" />
        
            </InnerWrapper>
        </Wrapper>

    )
}

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
    width: 93%;
    height: fit-content;

    max-width: 1600px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;