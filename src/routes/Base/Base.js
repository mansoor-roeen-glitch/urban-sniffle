import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from './components/ServiceItemPlaceholder';
import ServiceList from './components/ServiceList';
import SubHeader from '../../components/Header/SubHeader';

export default function BaseRoute() {

    // Static-data , for development
    const res = [
        {
            "id": 10,
            "owner": "danhosler",
            "billing_id": null,
            "machine_id": 1000010,
            "hostname": "test-object-9817826196",
            "plan": "Basic",
            "node": "magus",
            "status": "active",
            "service_plan": {
                "template": "Ubuntu Focal",
                "size": 128,
                "ram": 1024,
                "swap": 0,
                "cores": 4,
                "bandwidth": 1024,
                "cpu_units": 1024,
                "cpu_limit": "0.00",
                "ipv6_ips": 1,
                "ipv4_ips": 0,
                "internal_ips": 1,
                "type": "lxc",
                "storage": 2,
                "ip_pools": [
                    1
                ]
            },
            "billing_type": null
        },
        {
            "id": 11,
            "owner": "ss",
            "billing_id": null,
            "machine_id": 1000011,
            "hostname": "luram-ipsum-berom",
            "plan": "Basic",
            "node": "magus",
            "status": "active",
            "service_plan": {
                "template": "Ubuntu Focal",
                "size": 128,
                "ram": 1024,
                "swap": 0,
                "cores": 4,
                "bandwidth": 1024,
                "cpu_units": 1024,
                "cpu_limit": "0.00",
                "ipv6_ips": 1,
                "ipv4_ips": 0,
                "internal_ips": 1,
                "type": "lxc",
                "storage": 2,
                "ip_pools": [
                    1
                ]
            },
            "billing_type": null
        },
        {
            "id": 12,
            "owner": "ss",
            "billing_id": null,
            "machine_id": 1000012,
            "hostname": "hosnet-serveless-servers",
            "plan": "Basic",
            "node": "magus",
            "status": "error",
            "service_plan": {
                "template": "Ubuntu Focal",
                "size": 128,
                "ram": 1024,
                "swap": 0,
                "cores": 4,
                "bandwidth": 1024,
                "cpu_units": 1024,
                "cpu_limit": "0.00",
                "ipv6_ips": 1,
                "ipv4_ips": 0,
                "internal_ips": 1,
                "type": "lxc",
                "storage": 2,
                "ip_pools": [
                    1
                ]
            },
            "billing_type": null
        },
        {
            "id": 10,
            "owner": "danhosler",
            "billing_id": null,
            "machine_id": 1000010,
            "hostname": "test-object-9817826196",
            "plan": "Basic",
            "node": "magus",
            "status": "active",
            "service_plan": {
                "template": "Ubuntu Focal",
                "size": 128,
                "ram": 1024,
                "swap": 0,
                "cores": 4,
                "bandwidth": 1024,
                "cpu_units": 1024,
                "cpu_limit": "0.00",
                "ipv6_ips": 1,
                "ipv4_ips": 0,
                "internal_ips": 1,
                "type": "lxc",
                "storage": 2,
                "ip_pools": [
                    1
                ]
            },
            "billing_type": null
        },
    ]

    return (
        <Wrapper>
            <SubHeader />
            <Header>
                <SearchWrapper>
                    <PrimarySearchBar name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                <PrimaryButton to="/create" text="New" />
            </Header> 

            <ServiceItemPlaceholder />
            <ServiceList services={res} />

        </Wrapper>
    )
}

const SearchWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 95%;
    max-width: 1400px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 40px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

