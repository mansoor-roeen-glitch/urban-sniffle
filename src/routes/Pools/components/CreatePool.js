import React, { useEffect } from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import Button from '../../../components/buttons/ActionButton'
import axios from 'axios';
import SuccessMessage from '../../../components/messages/SuccessMessage';
import ErrorMessage from '../../../components/messages/ErrorMessage';

export default function CreatePlan(
    
    {
        config, 
        userDataLoading, 
        handleSubHeader,
        userData
    
    }) {
    
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(false);

    const [nodes, setNodes] = React.useState(0);
    const [type, setType] = React.useState(0);
    const [internal, setInternal] = React.useState(0);
    const [generateIps, setGenerateIps] = React.useState(0);

    const [network, setNetwork] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [gateway, setGateway] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [dns, setDns] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [mask, setMask] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [name, setName] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [startAddress, setStartAddress] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [endAddress, setEndAddress] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [interfaceField, setInterfaceField] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });


    const successRedirect = () => {
        window.location.pathname = '/plans/';
    }

    const handleMessage = (messageType, duration, message) => {

        setShowMessage({messageType, duration, message});
        
        setTimeout(() => {
            
            setShowMessage(false);

        }, duration * 1000)

    }

    const data = [
        {
            heading: "General IPs",
            value: "True",
            type: "dropdown",
            options: [
                {
                    name: "True",
                    type: "option"
                },
                {
                    name: "False",
                    type: "option"
                }
            ],
            selected: generateIps,
            onChange: setGenerateIps
        },
        {
            heading: "Start address",
            value: "Type your start address",
            type: "input",
            htmltype: "text",
            inputValue: startAddress.value,
            errorMes: startAddress.errorMes,
            messageDur: startAddress.messageDur,
            hasErrorMessage: startAddress.hasErrorMessage,
            onChange: setStartAddress
        },
        {
            heading: "End address",
            value: "Type your end address",
            type: "input",
            htmltype: "text",
            inputValue: endAddress.value,
            errorMes: endAddress.errorMes,
            messageDur: endAddress.messageDur,
            hasErrorMessage: endAddress.hasErrorMessage,
            onChange: setEndAddress
        },
        {
            heading: "name",
            value: "Type the name",
            type: "input",
            htmltype: "text",
            inputValue: name.value,
            errorMes: name.errorMes,
            messageDur: name.messageDur,
            hasErrorMessage: name.hasErrorMessage,
            onChange: setName
        },
        {
            heading: "type",
            value: "ipv4",
            type: "dropdown",
            options: [
                {
                    name: "ipv4",
                    type: "option"
                },
                {
                    name: "ipv6",
                    type: "option"
                }
            ],
            selected: type,
            onChange: setType
        },
        {
            heading: "network",
            value: "Type the network",
            type: "input",
            htmltype: "text",
            inputValue: network.value,
            errorMes: network.errorMes,
            messageDur: network.messageDur,
            hasErrorMessage: network.hasErrorMessage, 
            onChange: setNetwork
        },
        {
            heading: "mask",
            value: "Type the value",
            type: "input",
            htmltype: "number",
            inputValue: mask.value,
            errorMes: mask.errorMes,
            messageDur: mask.messageDur,
            hasErrorMessage: mask.hasErrorMessage,
            onChange: setMask
        },
        {

            heading: "gateway",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: gateway.value,
            errorMes: gateway.errorMes,
            messageDur: gateway.messageDur,
            hasErrorMessage: gateway.hasErrorMessage,
            onChange: setGateway

        },
        {
            heading: "internal",
            value: "True",
            type: "dropdown",
            options: [
                {
                    name: "True",
                    type: "option"
                },
                {
                    name: "False",
                    type: "option"
                }
            ],
            selected: internal,
            onChange: setInternal
        },
        {
            heading: "Interface",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: interfaceField.value,
            errorMes: interfaceField.errorMes,
            messageDur: interfaceField.messageDur,
            hasErrorMessage: interfaceField.hasErrorMessage,
            onChange: setInterfaceField
        },
        {
            heading: "dns",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: dns.value,
            errorMes: dns.errorMes,
            messageDur: dns.messageDur,
            hasErrorMessage: dns.hasErrorMessage,
            onChange: setDns
        },
        {
            heading: "nodes",
            value: "Test_node_2",
            type: "dropdown",
            options: [
                {
                    name: "Test_node_2",
                    type: "option"
                },
                {
                    name: "test_change",
                    type: "option"
                }
            ],
            selected: nodes,
            onChange: setNodes
        }
    ]

    const validateForm = () => {

        let ipValidationExpression = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

        let isFormValid = true;


        if (!endAddress.value) {
            setEndAddress(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "End Address field cannot be empty"
            }))

            isFormValid = false
        }

        if (!startAddress.value) {
            setStartAddress(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Start Address field cannot be empty"
            }))

            isFormValid = false
        }

        if (!interfaceField.value) {
            setInterfaceField(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Interface field cannot be empty"
            }))

            isFormValid = false
        }

        if (!name.value || name.value.length < 2 || name.value.length > 20) {
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Name field must be between 2 - 20 characters long"
            }))

            isFormValid = false
        }

        if (!network.value || !ipValidationExpression.test(network.value)) {
            setNetwork(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Network field must be a valid ipv4 or ipv6 address"
            }))

            isFormValid = false
        }

        if (!gateway.value || !ipValidationExpression.test(gateway.value)) {
            setGateway(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Gateway field must be a valid ipv4 or ipv6 address"
            }))

            isFormValid = false
        }

        if (!dns.value || !ipValidationExpression.test(dns.value)) {
            setDns(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "DNS field must be a valid ipv4 or ipv6 address"
            }))

            isFormValid = false
        }

        if (!mask.value || !/^\d+$/.test(mask.value)) {
            setMask(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Mask field can only contain integer values"
            }))

            isFormValid = false
        }

        return isFormValid;

    }

    const hanldeClick = () => {
        
        const isFormValid = validateForm();

        if (!isFormValid) {
            setLoading(false)
            return;
        }

        setLoading(true)

        let conf = {
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': 'application/json'
            }
        }

        axios.post("https://hosnet.io/api/pools/", { 
            
            "generate_ips": generateIps === 0 ? true : false ,
            "start_address": startAddress.value,
            "end_address": endAddress.value,
            "name": name.value,
            "type": data[4].options[type].name,
            "network": network.value,
            "mask": mask.value,
            "gateway": gateway.value,
            "internal": internal === 0 ? true : false,
            "interface": interfaceField.value,
            "dns": dns.value,
            "nodes": [
                3
            ]

        }, conf)
            
            .then((res) => {

                if (res.status === 201) {
                    setSuccess(true)
                    setError(false)
                    setLoading(false)
                    handleMessage("success", 5, "Plan created successfully!")

                    setTimeout(() => {
                        successRedirect();
                    }, 2000)
                }

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)
                handleMessage("error", 5, "Something went wrong, try again later")

            })

    }

    // Updating Sub-Header based on route
    useEffect(() => {
        handleSubHeader(["pools"], loading)
    }, [loading])

    if (userDataLoading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    // if (!userDataLoading && userData.is_staff === false) {
    //     return (
    //         <Redirect to="/" push={true} />
    //     )
    // }

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

                <Section data={data} heading="Create new pool" rows={3} rows1={4} rows2={6} rows3={12} rowHeight={105}  />
                
                <ButtonWrapper>
                    <Button onClick={hanldeClick} text="Create Pool" width="125px" height="45px" />
                </ButtonWrapper>

            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    margin-top: 15px;
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
    max-width: 1600px;
    padding-top: 15px;
`;
