// Importing Dependencies 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GridItemTypeC from './components/GridItemTypeC';

// Importing Components
import SectionOneComponent from './components/SectionOne';
import SectionTwoComponent from './components/SectionTwo';
import ServerStatisticsComponent from './components/ServerStatisticsComponent';


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


    // Component Variables

    let tableOneHeaderData = [
        '#',
        'IP Address',

        'ID',
        'Pool',
        'Owner',
    ]


    let tableTwoHeaderData = [
        'User',
        'Task',
        'Service ID',
    ]

    let tableOneData = [
        [
            '1.',
            '10.10.10.102',

            '25',
            '3',
            '3',
        ],
        [
            '2.',
            '10.10.10.102',

            '25',
            '3',
            '3',
        ],
        [
            '3.',
            '10.10.10.102',

            '25',
            '3',
            '3',
        ],
        [
            '4.',
            '10.10.10.102',

            '25',
            '3',
            '3',
        ],
        [
            '5.',
            '10.10.10.102',

            '25',
            '3',
            '3',
        ]
    ]

    let tableTwoData = [
        [
            'mansoor_01',
            'Delete',
            '201'
        ],
        [
            'mansoor_02',
            'reboot',
            '201'
        ],
        [
            'mansoor_03',
            'reboot',
            '201'
        ],
        [
            'mansoor_04',
            'shutdown',
            '201'
        ],
        [
            'mansoor_05',
            'stoped',
            '201'
        ],
    ]


    // JSX For Render

    return (

        <Wrapper>
            <InnerWrapper>
                <ClusterStatisticsWrapper>


                    {/* Cluster Statistics and extra infromations*/}
                    <SectionOneComponent />

                    {/* Lists of IP addresses and recent tasks */}
                    <SectionTwoComponent 
                        tableOneHeaderData={tableOneHeaderData}
                        tableTwoHeaderData={tableTwoHeaderData}
                        tableOneData={tableOneData}
                        tableTwoData={tableTwoData}
                    />

                    {/* Server Statistics */}
                    <ServerStatisticsComponent />


                </ClusterStatisticsWrapper>
            </InnerWrapper>
        </Wrapper>
    

    );
}



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

    row-gap: 40px;
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
