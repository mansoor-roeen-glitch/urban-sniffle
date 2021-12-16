import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';
import Actions from './components/Actions'
import handleCheckout from '../../functions/handleCheckout';
import getUser from '../../functions/getUserDetails';

export default function Service ({ config, handleSubHeader, ...props}) {

    const {id, hostname} = props.details
    const [selected, setSelected] = React.useState(0)
    const [serviceStatus, setServiceStatus] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState()
    const [details, setDetails] = React.useState()
    const [error, setError] = React.useState()
    const [serviceConsoleData, setServiceConsoleData] = React.useState()
    const [actionLoading, setActionLoading] = React.useState(false)
    const [userDetails, setUserDetails] = React.useState()
    const [screenHeight, setScreenHeight] = React.useState(document.body.scrollHeight);
    console.log(screenHeight)

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

    return (
        <Wrapper>
            {serviceNotActivated() && (
                <ServiceNotActivatedWrapper>
                    <ServiceNotActivated>
                        <NoticeSvg>

                            <svg width="18" height="18" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_650_3)">
                                <path d="M9 1.73288C13.1355 1.73288 16.5 5.09738 16.5 9.23288C16.5 13.3684 13.1355 16.7329 9 16.7329C4.8645 16.7329 1.5 13.3684 1.5 9.23288C1.5 5.09738 4.8645 1.73288 9 1.73288ZM9 0.23288C4.02975 0.23288 0 4.26263 0 9.23288C0 14.2031 4.02975 18.2329 9 18.2329C13.9702 18.2329 18 14.2031 18 9.23288C18 4.26263 13.9702 0.23288 9 0.23288ZM8.0175 5.87738C7.94325 5.27213 8.4135 4.73288 9.0285 4.73288C9.60675 4.73288 10.0612 5.23988 9.9885 5.82113L9.42075 10.3609C9.3945 10.5731 9.21375 10.7329 9 10.7329C8.78625 10.7329 8.6055 10.5731 8.5785 10.3609L8.0175 5.87738V5.87738ZM9 13.9204C8.4825 13.9204 8.0625 13.5004 8.0625 12.9829C8.0625 12.4654 8.4825 12.0454 9 12.0454C9.5175 12.0454 9.9375 12.4654 9.9375 12.9829C9.9375 13.5004 9.5175 13.9204 9 13.9204Z" fill="#943134"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_650_3">
                                <rect width="18" height="18" fill="white" transform="translate(0 0.23288)"/>
                                </clipPath>
                                </defs>
                            </svg>

                        </NoticeSvg>
                        <ServiceNotActivatedMessage>
                            This service is inactive, to activate
                            &nbsp;
                            <CheckoutButton onClick={() => {handleCheckout(details.id, config)}} >click here</CheckoutButton>
                        </ServiceNotActivatedMessage>
                    </ServiceNotActivated>
                </ServiceNotActivatedWrapper>
            )}
            <HeaderWrapper>
                <InnerWrapper>
                    <List>

                        {/* We will map through all the service options */}

                        {selectOptions.map((option, index) => {
                            return (
                                <Item key={index} className={selected === option.index ? "Option-Selected" : ""} style={{opacity: selected === option.index ? "1" : ".5"}}>
                                    <ItemButton onClick={() => {handleOptionClick(option.index)}}>
                                        <ItemText>{option.text}</ItemText>
                                    </ItemButton>
                                    {selected === option.index ? (
                                        
                                        <StyledLine></StyledLine>
                                    ) : null}
                                </Item>
                            )
                        })}
                        
                    </List>
                </InnerWrapper>
            </HeaderWrapper>

            

            <ContentWrapper screenHeight={screenHeight}>
                
                {/* Showing content based on user selection */}
                { (() => {
                    switch(selected) {
                        
                        case 0:
                            return <Details data={details} config={config} userDetails={userDetails} serviceStatus={serviceStatus} />;

                        case 1:
                            return <Console data={details} serviceConsole={serviceConsoleData} serviceNotActivated={serviceNotActivated()} />;
                        
                        case 2:
                            return <Billing data={details} userDetails={userDetails} />;
                            
                        case 3:
                            return <Actions data={details} userDetails={userDetails} setLoadingAnim={setActionLoading} serviceNotActivated={serviceNotActivated()} config={config} />;
                            
                    }
                })()}

            </ContentWrapper>

        </Wrapper>
    )
}


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
    font-size:16px;
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
    overflow-y: scroll;
    height: ${props => props.screenHeight - 207}px;
    padding-bottom: 110px;
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
    color: var(--white);
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
`;


const Item = styled.li `
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    height: 50px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    margin: -15px 0 15px 0;

    &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background: var(--white);
        opacity: .4;
    }
`;

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1600px;
    height: 100%;

`;

