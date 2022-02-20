// Dependencies
import axios from 'axios';
import React, {useEffect} from 'react'
import styled from 'styled-components'

// Components
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import TableHeader from '../../components/table/TableAHeader';
import Table from '../../components/table/TableA';

// Functions
import fetchEndpoint from '../../functions/fetchAnEndpoint';
import { searchList } from '../../functions/tableSearchbar';

export default function Plans({ token, subHeader }) {

    const [error, setError] = React.useState();
    const [plans, setPlans] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("")
    const [foundMatch, setFoundMatch] = React.useState(false);

    // update result based on search
    const handleValueChange = (value) => {
        searchList({
            list: plans || [],
            value,
            setFoundMatch,
            searchKey: 'name',
        })
    }
    
    // getting list of plans using the fetchEndpoint function
    // once plans have been fetched, the plans list would be updated
    // if failure occurs, error would be set as error_message
    const getPlans = async () => {
        let response = await fetchEndpoint({
            token: token,
            endpoint: '/api/plans/',
        })

        if (response.success) {
            setPlans(response.body.results)
            setLoading(false)
            return null;
        } 

        setPlans([])
        setError(response?.error_message)
        setLoading(false)

    }

    // run "getPlans" function
    useEffect( () => {
        getPlans();
    }, [])

    // update sub-header
    useEffect(() => {
        subHeader(["plans"], loading)
    }, [loading])


    if (loading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    if (!loading && error) {
        return (
            <Wrapper>
                <h1>Error occured</h1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Header>
        
                <SearchWrapper>
                    <PrimarySearchBar valueHasChanged={handleValueChange} onChange={setSearch} name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                
                <PrimaryButton to="/create/plan" text="New" width="80px" height="40px" />

            </Header>

            <TableHeader data={["name", "size", "period", "bandwidth"]} />
            <Table data={foundMatch ? foundMatch : plans} type="plans" />

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
    margin-bottom: 35px;

    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Wrapper = styled.div `
    width: 100%;
    padding-top: 35px;

    height: fit-content;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
