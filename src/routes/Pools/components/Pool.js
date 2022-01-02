import React, {useState} from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import Button from '../../../components/buttons/ActionButton';
import DeleteBtn from '../../../components/buttons/DangerActionButton';
import axios from 'axios';
import ErrorMessage from '../../../components/messages/ErrorMessage';
import SuccessMessage from '../../../components/messages/SuccessMessage';
import {Redirect} from 'react-router-dom'

export default function Plan(props) {

    const [details, setDetails] = useState(props.details);

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [nodes, setNodes] = React.useState(0);
    const [type, setType] = React.useState(0);
    const [internal, setInternal] = React.useState(0);
    const [generateIps, setGenerateIps] = React.useState(0);

    const [network, setNetwork] = React.useState({

        value: details.network,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [gateway, setGateway] = React.useState({

        value: details.gateway,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [dns, setDns] = React.useState({

        value: details.dns,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [mask, setMask] = React.useState({

        value: details.mask,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [name, setName] = React.useState({

        value: details.name,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [startAddress, setStartAddress] = React.useState({

        value: details.start_address,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [endAddress, setEndAddress] = React.useState({

        value: details.end_address,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [interfaceField, setInterfaceField] = React.useState({

        value: details.interface,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [showMessage, setShowMessage] = useState(false);

    const successRedirect = () => {
        window.location.pathname = '/pools/';
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
            value: details.start_address,
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
            value: details.end_address,
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
            value: details.name,
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
            value: details.type,
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
            value: details.network,
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
            value: details.mask,
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
            value: details.gateway,
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
            value: details.interface,
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
            value: details.dns,
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

    const checkForm = () => {

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

    const handleClick = () => {
        
        setLoading(true);
        setError(false);

        let isFormValid = checkForm();

        if (!isFormValid) {
            setError(true)
            setLoading(false)

            return;
        }

        const reqData = {
            
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

        }

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.put(`https://hosnet.io/api/pools/${details.id}/`, reqData, conf)

            .then((res) => {

                setSuccess(true)
                setError(false)
                setLoading(false)
                handleMessage("success", 5, "Pool was updated successfully!")

                setTimeout(() => {
                    successRedirect();
                }, 2000)

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)
                handleMessage("error", 5, "Something went wrong, try again later")

            })

    }
    
    const handleDelete = () => {

        setLoading(true)
        setError(false)

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.delete(`https://hosnet.io/api/pools/${details.id}/`, conf)

        .then((res) => {

            setSuccess(true)
            setError(false)
            setLoading(false)
            handleMessage("success", 5, "Pool was deleted successfully!")

            setTimeout(() => {
                successRedirect();
            }, 2000)

        })

        .catch((err) => {

            setError(err)
            setSuccess(false)
            setLoading(false)
            handleMessage("error", 5, "Something went wrong, try again later")
        
        })
    }

    if (props.userDataLoading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={props.userDataLoading} pathName="Create plan" />
            </Wrapper>
        )
    }

    if (!props.userDataLoading && props.userData.is_staff === false) {
        return (
            <Redirect to="/" push={true} />
        )
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

            <SubHeader path={true} loading={loading || props.userDataLoading ? true : false} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Pool" rows={4} rows2={5} rows3={10} rowHeight={105} />
                </Content>
                
                <ButtonWrapper>
                    <Button height="45px" width="150px" text="Update Pool" onClick={handleClick} />
                    <DeleteBtn height="45px" width="150px" text="Delete Pool" onClick={handleDelete} />
                </ButtonWrapper>

            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    margin-top: 15px;

    display: flex;
    column-gap: 30px;
`;

const Content = styled.div `
`;

const InnerWrapper = styled.div `
    width: 93%;
    height: fit-content;
    padding-top: 15px;

    max-width: 1400px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;