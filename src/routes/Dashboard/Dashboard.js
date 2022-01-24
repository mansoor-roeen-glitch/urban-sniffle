// Importing Libraries
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


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
        totalStorage: 1024,
        remaining: 900,
        usage: 124,
    }) 

    const [clusterRam, setClusterRam] = useState({
        totalStorage: 1024,
        remaining: 900,
        usage: 124,
    })


    // JSX For Render

    return (

        <Wrapper>
            <InnerWrapper>
                <ClusterStatisticsWrapper>

                    <ClusterStatisticsHeader>
                        <ClusterStatisticsHeading>
                            Cluster Statistics
                        </ClusterStatisticsHeading>
                    </ClusterStatisticsHeader>

                    <ClusterStatisticsGrid>

                        <ClusterStatisticsLeft>
                            
                        </ClusterStatisticsLeft>

    
                        <ClusterStatisticsRight>
    
                        </ClusterStatisticsRight>

                    </ClusterStatisticsGrid>

                </ClusterStatisticsWrapper>
            </InnerWrapper>
        </Wrapper>
    

    );
}


const ClusterStatisticsRight = styled.div `
    width: auto;
    height: fit-content;
`; 

const ClusterStatisticsLeft = styled.div `
    width: auto;
    height: fit-content;

    display: grid;
`;

const ClusterStatisticsGrid = styled.div `
    display: grid;
    height: fit-content;

    width: 100%;
    grid-column-gap: 30px;
    grid-template-columns: 3fr 2fr;
`;

const ClusterStatisticsHeading = styled.span `
    font-weight: 500;
    font-size: 18px;

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
    max-width: 1500px;

    height: fit-content;
`;

const Wrapper = styled.div `
    width: 100%;
    padding-top: 30px;

    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;
