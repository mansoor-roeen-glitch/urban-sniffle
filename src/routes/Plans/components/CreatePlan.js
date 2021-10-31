import React from 'react'
import styled from 'styled-components';
import SubHeader from '../../../components/Header/SubHeader';
import Section from '../../Service/components/Section';
import Button from '../../../components/buttons/ActionButton'
import axios from 'axios';

export default function CreatePlan({config}) {
    
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

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

        return isFormValid;

    }

    const hanldeClick = () => {
        
        let isFormValid = validateForm()

        if (!isFormValid) {
            setLoading(false)
            return;
        }

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

        }, conf)
            
            .then((res) => {

                if (res.status === 201) {
                    setSuccess(true)
                    setError(false)
                    setLoading(false)
                }

            })

            .catch((err) => {

                setError(err)
                setSuccess(false)
                setLoading(false)

            })

    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName="Create plan" />
            <InnerWrapper>

                <Section data={data} heading="Create new plan" rows={3} rows2={4} rows3={8} rowHeight={130}  />
                
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
    max-width: 1400px;
    padding-top: 25px;

    margin-bottom: 60px;
`;