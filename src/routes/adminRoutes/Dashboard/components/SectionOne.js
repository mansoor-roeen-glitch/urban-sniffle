// Importing Dependencies 
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

// Importing Components
import GridItemTypeA from './GridItemTypeA';
import GridItemTypeB from './GridItemTypeB';

export default function DashboardAndClusterSummaries ({dashboardSummariesData, clusterSummariesData}) {

  // states... for dashboard summaries and cluster summaries
  const [dashboardSummaries, setDashboardSummaries] = useState([])
  const [clusterSummaries, setClusterSummaries] = useState([])

  // icon sizes
  let dashboardSummariesIconSize = {iconHeight: 25, iconWidth: 25}
  let clusterSummariesIconSize = {iconHeight: 30, iconWidth: 30}

  // big name, but the functionality is to provide a usable summaries array
  const updateDashboardAndClustersSummaries = () => {
    let dData = [
      {
        key: 'services',
        title: 'Services Count',
        iconPath: 'vps-icon.svg',
        value: dashboardSummariesData?.services,
        iconSize: dashboardSummariesIconSize
      }, 
      {
        key: 'nodes',
        title: 'Nodes Count',
        iconPath: 'node-icon.svg',
        value: dashboardSummariesData?.nodes,
        iconSize: dashboardSummariesIconSize
      },
      {
        key: 'templates',
        title: 'Templates Count',
        iconPath: 'template-icon.svg',
        value: dashboardSummariesData?.templates,
        iconSize: dashboardSummariesIconSize
      }, 
      {
        key: 'ips',
        title: 'IP Count',
        iconPath: 'ipv4-icon.svg',
        value: dashboardSummariesData?.ips,
        iconSize: dashboardSummariesIconSize
      },
      {
        key: 'users',
        title: 'Users Count',
        iconPath: 'user-icon.svg',
        value: dashboardSummariesData?.users,
        iconSize: dashboardSummariesIconSize
      },
      {
        key: 'plans',
        title: 'Plans Count',
        iconPath: 'plan-icon.svg',
        value: dashboardSummariesData?.plans,
        iconSize: dashboardSummariesIconSize
      }
    ]

    let cData = [
      {
        key: 'cluster_ram', 
        used: 'NaN%',
        value: 'NaN%',
        available: 'NaN%',
        title: 'Cluster Ram', 
        iconPath: 'cluster-ram-icon.svg',
        iconSize: clusterSummariesIconSize
      }, 
      {
        key: 'cluster_storage', 
        used: 'NaN%',
        value: 'NaN%',
        available: 'NaN%',
        title: 'Cluster Storage', 
        iconPath: 'cluster-ram-icon.svg',
        iconSize: clusterSummariesIconSize
      }
    ]

    setDashboardSummaries(dData);
    setClusterSummaries(cData);
  }

  const renderClusterSummaries = () => {
    return clusterSummaries.map((item, index) => (
      <GridItemTypeB
        key={index} 
        heading={item.title}
        textValue={item.value}
        iconPath={item.iconPath}
        iconSize={item.iconSize}
        used={item.used}
        available={item.available}
      />
    ))
  }

  const renderDashboardSummaries = () => {
    return dashboardSummaries.map((item, index) => (
      <GridItemTypeA 
        key={index} 
        heading={item.title}
        value={item.value}
        iconPath={item.iconPath}
        iconSize={item.iconSize}
      />
    ))
  }

  // on dashboardsumamries change
  useEffect(() => {
    updateDashboardAndClustersSummaries()
  }, [clusterSummariesData, dashboardSummariesData]);

  return (
    <Wrapper>
        <DashboardSummaries>
          {renderDashboardSummaries()}
        </DashboardSummaries>

        <ClusterSummaries>
          {renderClusterSummaries()}
        </ClusterSummaries>
    </Wrapper>

  )
}

const ClusterSummaries = styled.div `
    width: auto;
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px;
    column-gap: 25px;
`; 

const DashboardSummaries = styled.div `
    width: auto;
    display: grid;
    
    grid-template-rows: 85px 85px;
    grid-template-columns: 1.2fr 1.2fr 2fr;
    row-gap: 25px;
    column-gap: 25px;
`;

const Wrapper = styled.div `
    display: grid;
    height: fit-content;

    width: 100%;
    grid-column-gap: 25px;
    grid-template-columns: 3fr 2fr;
`;