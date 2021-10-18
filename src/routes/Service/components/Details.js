import React from 'react'
import styled from 'styled-components'
import Chart from './Chart';
import Section from './Section';

export default function Details({data, serviceStatus}) {

    const [hostname, setHostname] = React.useState(data.hostname);
    const [password, setPassword] = React.useState("your password");

    const general = [
        {
            heading: "Owner",
            value: data.owner,
            type: "detail"
        },
        {
            heading: "Plan",
            value: data.plan,
            type: "detail"
        },
        {
            heading: "Node",
            value: data.node,
            type: "detail"
        },
        {
            heading: "Status",
            value: data.status,
            type: "detail"
        },
        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname,
            onChange: setHostname
        },
        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password,
            onChange: setPassword
        }
    ]

    const vm = [
        {
            heading: "Template",
            value: data.service_plan.template,
            type: "detail"
        },
        {
            heading: "Size",
            value: data.service_plan.size,
            type: "detail"
        },
        {
            heading: "Ram",
            value: data.service_plan.ram,
            type: "detail"
        },
        {
            heading: "Bandwidth",
            value: data.service_plan.bandwidth,
            type: "detail"
        },
        {
            heading: "IPV6 IPS",
            value: data.service_plan.ipv6_ips,
            type: "detail"
        },
        {
            heading: "IPV4 IPS",
            value: data.service_plan.ipv4_ips,
            type: "detail"
        }
    ]

    const charts = [
        {
            heading: "Bandwith Usage",
            text: parseInt(serviceStatus.bandwidth_used / serviceStatus.bandwidth_used * 100) + "%",
            total: parseInt(serviceStatus.bandwidth_max / 1000),
            usage: parseInt(serviceStatus.bandwidth_used / 1000),
            unit: " MB"
        },
        {
            heading: "Disk Usage",
            text: parseInt(serviceStatus.disk_used / serviceStatus.disk_used * 100) + "%",
            total: parseInt(serviceStatus.disk_max / 1000),
            usage: parseInt(serviceStatus.disk_used / 1000),
            unit: " MB"
        },
        {
            heading: "Memory Usage",
            text: parseInt(serviceStatus.mem_used / serviceStatus.mem_used * 100) + "%",
            total: parseInt(serviceStatus.mem_max / 1000),
            usage: parseInt(serviceStatus.mem_used / 1000),
            unit: " MB"
        }
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                
                {serviceStatus && (
                    <Charts>
                        { charts.map((chart, index) => {
                            return (
                                <Chart usage={chart.usage} heading={chart.heading} total={chart.total} text={chart.text} unit={chart.unit} />
                            )
                        })}
                    </Charts>
                )}
            
                <Content marginTop={serviceStatus ? "50px" : "0px"}>
                    <Section data={general} heading="General Detials" rows={3} rowHeight={130} />
                    <Section data={vm} heading="VM details" rows={3} rowHeight={130} />
                </Content>
            
            </InnerWrapper>
        </Wrapper>
    )
}

const Content = styled.div `
    margin-top: ${props => props.marginTop};
`;

const Charts = styled.div `
    display: flex;
    flex-direction: row;

    column-gap: 6%;
    padding-top: 15px;

    @media screen and (max-width: 980px) {
        justify-content: center;
    }

    @media screen and (max-width: 755px) {
        display: grid;
        grid-template-columns: 200px 200px;
        grid-template-rows: repeat(auto, 2);
        justify-content: flex-start;
        row-gap: 10px;
    }

`;

const InnerWrapper = styled.div `
    width: 90%;
    height: fit-content;
    padding-top: 50px;

    max-width: 1400px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;