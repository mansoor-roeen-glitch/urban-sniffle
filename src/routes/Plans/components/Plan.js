import React from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import PrimaryButton from '../../../components/buttons/PrimaryButton';

export default function Plan() {
    
    const [details, setDetails] = React.useState(
        
        {
            "id": 1,
            "size": 128,
            "ram": 1024,
            "swap": 0,
            "cores": 4,
            "bandwidth": 1024,
            "cpu_units": 1024,
            "cpu_limit": "0.00",
            "ipv6_ips": 1,
            "ipv4_ips": 0,
            "internal_ips": 1,
            "name": "Basic",
            "price": 1.0,
            "term": 1,
            "period": "month",
            "ip_pools": []
        }

    );

    const [bandwidth, setBandwidth] = React.useState(details.bandwidth);
    const [cpuu, setCpuu] = React.useState(details.cpu_units);
    const [cpul, setCpul] = React.useState(details.cpu_limit);
    const [size, setSize] = React.useState(details.size);
    const [swap, setSwap] = React.useState(details.ram);
    const [ram, setRam] = React.useState(details.ram);
    const [name, setName] = React.useState(details.name);
    const [price, setPrice] = React.useState(details.price);

    const data = [
        {
            heading: "name",
            value: details.name,
            type: "input",
            htmlType: "text",
            inputValue: name, 
            onChange: setName
        },
        {
            heading: "price",
            value: details.price,
            type: "input",
            htmlType: "text",
            inputValue: price, 
            onChange: setPrice
        },
        {
            heading: "size",
            value: details.size,
            type: "input",
            htmlType: "number",
            inputValue: size,
            onChange: setSize
        },
        {
            heading: "ram",
            value: details.ram,
            type: "input",
            htmlType: "number",
            inputValue: ram,
            onChange: setRam
        },
        {
            heading: "bandwidth",
            value: details.bandwidth,
            type: "input",
            htmlType: "number",
            inputValue: bandwidth,
            onChange: setBandwidth
        },
        {
            heading: "Cpu Unit",
            value: details.cpu_units,
            type: "input",
            htmlType: "number",
            inputValue: cpuu,
            onChange: setCpuu
        },
        {
            heading: "swap",
            value: details.swap,
            type: "input",
            htmlType: "number",
            inputValue: swap,
            onChange: setSwap
        },
        {
            heading: "cpu_limit",
            value: details.cpu_limit,
            type: "input",
            htmlType: "number",
            inputValue: cpul,
            onChange: setCpul
        }

    ]
    
    return (
        <Wrapper>
            <SubHeader path={true} pathName={details.name} />
            <InnerWrapper>
                <Content>
                    <Section data={data} heading="Update Plan" rows={3} rowHeight={130} />
                </Content>
                <ButtonWrapper>
                    <PrimaryButton to="/" height="45px" width="140px" text="Update Plan" />
                </ButtonWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const ButtonWrapper = styled.div `
    height: fit-content;
    width: fit-content;
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