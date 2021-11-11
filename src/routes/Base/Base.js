import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from './components/ServiceItemPlaceholder';
import ServiceList from './components/ServiceList';
import SubHeader from '../../components/Header/SubHeader';
import axios from 'axios';

export default function BaseRoute({config, handleClickChange}) {

    const [foundMatch, setFoundMatch] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);
    const [search, setSearch] = React.useState("")
    const [error, setError] = React.useState()

    const handleValueChange = (value) => {
            const keyword = value;
        
            if (keyword !== '') {
              
                const searchRes = services.filter((service) => {
                
                    return service.hostname.toLowerCase().startsWith(keyword.toLowerCase());
                    // Use the toLowerCase() method to make it case-insensitive
                
                });

                setFoundMatch(searchRes);

            } else {
              
                setFoundMatch(false);
                // If the text field is empty, show all users
            
            }
    }

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

    if (loading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={loading} pathName="Dashboard" />
            </Wrapper>
        )
    }

    if (!loading && error) {
        <Wrapper>
            <SubHeader path={true} loading={loading} pathName="Dashboard" />
            <h1>Something went wrong</h1>
        </Wrapper>
    }

    return (
        <Wrapper>

            <SubHeader path={true} pathName="Dashboard" />
            <Header>
                <SearchWrapper>
                    <PrimarySearchBar valueHasChanged={handleValueChange} value={search} onChange={setSearch} name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                <PrimaryButton to="/create" text="New" width="80px" height="40px" />
            </Header> 

            <ServiceItemPlaceholder data={["hostname", "plan", "status", "ram"]} />
            <ServiceList handleClickChange={handleClickChange} data={foundMatch ? foundMatch : services} type="services" />
            
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

