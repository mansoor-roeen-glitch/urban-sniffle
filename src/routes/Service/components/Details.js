import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/buttons/ActionButton';
import ErrorMessage from '../../../components/messages/ErrorMessage';
import SuccessMessage from '../../../components/messages/SuccessMessage';
import Chart from './Chart';
import Section from './Section';

export default function Details({data, serviceStatus, userDetails, config}) {

    const [plan, setPlan] = React.useState(0)
    const [status, setStatus] = React.useState(0)
    const [node, setNode] = React.useState(0)
    const [template, setTemplate] = React.useState(0)
    const [planType, setPlanType] = React.useState(0)
    
    const [dropdownDetailsLoading, setDropdownDetailsLoading] = React.useState(true);
    const [dropdownDetailsSuccess, setDropdownDetailsSuccess] = React.useState();
    const [dropdownDetailsError, setDropdownDetailsError] = React.useState();
    const [dropdownDetails, setDropdownDetails] = React.useState();
    
    const [success, setSuccess] = React.useState();
    const [error, setError] = React.useState();
    const [loading, setLoading] = React.useState();
    const [showMessage, setShowMessage] = React.useState(false);

    
    let virtualMachine = [];
    let generalDetails = [];
    let extraSettings = [];

    const successRedirect = () => {
        window.location.pathname = '/plans/';
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

        value: JSON.stringify(data.service_plan.size),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

        value: JSON.stringify(data.service_plan.ram),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [bandwidth, setBandwidth] = React.useState({

        value: JSON.stringify(data.service_plan.bandwidth),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: JSON.stringify(data.service_plan.ipv6_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv4, setIpv4] = React.useState({

        value: JSON.stringify(data.service_plan.ipv4_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [storage, setStorage] = React.useState({

        value: JSON.stringify(data.service_plan.storage),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [internalIps, setInternalIps] = React.useState({

        value: JSON.stringify(data.service_plan.internal_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [swap, setSwap] = React.useState({

        value: JSON.stringify(data.service_plan.swap),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cores, setCores] = React.useState({

        value: JSON.stringify(data.service_plan.cores),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpuu, setCpuu] = React.useState({

        value: JSON.stringify(data.cpu_units),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpul, setCpul] = React.useState({

        value: JSON.stringify(data.cpu_limit),
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
            type: "dropdown",
            options: [
                {
                    name: "pending",
                    type: "option"
                },
                {
                    name: "active",
                    type: "option"
                }, 
                {
                    name: "destroyed",
                    type: "option"
                },
                {
                    name: "suspended",
                    type: "option"
                },
                {
                    name: "error",
                    type: "option"
                },
                {
                    name: "past due",
                    type: "option"
                }
            ],
            selected: status,
            onChange: setStatus 
        },

        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            onChange: setHostname,
            errorMes: hostname.errorMes,
            messageDur: hostname.messageDur,
            hasErrorMessage: hostname.hasErrorMessage,
        },

        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            onChange: setPassword,
            errorMes: password.errorMes,
            messageDur: password.messageDur,
            hasErrorMessage: password.hasErrorMessage,
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
            type: "input",
            inputValue: size.value,
            onChange: setSize,
            htmltype: "number",
            errorMes: size.errorMes,
            messageDur: size.messageDur,
            hasErrorMessage: size.hasErrorMessage,
        },

        {
            heading: "ram",
            value: ram.value,
            type: "input",
            inputValue: ram.value,
            onChange: setRam,
            htmltype: "number",
            errorMes: ram.errorMes,
            messageDur: ram.messageDur,
            hasErrorMessage: ram.hasErrorMessage,
        },

        {
            heading: "bandwidth",
            value: bandwidth.value,
            type: "input",
            inputValue: bandwidth.value,
            onChange: setBandwidth,
            htmltype: "number",
            errorMes: bandwidth.errorMes,
            messageDur: bandwidth.messageDur,
            hasErrorMessage: bandwidth.hasErrorMessage,
        },

        {
            heading: "Ipv6 ips",
            value: ipv6.value,
            type: "input",
            inputValue: ipv6.value,
            onChange: setIpv6,
            htmltype: "number",
            errorMes: ipv6.errorMes,
            messageDur: ipv6.messageDur,
            hasErrorMessage: ipv6.hasErrorMessage,
        },
        
        {
            heading: "Ipv4 ips",
            value: ipv4.value,
            type: "input",
            inputValue: ipv4.value,
            onChange: setIpv4,
            htmltype: "number",
            errorMes: ipv4.errorMes,
            messageDur: ipv4.messageDur,
            hasErrorMessage: ipv4.hasErrorMessage,
        },

    ]

    const adminExtraFields = [
        {
            heading: "cores",
            value: cores.value,
            type: "input",
            inputValue: cores.value,
            onChange: setCores,
            htmltype: "number",
            errorMes: cores.errorMes,
            messageDur: cores.messageDur,
            hasErrorMessage: cores.hasErrorMessage,
        },
        {
            heading: "swap",
            value: swap.value,
            type: "input",
            inputValue: swap.value,
            onChange: setSwap,
            htmltype: "number",
            errorMes: swap.errorMes,
            messageDur: swap.messageDur,
            hasErrorMessage: swap.hasErrorMessage,
        },
        {
            heading: "cpu units",
            value: cpuu.value,
            type: "input",
            inputValue: cpuu.value,
            onChange: setCpuu,
            htmltype: "number",
            errorMes: cpuu.errorMes,
            messageDur: cpuu.messageDur,
            hasErrorMessage: cpuu.hasErrorMessage,
        },
        {
            heading: "cpu limit",
            value: cpul.value,
            type: "input",
            inputValue: cpul.value,
            onChange: setCpul,
            htmltype: "number",
            errorMes: cpul.errorMes,
            messageDur: cpul.messageDur,
            hasErrorMessage: cpul.hasErrorMessage,
        },
        {
            heading: "internal ips",
            value: internalIps.value,
            type: "input",
            inputValue: internalIps.value,
            onChange: setInternalIps,
            htmltype: "number",
            errorMes: internalIps.errorMes,
            messageDur: internalIps.messageDur,
            hasErrorMessage: internalIps.hasErrorMessage,
        },
        {
            heading: "type",
            value: 'something',
            type: "dropdown",
            options: [
                {
                    type: 'option',
                    name: "kvm"
                }
            ],
            selected: planType,
            onChange: setPlanType
        }
    ]


    // Below is the data shown if user is a client
    // Client is only allowed to change hostname and password

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
            total: serviceStatus.bandwidth_max,
            usage: serviceStatus.bandwidth_used,
            unit: " GB"
        },
        {
            heading: "Disk Usage",
            total: serviceStatus.disk_max,
            usage: serviceStatus.disk_used,
            unit: " GB"
        },
        {
            heading: "Memory Usage",
            total: serviceStatus.mem_max,
            usage: serviceStatus.mem_used,
            unit: " GB"
        }
    ]

    
    const validateForm = () => {

        let isFormValid = true;

        if (!hostname.value || hostname.value.length < 2 || hostname.value.length > 24) {
            setHostname(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be between 1-24 characters long"
            }))

            isFormValid = false
        }

        if (!size.value || !/^\d+$/.test(size.value)) {
            setSize(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must only be int only"
            }))

            isFormValid = false
        }

        if (!cores.value || !/^\d+$/.test(cores.value)) {
            setCores(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!ram.value || !/^\d+$/.test(ram.value)) {
            setRam(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!bandwidth.value || !/^\d+$/.test(bandwidth.value)) {
            setBandwidth(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!cpul.value || !/^\d+(?:[.,]\d+)*$/.test(cpul.value)) {
            setCpul(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!swap.value || !/^\d+$/.test(swap.value)) {
            setSwap(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!cpuu.value || !/^\d+(?:[.,]\d+)*$/.test(cpuu.value)) {
            setCpuu(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int or float only"
            }))

            isFormValid = false
        }

        if (!ipv4.value || !/^\d+$/.test(ipv4.value)) {
            setIpv4(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!ipv6.value || !/^\d+$/.test(ipv6.value)) {
            setIpv6(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        if (!internalIps.value || !/^\d+$/.test(internalIps.value)) {
            setInternalIps(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        return isFormValid;

    }


    const handleSubmit = async () => {

        const isFormValid = validateForm()

        if (!isFormValid) {
            return null;
        }

        setLoading(true)

        const reqHeaders = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        }

        axios.put(`https://hosnet.io/api/services/${data.id}/`, 
            {
                    
                "owner": userDetails.username,
                "hostname": hostname.value,
                "password": password.value,
                "plan": adminVmAccess[0].options[plan].name,
                "node": adminGeneralAccess[2].options[node].name,
                "status": adminGeneralAccess[3].options[status].name,
                
                "service_plan": {

                    "storage": "local-zfs",
                    "size": size.value,
                    "ram": ram.value,
                    "swap": swap.value,
                    "cores": cores.value,
                    "bandwidth": bandwidth.value,
                    "cpu_units": cpuu.value,
                    "cpu_limit": cpul.value,
                    "ipv6_ips": ipv6.value,
                    "ipv4_ips": ipv4.value,
                    "internal_ips": internalIps.value,

                    "type": adminExtraFields[5].options[planType].name,
                    "template": adminGeneralAccess[1].options[template].name,
                    "ip_pools": [1]
                }, 

                "billing_type": 2
            }
            , reqHeaders)
        
        .then((res) => {
            if (res.status === 200) {
                setSuccess(true)
                setLoading(true)
                console.log(res)

                handleMessage("success", 5, "Plan was updated successfully!")

                setTimeout(() => {
                    successRedirect();
                }, 2000)
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


    if (userDetails.is_staff) {

        virtualMachine = adminVmAccess;
        generalDetails = adminGeneralAccess;
        extraSettings = adminExtraFields;

    } else {

        virtualMachine = clientVmAccess;
        generalDetails = clientGeneralAccess;

    }


    return (
        <Wrapper>

            {showMessage && 

                showMessage.messageType === "success" && (

                    <SuccessMessage message={showMessage.message} duration={showMessage.duration} isVisible={true} />

                )
            }

            {showMessage && 

                showMessage.messageType === "error" && (

                    <ErrorMessage message={showMessage.message} duration={showMessage.duration} isVisible={true} />

                )
            }

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
                        
                    {extraSettings.length > 0 && (
                        <RowGap />
                    )}

                    {extraSettings.length > 0 && (
                        <Section data={adminExtraFields} heading="Extra Settings" rows={2} rows2={3} rows3={6} rowHeight={115} />
                    )}

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