import React from 'react';
import SubHeader from '../../components/Header/SubHeader';
import styled from 'styled-components';
import axios from 'axios';

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';

export default function Service (props) {

    const {id, hostname} = props.details
    const [selected, setSelected] = React.useState(0)

    const [serviceStatus, setServiceStatus] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState()
    const [details, setDetails] = React.useState()
    const [error, setError] = React.useState()

    const getServiceDetails = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/services/${id}`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${props.config}`
            }
        })
            .then((res) => {return {status: res.status, data: res.data}})
            .catch((error ) => {return {status: 400, data: error};})
        
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

        if (serviceDetails.status === 200 && serviceStatus.status === 200) {

            setDetails(serviceDetails.data)
            setServiceStatus(serviceStatus.data)
            setLoading(false)
            setSuccess(true)
            setError(false)

        } else if (serviceDetails.status === 200 && !serviceStatus.status) {

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
    ]

    const handleOptionClick = (index) => {
        setSelected(index)
    }

    if (loading) {

        return <h1>Loading ... </h1>

    }

    if (error) {

        return <h1>Something went wrong</h1>

    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName={hostname} />
            <HeaderWrapper>
                <InnerWrapper>
                    <List>
                        {selectOptions.map((option) => {
                            return (
                                <Item className={selected === option.index ? "Option-Selected" : ""} style={{opacity: selected === option.index ? "1" : ".5"}}>
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

                { (() => {
                    switch(selected) {
                        
                        case 0:
                            return <Details data={details} serviceStatus={serviceStatus} />;

                        case 1:
                            return <Console data={details} />;
                        
                        case 2:
                            return <Billing data={details} />;
                        
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
    font-size: 1.22rem;
    font-weight: 300;
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
    height: 60px;
    background: transparent;
    padding-top: 10px;

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

