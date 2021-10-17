import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from './components/ServiceItemPlaceholder';
import ServiceList from './components/ServiceList';
import SubHeader from '../../components/Header/SubHeader';
import axios from 'axios';

export default function BaseRoute({config, handleClickChange}) {

    const [loading, setLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);
    const [error, setError] = React.useState()

    const getServices = async () => {
        const response = await axios({
            method: "get",
            url: "https://hosnet.io/api/services/",
            headers: {
                'Authorization': `Token ${config}`,
                'content-type': "application/json"
            }
        })
            .then((res) => {setLoading(false); setServices(res.data.results); return res})
            .catch((err) => {setError(true); setLoading(false); return err});
    }

    React.useEffect(() => {

        getServices()

    }, [])

    return (
        <Wrapper>
            <SubHeader />
            
            <Header>
                <SearchWrapper>
                    <PrimarySearchBar name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                <PrimaryButton to="/create" text="New" width="80px" height="40px" />
            </Header> 

            <ServiceItemPlaceholder />
            <ServiceList handleClickChange={handleClickChange} services={services} />

        </Wrapper>
    )
}

const SearchWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 93%;
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

