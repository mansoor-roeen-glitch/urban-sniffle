import React, {useEffect} from 'react'
import styled from 'styled-components';
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

    const [type, setType] = React.useState(0)

    const [bandwidth, setBandwidth] = React.useState({

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
    
    const [cores, setCores] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [key, setKey] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [host, setHost] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [user, setUser] = React.useState({

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
            htmltype: "text",
            inputValue: name.value,
            errorMes: name.errorMes,
            messageDur: name.messageDur,
            hasErrorMessage: name.hasErrorMessage,
            onChange: setName
        },
        {
            heading: "host",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: host.value,
            errorMes: host.errorMes,
            messageDur: host.messageDur,
            hasErrorMessage: host.hasErrorMessage, 
            onChange: setHost
        },
        {
            heading: "Key",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: key.value,
            errorMes: key.errorMes,
            messageDur: key.messageDur,
            hasErrorMessage: key.hasErrorMessage,
            onChange: setKey
        },
        {
            heading: "size",
            value: "Type the value",
            type: "input",
            htmltype: "number",
            inputValue: size.value,
            errorMes: size.errorMes,
            messageDur: size.messageDur,
            hasErrorMessage: size.hasErrorMessage,
            onChange: setSize
        },
        {
            heading: "user",
            value: "Type the value",
            type: "input",
            htmltype: "text",
            inputValue: user.value,
            errorMes: user.errorMes,
            messageDur: user.messageDur,
            hasErrorMessage: user.hasErrorMessage,
            onChange: setUser
        },
        {

            heading: "cores",
            value: "Type the value",
            type: "input",
            htmltype: "number",
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
            htmltype: "number",
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
            htmltype: "number",
            inputValue: bandwidth.value,
            errorMes: bandwidth.errorMes,
            messageDur: bandwidth.messageDur,
            hasErrorMessage: bandwidth.hasErrorMessage,
            onChange: setBandwidth
        },
        {
            heading: "swap",
            value: "Type the value",
            type: "input",
            htmltype: "number",
            inputValue: swap.value,
            errorMes: swap.errorMes,
            messageDur: swap.messageDur,
            hasErrorMessage: swap.hasErrorMessage,
            onChange: setSwap
        },
        {
            heading: "type",
            value: "Proxmox",
            type: "dropdown",
            options: [
                {
                    name: "Proxmox",
                    type: "option"
                }
            ],
            selected: type,
            onChange: setType
        }
    ]

    const validateForm = () => {

        let isFormValid = true;

        if (!user.value) {
            setUser(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Name cannot be empty"
            }))

            isFormValid = false
        }

        if (!key.value) {
            setKey(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Key cannot be empty"
            }))

            isFormValid = false
        }

        if (!host.value || !/\\d+(\\.\\d+)*/.test(host.value)) {
            setHost(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "Hostname can only be number with dots"
            }))

            isFormValid = false
        }

        if (!name.value || name.value.length < 2 || name.value.length > 20) {
            setName(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be between 1-20 char long"
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

        if (!swap.value || !/^\d+$/.test(swap.value)) {
            setSwap(prevState => ({
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
            
            // size: size.value,
            // ram: ram.value,
            // swap: swap.value,
            // cores: cores.value,
            // bandwidth: bandwidth.value, 
            // cpu_units: cpuu.value,
            // cpu_limit: cpul.value, 
            // name: name.value,
            // price: price.value, 
            // ipv4_ips: ipv4.value,
            // ipv6_ips: ipv6.value,
            // internal_ips: internalIps.value,
            // term: term.value,
            // ip_pools: [data[13].options[ipPool].name]

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
        handleSubHeader(["create service"], loading)
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

                {/* <Table data={data} heading="Create new plan" rows={3} rows1={4} rows2={5} rows3={10} rowHeight={105}  /> */}
                
                <ButtonWrapper>
                    <Button onClick={hanldeClick} text="Create node" width="125px" height="45px" />
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

