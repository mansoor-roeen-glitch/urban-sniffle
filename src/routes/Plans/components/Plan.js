import React from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import Button from '../../../components/buttons/ActionButton';
import DeleteBtn from '../../../components/buttons/DangerActionButton';
import axios from 'axios';
import { set } from 'js-cookie';

export default function Plan(props) {
    
    const [details, setDetails] = React.useState(props.details);

    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [error, setError] = React.useState(false)

    const [bandwidth, setBandwidth] = React.useState({

        value: details.bandwidth,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [cpuu, setCpuu] = React.useState({

        value: details.cpu_units,
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

        value: details.size,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [swap, setSwap] = React.useState({

        value: details.swap,
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

    const [price, setPrice] = React.useState({

        value: details.price,
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

    const [ipv4, setIpv4] = React.useState({

        value: details.ipv4_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: details.ipv6_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [internalIps, setInternalIps] = React.useState({

        value: details.internal_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

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
        }
    ]

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
                
        })

        .catch((err) => {

            setError(err)
            setSuccess(false)
            setLoading(false)
        
        })
    }

    return (
        <Wrapper>
            <SubHeader path={true} loading={loading} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Plan" rows={4} rows2={6} rows3={12} rowHeight={130} />
                </Content>
                <ButtonWrapper>
                    <Button height="45px" width="140px" text="Update Plan" />
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