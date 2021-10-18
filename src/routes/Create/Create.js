import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SubHeader from '../../components/Header/SubHeader';
import PrimaryInput from '../../components/inputs/PrimaryInput'
import Section from '../Service/components/Section';

export default function Create({config}) {
    
    const [node, setNode] = useState(0)
    const [planType, setPlanType] = useState(0)
    const [template, setTemplate] = useState(0)
    const [billingMethod, setBillingMethod] = useState(0)

    const [hostname, setHostname] = useState("")
    const [password, setPassword] = useState("")

    const [details, setDetails] = useState()
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState()
    const [error, setError] = useState()

    const createService = async () => {

        const response = await axios({
            method: "post",
            url: "https://hosnet.io/api/services/",
            data: {
                
                "id": 88,
            "owner": "sss",
            "billing_id": null,
            "machine_id": 1000018,
            "hostname": "sodlksadfafjslakj",
            "plan": "Basic",
            "node": "magus",
            "status": "error",
            "service_plan": {
                "template": "Winn",
                "storage": "local-zfs",
                "size": 128,
                "ram": 1024,
                "swap": 0,
                "cores": 4,
                "bandwidth": 1024,
                "cpu_units": 1024,
                "cpu_limit": "0.00",
                "ipv6_ips": 1,
                "ipv4_ips": 0,
                "internal_ips": 1,
                "type": "lxc",
                "ip_pools": [
                    1
                ]
            },
            "billing_type": null
            },
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        })

        console.log(response)

    }

    const fetchDetail = async (endpoint) => {

        const response = await axios({
            method: "get",
            url: `https://hosnet.io/api/${endpoint}/`,
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        })
            .then((res) => {return {data: res.data, status: 200}})
            .catch((err) => {return {error: err, status: false}});

        return response

    }

    const staticdata = [
        {
            heading: "hostname",
            value: "example-hostname",
            type: "input",
            htmltype: "text",
            inputValue: hostname,
            onChange: setHostname
        },
        {
            heading: "password",
            value: "your-password",
            type: "input",
            htmltype: "password",
            inputValue: password,
            onChange: setPassword
        },
        {
            heading: "node",
            value: "magus",
            type: "dropdown",
            options: [
                {
                    name: "magus",
                    type: "option"
                }
            ],
            selected: node,
            onChange: setNode
        },
        !loading && details.plans,
        !loading && details.templates,
        {
            heading: "billing method",
            value: "stripe",
            type: "detail",
            selected: billingMethod,
            onChange: setBillingMethod  
        }

    ]

    useEffect( async () => {

        const plans = await fetchDetail("plans");
        const templates = await fetchDetail("templates");

        if (plans.status === 200 && templates.status === 200) {

            setDetails({
                plans: {
                    heading: "Plan Type",
                    value: plans.data.results[0].name,
                    type: "dropdown",
                    options: plans.data.results,
                    selected: planType,
                    onChange:  setPlanType
                
                }, 
                
                templates: {
                    heading: "template",
                    value: templates.data.results[0].name,
                    type: "dropdown",
                    options: templates.data.results,
                    selected: template,
                    onChange: setTemplate  
                }})

            setLoading(false)
            setSuccess(true)
            

        } else {
            setLoading(false)
            setError(true)
        }

    }, [])    

    if (loading) {

        return (
            <Wrapper>
                <SubHeader path={true} pathName="Create service" />
                {/* Loading will be included below this */}
                <h1>Please wait, loading</h1>
            </Wrapper>
        )

    }

    if (error) {
        
        return (
            <Wrapper>
                <SubHeader path={true} pathName="Create service" />
                {/* Error will be included below this */}
                <h1>Something went wrong, try again later</h1>
            </Wrapper>
        )

    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName="Create service" />
            <InnerWrapper>
                <Section data={staticdata} heading="Create new service" rows={2} rowHeight={130}  />
                <ButtonWrapper>
                    <PrimaryButton onClick={createService} text="Proceed to checkout" to="/create" width="200px" height="45px" />
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InnerWrapper = styled.div `
    width: 93%;
    height: fit-content;
    max-width: 1400px;
    padding-top: 25px;

    margin-bottom: 60px;
`;
