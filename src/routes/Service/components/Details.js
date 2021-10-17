import React from 'react'
import styled from 'styled-components'
import Chart from './Chart';
import Section from './Section';

export default function Details({data}) {

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
            htmltype: "text"
        },
        {
            heading: "password",
            value: "your password",
            type: "input",
            htmltype: "password"
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
            text: "75%",
            total: 1024,
            usage: 760,
            unit: " MB"
        },
        {
            heading: "Disk Usage",
            text: "50%",
            total: 1024,
            usage: 512,
            unit: " MB"
        },
        {
            heading: "Memory Usage",
            text: "24%",
            total: 100,
            usage: 24,
            unit: " MB"
        }
    ]

    return (
        <Wrapper>
            <InnerWrapper>
                <Charts>
                    {charts.map((chart, index) => {
                        return (
                            <Chart usage={chart.usage} heading={chart.heading} total={chart.total} text={chart.text} unit={chart.unit} />
                        )
                    })}
                </Charts>
            
                <Content>
                    <Section data={general} heading="General Detials" rows={3} rowHeight={130} />
                    <Section data={vm} heading="VM details" rows={3} rowHeight={130} />
                </Content>
            
            </InnerWrapper>
        </Wrapper>
    )
}

const Content = styled.div `
    margin-top: 50px;
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