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

    const [type, setType] = React.useState(0)

    const [bandwidth, setBandwidth] = React.useState({

        value: details.bandwidth,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });
    
    const [size, setSize] = React.useState({

        value: details.size ,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [swap, setSwap] = React.useState({

        value: details.swap ,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

        value: details.ram,
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
    
    const [cores, setCores] = React.useState({

        value: details.cores,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [key, setKey] = React.useState({

        value: details.key,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [host, setHost] = React.useState({

        value: details.host,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [user, setUser] = React.useState({

        value: details.user,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [showMessage, setShowMessage] = useState(false);

    const successRedirect = () => {
        window.location.pathname = '/nodes/';
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
            htmltype: "text",
            inputValue: name.value,
            errorMes: name.errorMes,
            messageDur: name.messageDur,
            hasErrorMessage: name.hasErrorMessage,
            onChange: setName
        },
        {
            heading: "host",
            value: host.value,
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
            value: key.value,
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
            value: size.value,
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
            value: user.value,
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
            value: cores.value,
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
            value: ram.value,
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
            value: bandwidth.value,
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
            value: swap.value,
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

    const checkForm = () => {

        let isFormValid = true;

        if (!user.value) {
            setUser(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be between 1-20 char long"
            }))

            isFormValid = false
        }

        if (!key.value) {
            setKey(prevState => ({
                ...prevState,
                hasErrorMessage: true,
                errorMes: "must be between 1-20 char long"
            }))

            isFormValid = false
        }

        if (!host.value) {
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
            "name": name.value,
            "type": data[9].options[type].name,
            "host": host.value,
            "user": user.value,
            "key": key.value,
            "cores": parseInt(cores.value),
            "size": parseInt(size.value),
            "ram": parseInt(ram.value),
            "swap": parseInt(swap.value),
            "bandwidth": parseInt(bandwidth.value)
        }

        const conf = {
            headers: {
                'Authorization': `Token ${props.config}`,
                'content-type': 'application/json'
            }
        }

        axios.put(`https://hosnet.io/api/nodes/${details.id}/`, reqData, conf)

            .then((res) => {

                setSuccess(true)
                setError(false)
                setLoading(false)
                handleMessage("success", 5, "Template was updated successfully!")

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

        axios.delete(`https://hosnet.io/api/nodes/${details.id}/`, conf)

        .then((res) => {

            setSuccess(true)
            setError(false)
            setLoading(false)
            handleMessage("success", 5, "Node was deleted successfully!")

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
                    <Section data={data} heading="Update Node" rows={4} rows2={5} rows3={10} rowHeight={105} />
                </Content>
                
                <ButtonWrapper>
                    <Button height="45px" width="150px" text="Update Node" onClick={handleClick} />
                    <DeleteBtn height="45px" width="150px" text="Delete Node" onClick={handleDelete} />
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