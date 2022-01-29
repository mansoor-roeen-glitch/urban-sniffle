// Importing Dependencies 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Importing Components
import SectionOne from './components/SectionOne';


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
        totalStorage: 1030,
        remaining: 900,
        usage: 130,
    }) 

    const [clusterRam, setClusterRam] = useState({
        totalStorage: 1030,
        remaining: 900,
        usage: 130,
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

                    <SectionOne />

                    <SectionTwo>
                        <SectionTwoLeft>
                            
                        </SectionTwoLeft>
                        <SectionTwoRight>
                            
                        </SectionTwoRight>
                    </SectionTwo>

                </ClusterStatisticsWrapper>
            </InnerWrapper>
        </Wrapper>
    

    );
}


const SectionTwoRight = styled.div `
    width: auto;
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 270px;
    column-gap: 25px;
`; 

const SectionTwoLeft = styled.div `
    width: auto;
    display: grid;
    
    grid-template-rows: 170px;
    grid-template-columns: 2fr 1fr;
    column-gap: 25px;
`;

const SectionTwo = styled.div `
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
