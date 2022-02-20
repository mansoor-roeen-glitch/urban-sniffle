// Dependencies
import React from 'react'
import styled from 'styled-components'

// Components
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import TableHeader from '../../components/table/TableAHeader';
import Table from '../../components/table/TableA';

// Functions
import fetchEndpoint from '../../functions/fetchAnEndpoint';
import { searchList } from '../../functions/tableSearchbar';

export default function Services({token, subHeader, is_staff}) {

    const [foundMatch, setFoundMatch] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [services, setServices] = React.useState([]);
    const [search, setSearch] = React.useState("")
    const [error, setError] = React.useState()

    // update result based on search
    const handleValueChange = (value) => {
        searchList({
            list: services || [],
            value,
            setFoundMatch,
            searchKey: 'hostname',
        })
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

    // update sub-header
    React.useEffect(() => {        
        subHeader(["dashboard"], loading)
    }, [loading])

    // run "getServices" function
    React.useEffect(() => {
        getServices()
    })

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
                <PrimaryButton to="/create/service" text="New" width="80px" height="40px" />
            </Header> 

            <TableHeader data={["hostname", "plan", "status", "ram"]} />
            <Table data={foundMatch ? foundMatch : services} type="services" />
            
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
`;