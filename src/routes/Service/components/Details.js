import React from 'react'
import styled from 'styled-components'
import Chart from './Chart';
import Section from './Section';

export default function Details() {

    const general = [
        {
            heading: "Owner",
            value: "Hostler",
            type: "detail"
        },
        {
            heading: "Plan",
            value: "Basic",
            type: "detail"
        },
        {
            heading: "Node",
            value: "Taban",
            type: "detail"
        },
        {
            heading: "Status",
            value: "Running",
            type: "detail"
        },
        {
            heading: "Hostname",
            value: "hosnet-serverless-server",
            type: "detail"
        }
    ]

    const vm = [
        {
            heading: "Template",
            value: "Ubunto Focal",
            type: "detail"
        },
        {
            heading: "Size",
            value: "128",
            type: "detail"
        },
        {
            heading: "Ram",
            value: "1024",
            type: "detail"
        },
        {
            heading: "Bandwidth",
            value: "1024",
            type: "detail"
        },
        {
            heading: "IPV6 IPS",
            value: "1",
            type: "detail"
        },
        {
            heading: "IPV4 IPS",
            value: "1",
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
                    <Section data={general} heading="General Detials" />
                    <Section data={vm} heading="VM details" />
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
`;

const InnerWrapper = styled.div `
    width: 95%;
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