import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/buttons/ActionButton';
import Chart from './Chart';
import Section from './Section';

export default function Details({data, serviceStatus, userDetails, config}) {

    const [plan, setPlan] = React.useState(0)
    const [node, setNode] = React.useState(0)
    const [template, setTemplate] = React.useState(0)
    const [showMessage, setShowMessage] = React.useState(false);
    const [responseLoading, setResponseLoading] = React.useState()

    const [dropdownDetailsLoading, setDropdownDetailsLoading] = React.useState(true);
    const [dropdownDetailsSuccess, setDropdownDetailsSuccess] = React.useState();
    const [dropdownDetailsError, setDropdownDetailsError] = React.useState();
    const [dropdownDetails, setDropdownDetails] = React.useState();

    const [success, setSuccess] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();

    let virtualMachine = [];
    let generalDetails = [];

    const isValidPassword = (input) => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(input)) {
            return true
        } else {
            return false
        }
    }
 
    const isValidHostname = (input) => {
        if (/^[a-zA-Z0-9-_]+$/.test(input)) {
            return true
        } else {
            return false
        }
    }

    const handleMessage = (messageType, duration, message) => {

        setShowMessage({messageType, duration, message});
        
        setTimeout(() => {
            
            setShowMessage(false);

        }, duration * 1000)

    }

    const [hostname, setHostname] = React.useState({

        value: data.hostname,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [password, setPassword] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [size, setSize] = React.useState({

        value: data.service_plan.size,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

        value: data.service_plan.ram,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [bandwidth, setBandwidth] = React.useState({

        value: data.service_plan.bandwidth,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: data.service_plan.ipv6_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv4, setIpv4] = React.useState({

        value: data.service_plan.ipv4_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const adminGeneralAccess = [
        {
            heading: "Owner",
            value: data.owner,
            type: "detail"
        },
        
        {
            heading: "template",
            value: data.service_plan.template,
            type: "dropdown",
            options: dropdownDetailsLoading ?

                [
                    {
                        name: data.service_plan.template,
                        type: "option"
                    }

                ] : dropdownDetails.templates.options,

            selected: template,
            onChange: setTemplate
        },


        {
            heading: "node",
            value: data.node,
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

        {
            heading: "status",
            value: data.status === undefined ? 'inactive' : data.status,
            type: "detail",
        },

        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            onChange: setHostname
        },

        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            onChange: setPassword
        }
    ]

    const clientGeneralAccess = [
        {
            heading: "Owner",
            value: data.owner,
            type: "detail"
        },
        {
            heading: "Plan",
            value: data.plan,
            type: "detail"
        },
        {
            heading: "Node",
            value: data.node,
            type: "detail"
        },
        {
            heading: "Status",
            value: data.status === undefined ? 'inactive' : data.status,
            type: "detail"
        },
        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            onChange: setHostname
        },
        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            onChange: setPassword
        }
    ]

    const adminVmAccess = [
        
        {
            heading: "plan type",
            value: data.plan,
            type: "dropdown",
            options: dropdownDetailsLoading ?

                [
                    {
                        name: data.plan,
                        type: "option"
                    }

                ] : dropdownDetails.plans.options,

            selected: plan,
            onChange: setPlan
        },

        {
            heading: "Size",
            value: size.value,
            type: "detail",
        },

        {
            heading: "ram",
            value: ram.value,
            type: "detail",
        },

        {
            heading: "bandwidth",
            value: bandwidth.value,
            type: "detail",
        },

        {
            heading: "Ipv6 ips",
            value: ipv6.value,
            type: "detail",
        },
        
        {
            heading: "Ipv4 ips",
            value: ipv4.value,
            type: "detail",
        },

    ]

    const clientVmAccess = [
        {
            heading: "Template",
            value: data.service_plan.template,
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
        {
            heading: "Bandwidth",
            value: data.service_plan.bandwidth,
            type: "detail"
        },
        {
            heading: "IPV6 IPS",
            value: data.service_plan.ipv6_ips,
            type: "detail"
        },
        {
            heading: "IPV4 IPS",
            value: data.service_plan.ipv4_ips,
            type: "detail"
        }
    ]

    const charts = [
        {
            heading: "Bandwith Usage",
            total: parseInt(serviceStatus.bandwidth_max),
            usage: parseInt(serviceStatus.bandwidth_used),
            unit: " GB"
        },
        {
            heading: "Disk Usage",
            total: parseInt(serviceStatus.disk_max),
            usage: parseInt(serviceStatus.disk_used),
            unit: " GB"
        },
        {
            heading: "Memory Usage",
            total: parseInt(serviceStatus.mem_max),
            usage: parseInt(serviceStatus.mem_used),
            unit: " GB"
        }
    ]

    if (userDetails.is_staff) {

        virtualMachine = adminVmAccess;
        generalDetails = adminGeneralAccess;

    } else {

        virtualMachine = clientVmAccess;
        generalDetails = clientGeneralAccess;

    }

    // const validateForm = ({hostnameField, passwordField}) => {
        
    //     let isHostnameValid = false;
    //     let isPasswordValid = false;


    //     if (!hostnameField.value || hostnameField.value.length < 2 || hostnameField.value.length > 28) {
    //         setHostname(prevState => ({
    //             ...prevState,
    //             hasErrorMessage: true,
    //             errorMes: "must be between 4 to 28 characters long"
    //         }))
        
    //     } else {
    //         isHostnameValid = true
    //     } 


    //     if (passwordField.length < 8)


    //     return {isHostnameValid, isPasswordValid};

    // }


    const handleSubmit = async () => {

        setLoading(true)

        const reqData = {
                
            "owner": userDetails.username,
            "hostname": hostname.value,
            "password": password.value,
            "plan": adminVmAccess[0].options[plan].name,
            "node": adminGeneralAccess[2].options[node].name,
            "template": adminGeneralAccess[1].options[template].name,
            "billing_type": 2
        }

        console.log(reqData)

        const reqHeaders = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        }

        axios.put(`https://hosnet.io/api/services/${data.id}`, reqData, reqHeaders)
        
        .then((res) => {
            if (res.status === 200) {
                setSuccess(true)
                setLoading(true)
                console.log(res)
            }
        })
        
        .catch((err) => {
            console.log(err)
            handleMessage("error", 5, "Something went wrong, try again later")
            return {error: err, status: false}

        });

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
            .catch((err) => {
                handleMessage("error", 5, "Something went wrong, try again later")
                return {error: err, status: false}
            
            });

        return response

    }

    useEffect( async () => {

        const plans = await fetchDetail("plans");
        const templates = await fetchDetail("templates");

        if (plans.status === 200 && templates.status === 200 ) {

            setDropdownDetails({

                plans: {
                    heading: "Plan Type",
                    value: plans.data.results[0].name,
                    type: "dropdown",
                    options: plans.data.results,
                    selected: plan,
                    onChange:  setPlan
                
                }, 
                
                templates: {
                    heading: "template",
                    value: templates.data.results[0].name,
                    type: "dropdown",
                    options: templates.data.results,
                    selected: template,
                    onChange: setTemplate  
                }})


            setDropdownDetailsSuccess(true)
            setDropdownDetailsLoading(false)
            

        } else {
            setDropdownDetailsLoading(false)
            setDropdownDetailsError(true)
        }

    }, [])

    return (
        <Wrapper>
            <InnerWrapper>
                
                {serviceStatus && (
                    <Charts>
                        { charts.map((chart, index) => {
                            return (
                                <Chart key={index} usage={chart.usage} heading={chart.heading} total={chart.total} unit={chart.unit} />
                            )
                        })}
                    </Charts>
                )}
            
                <Content marginTop={serviceStatus ? "50px" : "0px"}>
                    <Section data={generalDetails} heading="General Detials" rows={2} rows2={3} rows3={6} rowHeight={115} />
                    <RowGap />
                    <Section data={virtualMachine} heading="Virtual Machine" rows={2} rows2={3} rows3={6} rowHeight={115} />
                </Content>

                <ButtonWrapper>
                    <Button onClick={handleSubmit} text="Submit" width="130px" height="45px"  />
                </ButtonWrapper>
            
            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    width: fit-content;
    height: fit-content;
    padding-top: 30px;
`;

const RowGap = styled.div `
    width: 100%;
    height: 45px;
`;

const Content = styled.div `
    margin-top: ${props => props.marginTop};
`;

const Charts = styled.div `
    display: flex;
    flex-direction: row;

    column-gap: 6%;
    padding-top: 15px;

    @media screen and (max-width: 980px) {
        justify-content: center;
    }

    @media screen and (max-width: 755px) {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-template-rows: repeat(auto, 2);
        justify-content: flex-start;
        row-gap: 10px;
    }

`;

const InnerWrapper = styled.div `
    width: 90%;
    height: fit-content;
    padding-top: 50px;

    max-width: 1400px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;