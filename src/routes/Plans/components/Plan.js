import React from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import Button from '../../../components/buttons/ActionButton';
import DeleteBtn from '../../../components/buttons/DangerActionButton';
import axios from 'axios';
import { set } from 'js-cookie';
import SuccessMessage from '../../../components/messages/SuccessMessage';
import ErrorMessage from '../../../components/messages/ErrorMessage';

export default function Plan(props) {
    
    const [details, setDetails] = React.useState(props.details);

    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [showMessage, setShowMessage] = React.useState(false);

    const [ipPool, setIpPool] = React.useState(0);
    console.log(details)
    const [bandwidth, setBandwidth] = React.useState({

        value: JSON.stringify(details.bandwidth),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpuu, setCpuu] = React.useState({

        value: JSON.stringify(details.cpu_units),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpul, setCpul] = React.useState({

        value: details.cpu_limit,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [size, setSize] = React.useState({

        value: JSON.stringify(details.size),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [swap, setSwap] = React.useState({

        value: JSON.stringify(details.swap),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

        value: JSON.stringify(details.ram),
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

    const [price, setPrice] = React.useState({

        value: JSON.stringify(details.price),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [cores, setCores] = React.useState({

        value: JSON.stringify(details.cores),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv4, setIpv4] = React.useState({

        value: JSON.stringify(details.ipv4_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: JSON.stringify(details.ipv6_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [internalIps, setInternalIps] = React.useState({

        value: JSON.stringify(details.internal_ips),
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [term, setTerm] = React.useState({

        value: JSON.stringify(details.term),
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
            value: name.value,
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
            value: price.value,
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
            value: size.value,
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
            value: cores.value,
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
            value: ram.value,
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
            value: bandwidth.value,
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
            value: cpuu.value,
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
            value: swap.value,
            type: "input",
            htmlType: "number",
            inputValue: swap.value,
            errorMes: swap.errorMes,
            messageDur: swap.messageDur,
            hasErrorMessage: swap.hasErrorMessage,
            onChange: setSwap
        },
        {
            heading: "cpu limit",
            value: cpul.value,
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
            value: ipv6.value,
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
            value: ipv4.value,
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
            value: internalIps.value,
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
                    name: 1,
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
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.put(`https://hosnet.io/api/plans/${details.id}/`, { 
            
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

                if (res.status === 200) {
                    setSuccess(true)
                    setError(false)
                    setLoading(false)
                    handleMessage("success", 5, "Plan was updated successfully!")

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

    const handleDelete = () => {

        setLoading(true)
        setError(false)
        setSuccess(false)

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.delete(`https://hosnet.io/api/plans/${details.id}/`, conf)

        .then((res) => {

            setSuccess(true)
            setError(false)
            setLoading(false)
            
            handleMessage("success", 5, "Plan was deleted successfully!")

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

            <SubHeader path={true} loading={loading} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Plan" rows={5} rows2={7} rows3={14} rowHeight={115} />
                </Content>
                <ButtonWrapper>
                    <Button height="45px" width="140px" text="Update Plan" onClick={hanldeClick} />
                    <DeleteBtn height="45px" width="140px" text="Delete Plan" onClick={handleDelete} />
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
    padding-top: 25px;

    max-width: 1400px;
    margin-bottom: 15px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;