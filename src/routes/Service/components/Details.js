import React from 'react'
import styled from 'styled-components'
import Chart from './Chart';
import Section from './Section';

export default function Details({data, serviceStatus, userData}) {

    const [plan, setPlan] = React.useState(0)
    const [node, setNode] = React.useState(0)
    const [template, setTemplate] = React.useState(0)

    let virtualMachine = [];
    let generalDetails = [];

    const [hostname, setHostname] = React.useState({

        value: data.hostname,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [password, setPassword] = React.useState({

        value: "",
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [size, setSize] = React.useState({

        value: data.service_plan.size,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ram, setRam] = React.useState({

        value: data.service_plan.ram,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [bandwidth, setBandwidth] = React.useState({

        value: data.service_plan.bandwidth,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv6, setIpv6] = React.useState({

        value: data.service_plan.ipv6_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const [ipv4, setIpv4] = React.useState({

        value: data.service_plan.ipv4_ips,
        errorMes: "",
        messageDur: 5000,
        hasErrorMessage: false

    });

    const adminGeneralAccess = [
        {
            heading: "Owner",
            value: data.owner,
            type: "detail"
        },
        
        {
            heading: "Plan",
            value: data.plan,
            type: "dropdown",
            onChange: setPlan,
            selected: 0,
            options: [
                {
                    type: "option",
                    name: "Basic"
                },
                {
                    type: "option",
                    name: "test-plan-3"
                }
            ]
        },

        {
            heading: "node",
            value: data.node,
            type: "dropdown",
            options: [
                {
                    name: "magus",
                    type: "option"
                }
            ],
            selected: node,
            onChange: setNode
        },

        {
            heading: "status",
            value: data.status === undefined ? 'inactive' : data.status,
            type: "detail",
        },

        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            onChange: setHostname
        },

        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            onChange: setPassword
        }
    ]

    const clientGeneralAccess = [
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
            value: data.status === undefined ? 'inactive' : data.status,
            type: "detail"
        },
        {
            heading: "Hostname",
            value: data.hostname,
            type: "input",
            htmltype: "text",
            inputValue: hostname.value,
            onChange: setHostname
        },
        {
            heading: "Password",
            value: "your password",
            type: "input",
            htmltype: "password",
            inputValue: password.value,
            onChange: setPassword
        }
    ]

    const adminVmAccess = [
        {
            heading: "Template",
            value: data.service_plan.template,
            type: "dropdown",
            options: [
                {
                    name: "Ubuntu Focal",
                    type: "option"
                },
                {
                    name: "CentOS 8",
                    type: "option"
                }, 
                {
                    name: "Ubuntu Bionic",
                    type: "option"
                },
            ],
            selected: 0,
            onChange: setTemplate
        },
        {
            heading: "Size",
            value: size.value,
            type: "input",
            htmltype: "text",
            inputValue: size.value,
            onChange: setSize
        },
        {
            heading: "ram",
            value: ram.value,
            type: "input",
            htmltype: "text",
            inputValue: ram.value,
            onChange: setRam
        },
        {
            heading: "bandwidth",
            value: bandwidth.value,
            type: "input",
            htmltype: "text",
            inputValue: bandwidth.value,
            onChange: setBandwidth
        },
        {
            heading: "Ipv6 ips",
            value: ipv6.value,
            type: "input",
            htmltype: "text",
            inputValue: ipv6.value,
            onChange: setIpv6
        },
        {
            heading: "Ipv4 ips",
            value: ipv4.value,
            type: "input",
            htmltype: "text",
            inputValue: ipv4.value,
            onChange: setIpv4
        },

    ]

    const clientVmAccess = [
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
            total: parseInt(serviceStatus.bandwidth_max),
            usage: parseInt(serviceStatus.bandwidth_used),
            unit: " GB"
        },
        {
            heading: "Disk Usage",
            total: parseInt(serviceStatus.disk_max),
            usage: parseInt(serviceStatus.disk_used),
            unit: " GB"
        },
        {
            heading: "Memory Usage",
            total: parseInt(serviceStatus.mem_max),
            usage: parseInt(serviceStatus.mem_used),
            unit: " GB"
        }
    ]


    return (
        <Wrapper>
            <InnerWrapper>
                
                {serviceStatus && (
                    <Charts>
                        { charts.map((chart, index) => {
                            return (
                                <Chart key={index} usage={chart.usage} heading={chart.heading} total={chart.total} unit={chart.unit} />
                            )
                        })}
                    </Charts>
                )}
            
                <Content marginTop={serviceStatus ? "50px" : "0px"}>
                    <Section data={generalDetails} heading="General Detials" rows={2} rows2={3} rows3={6} rowHeight={115} />
                    <RowGap />
                    <Section data={virtualMachine} heading="VM details" rows={2} rows2={3} rows3={6} rowHeight={115} />
                </Content>
            
            </InnerWrapper>
        </Wrapper>
    )
}

const RowGap = styled.div `
    width: 100%;
    height: 45px;
`;

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