import { Redirect } from 'react-router-dom';
import React, {useEffect} from 'react'
import styled from 'styled-components';
import SubHeader from '../../../components/Header/SubHeader';
import Section from '../../Service/components/Section';
import Button from '../../../components/buttons/ActionButton'
import axios from 'axios';
import SuccessMessage from '../../../components/messages/SuccessMessage';
import ErrorMessage from '../../../components/messages/ErrorMessage';

export default function CreatePlan(
    
    {
        config, 
        userDataLoading, 
        userData,
        handleSubHeader
    
    }) {
    
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(false);

    const [ipPool, setIpPool] = React.useState(0);

    const [bandwidth, setBandwidth] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpuu, setCpuu] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpul, setCpul] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [size, setSize] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [swap, setSwap] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

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

    const [price, setPrice] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [cores, setCores] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv4, setIpv4] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [internalIps, setInternalIps] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [term, setTerm] = React.useState({

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
            heading: "name",
            value: "Type the value",
            type: "input",
            htmlType: "text",
            inputValue: name.value,
            errorMes: name.errorMes,
            messageDur: name.messageDur,
            hasErrorMessage: name.hasErrorMessage,
            onChange: setName
        },
        {
            heading: "price",
            value: "Type the value",
            type: "input",
            htmlType: "text",
            inputValue: price.value,
            errorMes: price.errorMes,
            messageDur: price.messageDur,
            hasErrorMessage: price.hasErrorMessage, 
            onChange: setPrice
        },
        {
            heading: "size",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: size.value,
            errorMes: size.errorMes,
            messageDur: size.messageDur,
            hasErrorMessage: size.hasErrorMessage,
            onChange: setSize
        },
        {

            heading: "cores",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: cores.value,
            errorMes: cores.errorMes,
            messageDur: cores.messageDur,
            hasErrorMessage: cores.hasErrorMessage,
            onChange: setCores

        },
        {
            heading: "ram",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: ram.value,
            errorMes: ram.errorMes,
            messageDur: ram.messageDur,
            hasErrorMessage: ram.hasErrorMessage,
            onChange: setRam
        },
        {
            heading: "bandwidth",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: bandwidth.value,
            errorMes: bandwidth.errorMes,
            messageDur: bandwidth.messageDur,
            hasErrorMessage: bandwidth.hasErrorMessage,
            onChange: setBandwidth
        },
        {
            heading: "Cpu Unit",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: cpuu.value,
            errorMes: cpuu.errorMes,
            messageDur: cpuu.messageDur,
            hasErrorMessage: cpuu.hasErrorMessage,
            onChange: setCpuu
        },
        {
            heading: "swap",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: swap.value,
            errorMes: swap.errorMes,
            messageDur: swap.messageDur,
            hasErrorMessage: swap.hasErrorMessage,
            onChange: setSwap
        },
        {
            heading: "cpu_limit",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: cpul.value,
            errorMes: cpul.errorMes,
            messageDur: cpul.messageDur,
            hasErrorMessage: cpul.hasErrorMessage,
            onChange: setCpul
        },
        {
            heading: "ipv6 ips",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: ipv6.value,
            errorMes: ipv6.errorMes,
            messageDur: ipv6.messageDur,
            hasErrorMessage: ipv6.hasErrorMessage,
            onChange: setIpv6
        }, 
        {
            heading: "ipv4 ips",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: ipv4.value,
            errorMes: ipv4.errorMes,
            messageDur: ipv4.messageDur,
            hasErrorMessage: ipv4.hasErrorMessage,
            onChange: setIpv4
        },
        {
            heading: "internal ips",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: internalIps.value,
            errorMes: internalIps.errorMes,
            messageDur: internalIps.messageDur,
            hasErrorMessage: internalIps.hasErrorMessage,
            onChange: setInternalIps
        },
        {
            heading: "term",
            value: "Type the value",
            type: "input",
            htmlType: "number",
            inputValue: term.value,
            errorMes: term.errorMes,
            messageDur: term.messageDur,
            hasErrorMessage: term.hasErrorMessage,
            onChange: setTerm
        },
        {
            heading: "ip pool",
            value: "1",
            type: "dropdown",
            options: [
                {
                    name: 3,
                    type: "option"
                }
            ],
            selected: ipPool,
            onChange: setIpPool
        }
    ]

    const validateForm = () => {

        let isFormValid = true;

        if (!name.value || name.value.length < 2 || name.value.length > 20) {
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be between 1-20 char long"
            }))

            isFormValid = false
        }

        if (!/^\d+(?:[.,]\d+)*$/.test(price.value) || !price.value) {
            setPrice(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must only be int or float"
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

        if (!cpul.value || !/^\d+$/.test(cpul.value)) {
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

        if (!term.value || !/^\d+$/.test(term.value)) {
            setTerm(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be int only"
            }))

            isFormValid = false
        }

        return isFormValid;

    }

    const hanldeClick = () => {
        
        let isFormValid = validateForm()

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

        axios.post("https://hosnet.io/api/plans/", { 
            
            size: size.value,
            ram: ram.value,
            swap: swap.value,
            cores: cores.value,
            bandwidth: bandwidth.value, 
            cpu_units: cpuu.value,
            cpu_limit: cpul.value, 
            name: name.value,
            price: price.value, 
            ipv4_ips: ipv4.value,
            ipv6_ips: ipv6.value,
            internal_ips: internalIps.value,
            term: term.value,
            ip_pools: [data[13].options[ipPool].name]

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
        handleSubHeader(["create plan"], loading)
    }, [loading])

    if (userDataLoading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    if (!userDataLoading && userData.is_staff === false) {
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


            <InnerWrapper>

                <Section data={data} heading="Create new plan" rows={4} rows1={5} rows2={7} rows3={14} rowHeight={105}  />
                
                <ButtonWrapper>
                    <Button onClick={hanldeClick} text="Create Plan" width="125px" height="45px" />
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
