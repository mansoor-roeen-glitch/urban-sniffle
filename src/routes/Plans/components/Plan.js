import React from 'react'
import styled from 'styled-components';
import Section from '../../Service/components/Section';
import SubHeader from '../../../components/Header/SubHeader'
import Button from '../../../components/buttons/ActionButton';

export default function Plan(props) {
    
    const [details, setDetails] = React.useState(props.details);

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
                    <Section data={data} heading="Update Plan" rows={3} rows2={4} rows3={8} rowHeight={130} />
                </Content>
                <ButtonWrapper>
                    <Button height="45px" width="140px" text="Update Plan" />
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