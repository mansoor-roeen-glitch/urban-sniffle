import React from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from './components/ServiceItemPlaceholder';
import ServiceList from './components/ServiceList';
import fetchEndpoint from '../../functions/fetchAnEndpoint';

export default function BaseRoute({token, subHeader}) {

    const [foundMatch, setFoundMatch] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);
    const [search, setSearch] = React.useState("")
    const [error, setError] = React.useState()


    // This functoin would update the services list
    // Services list would be updated based on the search keyword
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

    // Getting list of services using the fetchEndpoint function
    // Once services have been fetched, the services list would be updated
    // If failure occurs, error would be set as error_message
    const getServices = async () => {
        
        let response = await fetchEndpoint({
            token: token,
            endpoint: "/api/services/",
        })
        
        if (response.success) {
            setServices(response.body.results)
            setLoading(false)
            return null;
        } 

        setServices([])
        setError(response?.error_message)
        setLoading(false)

    }

    React.useEffect(() => {
        
        subHeader(["dashboard"], loading)
        getServices()

    }, [loading])

    if (loading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    if (!loading && error) {
        <Wrapper>
            <h1>Something went wrong</h1>
        </Wrapper>
    }

    return (
        <Wrapper>

            <Header>
                <SearchWrapper>
                    <PrimarySearchBar valueHasChanged={handleValueChange} value={search} onChange={setSearch} name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                <PrimaryButton to="/create_service" text="New" width="80px" height="40px" />
            </Header> 

            <ServiceItemPlaceholder data={["hostname", "plan", "status", "ram"]} />
            <ServiceList data={foundMatch ? foundMatch : services} type="services" />
            
        </Wrapper>
    )
}

const SearchWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 93%;
    max-width: 1600px;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 35px;
`;

const Wrapper = styled.div `
    width: 100%;
    height: fit-content;
    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 35px;
`;

