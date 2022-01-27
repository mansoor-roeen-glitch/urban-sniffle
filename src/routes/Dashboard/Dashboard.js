// Importing Libraries
import { Chart } from 'chart.js';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GridItemTypeA from './components/GridItemTypeA';
import GridItemTypeB from './components/GridItemTypeB';


export default function Dashbaord () {

    // React State Hooks

    const [countOfServices, setCountOfServices] = useState(0)
    const [countOfNodes, setCountOfNodes] = useState(0)
    const [countOfIpv4, setCountOfIpv4] = useState(0)
    const [countOfIpv6, setCountOfIpv6] = useState(0)
    const [countOfUsers, setCountOfUsers] = useState(0)
    const [countOfTemplates, setCountOfTemplates] = useState(0)
    const [countOfNodeDisks, setCountOfNodeDisks] = useState(0)

    const [clusterStorage, setClusterStorage] = useState({
        totalStorage: 1035,
        remaining: 900,
        usage: 135,
    }) 

    const [clusterRam, setClusterRam] = useState({
        totalStorage: 1035,
        remaining: 900,
        usage: 135,
    })


    // JSX For Render

    return (

        <Wrapper>
            <InnerWrapper>
                <ClusterStatisticsWrapper>

                    {/* <ClusterStatisticsHeader>
                        <ClusterStatisticsHeading>
                            Cluster Statistics
                        </ClusterStatisticsHeading>
                    </ClusterStatisticsHeader> */}

                    <SectionOne>

                        <SectionOneLeft>
                            
                            <SectionOneLeftTop>

                                <GridItemTypeA
                                    heading='VPS Count'
                                    value='205'
                                    iconPath='vps-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                                <GridItemTypeA
                                    heading='Templates'
                                    value='3'
                                    iconPath='template-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                                <GridItemTypeA
                                    heading='Free IPV4 IPs'
                                    value='12'
                                    iconPath='ipv4-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                            </SectionOneLeftTop>
                            
                            <SectionOneLeftBottom>
                                
                                <GridItemTypeA
                                    heading='Users Count'
                                    value='25'
                                    iconPath='users-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                                <GridItemTypeA
                                    heading='Clusters Count'
                                    value='1'
                                    iconPath='vps-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                                <GridItemTypeA
                                    heading='Free IPV6 IPs'
                                    value='118'
                                    iconPath='ipv4-icon.svg'
                                    iconSize={{
                                        iconWidth: 30,
                                        iconHeight: 30,
                                    }}
                                />

                            </SectionOneLeftBottom>

                        </SectionOneLeft>

    
                        <SectionOneRight>

                            <GridItemTypeB
                                heading='Cluster Ram'
                                textValue='NAN%'
                                iconPath='cluster-ram-icon.svg'
                                
                                used={124}
                                available={1024}
                                iconSize={{
                                    iconWidth: 35,
                                    iconHeight: 35,
                                }}
                            />

                            
                            <GridItemTypeB
                                heading='Cluster Ram'
                                textValue='NAN%'
                                iconPath='cluster-ram-icon.svg'
                                
                                used={124}
                                available={1024}
                                iconSize={{
                                    iconWidth: 35,
                                    iconHeight: 35,
                                }}
                            />

                        </SectionOneRight>

                    </SectionOne>

                </ClusterStatisticsWrapper>
            </InnerWrapper>
        </Wrapper>
    

    );
}


const SectionOneLeftBottom = styled.div `
    height: auto;
    display: grid;
    
    width: 100%;
    column-gap: 25px;
    grid-template-columns: 1.2fr 1.2fr 2fr;
`;

const SectionOneLeftTop = styled.div `
    height: auto;
    display: grid;
    
    width: 100%;
    column-gap: 25px;
    grid-template-columns: 1.2fr 1.2fr 2fr;
`;

const SectionOneRight = styled.div `
    width: auto;
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px;
    column-gap: 25px;
`; 

const SectionOneLeft = styled.div `
    width: auto;
    display: grid;
    
    grid-template-rows: 85px 85px;
    grid-template-columns: 1fr;
    row-gap: 25px;
`;

const SectionOne = styled.div `
    display: grid;
    height: fit-content;

    width: 100%;
    grid-column-gap: 30px;
    grid-template-columns: 3fr 2fr;
`;

const ClusterStatisticsHeading = styled.span `
    font-weight: 500;
    font-size: 20px;

    color: #D0D5DC;
`;

const ClusterStatisticsHeader = styled.div `
    width: fit-content;
    height: fit-content;
`;

const ClusterStatisticsWrapper = styled.div `
    display: flex;
    flex-direction: column;

    row-gap: 20px;
`;

const InnerWrapper = styled.div `
    width: 93%;
    max-width: 1600px;

    height: fit-content;
`;

const Wrapper = styled.div `
    width: 100%;
    padding-top: 35px;

    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;
