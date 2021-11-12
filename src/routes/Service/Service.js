import React from 'react';
import SubHeader from '../../components/Header/SubHeader';
import styled from 'styled-components';
import axios from 'axios';

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';
import Actions from './components/Actions'

export default function Service (props) {

    const {id, hostname} = props.details
    const [selected, setSelected] = React.useState(0)
    const [serviceStatus, setServiceStatus] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState()
    const [details, setDetails] = React.useState()
    const [error, setError] = React.useState()
    const [serviceConsoleData, setServiceConsoleData] = React.useState()
    const [actionLoading, setActionLoading] = React.useState(false)

    const createConsoleSession = async () => {
        let response = await axios({
            method: "post",
            url: `https://hosnet.io/api/services/${id}/console_login/`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${props.config}`
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
                "Authorization": `Token ${props.config}`
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
                "Authorization": `Token ${props.config}`
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

        if (serviceDetails.status === 200 && serviceStatus.status === 200 && serviceConsole.status === 200) {

            setServiceConsoleData(serviceConsole.data)
            setServiceStatus(serviceStatus.data)
            setDetails(serviceDetails.data)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else if (serviceDetails.status === 200 && serviceConsole.status === 200 && !serviceStatus.status) {

            setServiceConsoleData(serviceConsole.data)
            setDetails(serviceDetails.data)
            setServiceStatus(false)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else if (serviceDetails.status === 200 && !serviceConsole.status && !serviceStatus.status) {

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

        console.log(serviceDetails)

    }

    React.useEffect(() => {

        setLoading(true)
        getDetails()

    }, [])

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

    if (loading) {

        return (
            <Wrapper>
                <SubHeader path={true} loading={true} pathName={hostname} />
                {/* Loading will be included below this */}
            </Wrapper>
        )

    }

    if (error) {

        return (
            <Wrapper>
                <SubHeader path={true} pathName={hostname} />
                {/* Error will be included below this */}
                <h1>something went wrong</h1>
            </Wrapper>
        )

    }

    return (
        <Wrapper>
            <SubHeader path={true} loading={actionLoading} pathName={hostname} />
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

            <ContentWrapper>
                
                {/* Showing content based on user selection */}
                { (() => {
                    switch(selected) {
                        
                        case 0:
                            return <Details data={details} serviceStatus={serviceStatus} />;

                        case 1:
                            return <Console data={details} serviceConsole={serviceConsoleData} />;
                        
                        case 2:
                            return <Billing data={details} />;
                            
                        case 3:
                            return <Actions data={details} setLoadingAnim={setActionLoading} config={props.config} />;
                            
                    }
                })()}

            </ContentWrapper>

        </Wrapper>
    )
}

const ContentWrapper = styled.div `

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
    width: 95%;
    max-width: 1400px;
    height: 100%;

`;

