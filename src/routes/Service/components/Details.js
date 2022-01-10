import axios from 'axios';
import styled from 'styled-components'
import React, { useEffect } from 'react'
import Svg from '../../../components/icons/SvgIcon'
import VPSDetailsSection from './VPSDetailsSection';

export default function Details({data, serviceStatus, userDetails, config}) {

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

    
    let virtualMachine = [];
    let generalDetails = [];
    let extraSettings = [];

    let ips = [
        {
            type: "ipv6",
            ip: " 2600:1700:33b0:13c1:c3f8:92c9:a191:eccd"
        },
        {
            type: "ipv6",
            ip: " 2600:1700:33b0:13c1:c3f8:92c9:a191:eccd"
        },
        {
            type: "ipv6",
            ip: " 2600:1700:33b0:13c1:c3f8:92c9:a191:eccd"
        },
        {
            type: "ipv4",
            ip: "2600:1700:33b0:13c1"
        }

    ];

    const successRedirect = () => {
        window.location.pathname = '/';
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
            options: dropdownDetailsLoading || dropdownDetails.templates.options.length === 0 || dropdownDetailsError ?

                [
                    {
                        name: data.service_plan.template ? data.service_plan.template : "undefined",
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
            options: dropdownDetailsLoading || dropdownDetails.nodes.options.length === 0 || dropdownDetailsError ?

                [
                    {
                        name: data.node ? data.node : "undefined",
                        type: "option"
                    }

                ] : dropdownDetails.nodes.options,

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
            options: dropdownDetailsLoading || dropdownDetails.plans.options.length === 0 || dropdownDetailsError ?

                [
                    {
                        name: data.plan ? data.plan : "undefined",
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
            value: data.service_plan.type,
            type: "dropdown",
            options: [
                {
                    type: 'option',
                    name: "kvm"
                },
                {
                    type: 'option',
                    name: "lxc"
                }
            ],
            selected: planType,
            onChange: setPlanType
        },

        {
            heading: "storage",
            value: data.service_plan.storage,
            type: "dropdown",
            options: dropdownDetailsLoading || dropdownDetails.storages.options.length === 0 || dropdownDetailsError ?

                [
                    {
                        name: data.service_plan.storage ? data.service_plan.storage : "undefined",
                        type: "option"
                    }

                ] : dropdownDetails.storages.options,

            selected: storage,
            onChange: setStorage
        },

        {
            heading: "Ip pools",
            value: "Select an IP pool",
            type: "dropdown",
            options: dropdownDetailsLoading || dropdownDetails.pools.options.length === 0 || dropdownDetailsError ?

                [
                    {
                        name: "undefined",
                        type: "option"
                    }

                ] : dropdownDetails.pools.options,

            selected: pool,
            onChange: setPool
        },
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
            unit: "GB"
        },
        {
            heading: "Storage Usage",
            total: serviceStatus.disk_max,
            usage: serviceStatus.disk_used,
            unit: "GB"
        }, 
        {
            heading: "Memeory Usage",
            total: serviceStatus.mem_max,
            usage: serviceStatus.mem_used,
            unit: "GB"
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

        if (!password.value || password.value.length < 2 || password.value.length > 24) {
            setPassword(prevState => ({
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
                    "storage": adminExtraFields[6].options[storage].name,
                    "ip_pools": [dropdownDetails.pools.options[pool].id]
                }, 

                "billing_type": 2
            }
            , reqHeaders)
        
        .then((res) => {
            if (res.status === 200) {
                setSuccess(true)
                setLoading(true)

                handleMessage("success", 5, "Service was updated successfully!")

                setTimeout(() => {
                    successRedirect();
                }, 2000)
            }
        })
        
        .catch((err) => {
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
        const nodes = await fetchDetail("nodes");
        const storages = await fetchDetail("node-disks");
        const pools = await fetchDetail("pools");

        if (plans.status === 200 && templates.status === 200 && nodes.status === 200 && storages.status === 200 && pools.status === 200) {

            setDropdownDetails({

                plans: {
                    options: plans.data.results,
                }, 
                
                templates: {
                    options: templates.data.results,
                },
                
                nodes: {
                    options: nodes.data.results,
                },

                storages: {
                    options: storages.data.results,
                },

                pools: {
                    options: pools.data.results,
                }
            
            })


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

    let detialList = [
        {
            svg: "/images/profile2.svg",
            heading: "Owner",
            value: "Joe Doe"
        },
        {
            svg: "/images/template.svg",
            heading: "Template",
            value: "CentOs 8"
        },
        {
            svg: "/images/node.svg",
            heading: "Node",
            value: "Magus"
        },
        {
            svg: "/images/status.svg",
            heading: "Status",
            value: "Inactive"
        },
        {
            svg: "/images/status.svg",
            heading: "Hostname",
            value: "TEST_HOSTNAME_2"
        },
        {
            svg: "/images/status.svg",
            heading: "Passowrd",
            value: "********"
        },
        {
            svg: "/images/status.svg",
            heading: "Plan Type",
            value: "Basic"
        }
    ]

    return (

        <Wrapper>
            <InnerWrapper>
                    
                    <VPSDetailsSection list={detialList} heading="General Details" />
                    <VPSDetailsSection list={detialList} heading="General Details" />

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