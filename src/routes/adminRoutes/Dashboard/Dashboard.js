// Importing Dependencies 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TABLE_LABELS_DATA } from '../../../constants';
import { getDashboardSummaries } from '../../../functions/dashbaordSummaries';
import GridItemTypeC from './components/GridItemTypeC';

// Importing Components
import SectionOneComponent from './components/SectionOne';
import SectionTwoComponent from './components/SectionTwo';
import ServerStatisticsComponent from './components/ServerStatisticsComponent';


export default function Dashboard ({token, subHeader}) {

    
    // states... 
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState([]);
    const [ipList, setIpList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [ipListTableData, setIpListTableData] = useState([]);
    const [userListTableData, setUserListTableData] = useState([]);
    
    // this function will update the ip_list table and user_list table data
    // using data from ipList and userList
    const updateIplistDataAndUserListData = () => {
        let newIpListTable = [];
        let newUserListTable = [];

        if (ipList.success && ipList.body.results !== []) {
            ipList.body.results.map((ip, index) => {
                newIpListTable.push([index + 1, ip.value, ip.id, ip.pool, ip.owner])
            })
        }

        if (userList.success && userList.body.results !== []) {
            userList.body.results.map((user, index) => {
                newUserListTable.push([index + 1, user.email, user.username, user.pk])
            })
        }

        setIpListTableData(newIpListTable)
        setUserListTableData(newUserListTable)
    }

    // update the tables data
    useEffect(() => {
        updateIplistDataAndUserListData()
    }, [ipList, userList]) 

    // update sub-header
    useEffect(() => {
        subHeader([`Admin Dashboard`], loading)
    }, [loading])

    // get the admin dashboard data
    useEffect( async () => {
        let response = await getDashboardSummaries({token});
        console.log(response)
        setSummary(response.summary);
        setIpList(response.ipList);
        setUserList(response.userList);
        setLoading(false);
    }, [])

    // return loading screen
    if (loading) {
        return (
            <h1>loading</h1>
        )
    }

    return (
        <Wrapper>
            <InnerWrapper>
                <ClusterStatisticsWrapper>

                    {/* Cluster Statistics and extra infromations*/}
                    <SectionOneComponent
                        dashboardSummariesData={summary?.body || {}}
                        clusterSummariesData={{}}
                    />

                    {/* Lists of IP addresses and recent tasks */}
                    <SectionTwoComponent 
                        tableOneHeaderData={TABLE_LABELS_DATA.ips}
                        tableTwoHeaderData={TABLE_LABELS_DATA.users}
                        tableOneData={ipListTableData}
                        tableTwoData={userListTableData}
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
    width: 95%;
    max-width: 2000px;

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
