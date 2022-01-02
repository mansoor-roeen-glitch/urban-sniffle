import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';
import Actions from './components/Actions';
import getUser from '../../functions/getUserDetails';
import VPSDetails from './components/VPSDetails';
import Charts from './components/Charts';

export default function Service ({ config, handleSubHeader, ...props}) {

    const {id, hostname} = props.details
    const [serviceStatus, setServiceStatus] = React.useState();
    
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState()
    const [error, setError] = React.useState()

    const [details, setDetails] = React.useState()
    const [serviceConsoleData, setServiceConsoleData] = React.useState()
    const [selected, setSelected] = React.useState(0)
    const [actionLoading, setActionLoading] = React.useState(false)
    const [userDetails, setUserDetails] = React.useState()
    const [screenHeight, setScreenHeight] = React.useState(document.body.scrollHeight);

    const createConsoleSession = async () => {
        let response = await axios({
            method: "post",
            url: `https://hosnet.io/api/services/${id}/console_login/`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${config}`
            }
        })
            .then((res) => {return {status: 200, data: res.data}})
            .catch((error ) => {return {status: false, data: error};})

        return response;
    }

    const getServiceDetails = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/services/${id}`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${config}`
            }
        })
            .then((res) => {return {status: 200, data: res.data}})
            .catch((error ) => {return {status: false, data: error};})
        
        return response;
    }

    const getServiceStatus = async () => {
        let response = await axios({
            method: "post",
            url: `https://hosnet.io/api/services/${id}/status/`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${config}`
            }
        })
            .then((res) => {return {status: 200, data: res.data}})
            .catch((error ) => {return {status: false, data: error};})
        
        return response;
    }

    const getDetails = async () => {

        const serviceStatus = await getServiceStatus()
        const serviceDetails = await getServiceDetails()
        const serviceConsole = await createConsoleSession()
        const fetchedUserDetails = await getUser(config)

        if (
            
            serviceDetails.status === 200 && 
            serviceStatus.status === 200 && 
            serviceConsole.status === 200 &&
            fetchedUserDetails.status === 200
            
        ) {

            setUserDetails(fetchedUserDetails.data)
            setServiceConsoleData(serviceConsole.data)
            setServiceStatus(serviceStatus.data)
            setDetails(serviceDetails.data)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else if (
            
            fetchedUserDetails.status === 200 &&
            serviceDetails.status === 200 && 
            serviceConsole.status === 200 && 
            !serviceStatus.status 
            
        ) {

            setUserDetails(fetchedUserDetails.data)
            setServiceConsoleData(serviceConsole.data)
            setDetails(serviceDetails.data)
            setServiceStatus(false)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else if (
            
            fetchedUserDetails.status === 200 &&
            serviceDetails.status === 200 && 
            !serviceConsole.status && 
            !serviceStatus.status
            
        ) {

            setUserDetails(fetchedUserDetails.data)
            setServiceConsoleData(false)
            setDetails(serviceDetails.data)
            setServiceStatus(false)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else {

            setError(true)
            setLoading(false)
            setSuccess(false)
        
        }

    }

    const selectOptions = [
        {
            text: "Details",
            index: 0
        },
        {
            text: "Console",
            index: 1
        },
        {
            text: "Billing",
            index: 2
        }
        ,
        {
            text: "Actions",
            index: 3
        }
    ]

    const handleOptionClick = (index) => {
        setSelected(index)
    }

    const serviceNotActivated = () => {
        if (details.status === undefined) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {

        window.addEventListener("resize", () => {setScreenHeight(document.body.scrollHeight)})
        getDetails()

    }, [])


    // Updating Sub-Header based on route
    useEffect(() => {

        handleSubHeader(["services"], loading)

    }, [loading])


    if (loading) {

        return (
            <Wrapper>
                
                {/* Loading will be included below this */}
            </Wrapper>
        )

    }

    if (error) {

        return (
            <Wrapper>
                
                <h1>something went wrong</h1>
            </Wrapper>
        )

    }

    const charts = [
        {
            heading: "Bandwith Usage",
            total: 10000,
            usage: 6500,
            unit: "GB"
        },
        {
            heading: "Storage Usage",
            total: 100000,
            usage: 5000,
            unit: "GB"
        }, 
        {
            heading: "Memeory Usage",
            total: 500000,
            usage: 50000,
            unit: "GB"
        }
    ]

    return (

        <Wrapper>   
            
            <VPSInformationWrapper>
            
                <VPSDetails />
                <Charts charts={charts} />
            
            </VPSInformationWrapper>

            <ContentWrapper screenHeight={screenHeight}>
                
                { (() => {

                    switch(selected) {
                        
                        case 0:
                            
                            return (
                            
                                <Details 
                                
                                    data={details} 
                                    config={config}
                                    userDetails={userDetails} 
                                    serviceStatus={serviceStatus} 
                                    
                                />
                                
                            )

                        case 1:
                            
                            return (
                            
                                <Console 
                                    
                                    data={details} 
                                    serviceConsole={serviceConsoleData} 
                                    serviceNotActivated={serviceNotActivated()} 
                                    
                                />
                                
                            )
                        
                        case 2:
                            
                            return (
                            
                                <Billing 
                                    
                                    data={details} 
                                    userDetails={userDetails} 
                                    
                                />
                                
                                )
                            
                        case 3:
                            
                            return (
                                    
                                    <Actions 
                                    
                                        data={details} 
                                        userDetails={userDetails} 
                                        setLoadingAnim={setActionLoading} 
                                        serviceNotActivated={serviceNotActivated()} 
                                        config={config} 
                                    
                                    />
                                        
                            )
                            
                    }
                })()}

            </ContentWrapper>

        </Wrapper>
    )
}

const VPSInformationWrapper = styled.div `
    
    width: 93%;
    max-width: 1600px;
    padding-top: 35px;
    
    display: flex;
    height: fit-content;
    flex-direction: column;
`;

const CheckoutButton = styled.button `
    width: fit-content;
    height: fit-content;
    background: transparent;
    outline: none;
    color: #943134;
    text-decoration: underline;
    font-size: 16px;
    cursor: pointer;
`;

const ServiceNotActivatedWrapper = styled.div`
    width: 100%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    display: flex;
    background: #1D1212;
    margin-bottom: 20px;
`;

const NoticeSvg = styled.div `
    width: fit-content;
    height: fit-content;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`; 

const ServiceNotActivatedMessage = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-align: right;

    color: #943134;
`;

const ServiceNotActivated = styled.div `
    display: flex;
    height: 50px;
    width: 93%;
    max-width: 1600px;
    align-items: center;
`

const ContentWrapper = styled.div `
    
    width: 100%;
    height: fit-content;

`;

const StyledLine = styled.div `
    width: 100%;
    height: 1px;
    position: absolute;
    background: var(--primary-cyan);
    bottom: 0px;
`;
 
const ItemButton = styled.button `

    width: 100%;
    height: 100%;
    background: transparent;
    border: none;

    outline: none!important;

    &:hover {
        cursor: pointer;
    }

`;

const ItemText = styled.span `
    font-size: 1.1rem;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    color: ${props => !props.selected ? "#767f8b" : "#d1d5db"};
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const Item = styled.li `
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        bottom: 0px;
        position: absolute;
        z-index: 2;
        content: "";
        width: 100%;
        height: 1px;
        background: #aebbce;

        display: ${props => !props.selected ? "none" : "initial"};
    }
`;

const List = styled.ul `
    list-style: none;
    height: auto;

    display: flex;
    flex-direction: row;
    height: 100%;
`;

const HeaderWrapper = styled.div `
    width: 100%;
    height: 62px;
    margin-top: 15px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 93%;
        height: 1px;
        background: #2c3038;
    }
`;

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1600px;
    height: 100%;

`;

