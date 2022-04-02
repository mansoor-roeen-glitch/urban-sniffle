// Dependencies
import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

// Components
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../../components/inputs/PrimarySearchBar';
import TableHeader from '../../../components/table/TableAHeader';
import Table from '../../../components/table/TableA';

// Functions
import apiRequest from '../../../functions/apiRequest';
import { searchList } from '../../../functions/tableSearchbar';
import { TABLE_LABELS_DATA } from '../../../constants';

export default function Instances({ token, subHeader, instanceType}) {

    let location = document.location.pathname;

    const [error, setError] = useState();
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("")
    const [foundMatch, setFoundMatch] = useState(false);

    // this function will determain the filter input
    let handleSearchKey = () => {
        if (instanceType === 'service') return 'hostname'
        else {return 'name'}
    }

    // returns the table labels data depending on instance type
    let getTableLabels = () => {
        return TABLE_LABELS_DATA[instanceType]
    }

    // update result based on search
    const handleValueChange = (value) => {
        searchList({
            list: results || [],
            value,
            setFoundMatch,
            searchKey: handleSearchKey(),
        })
    }
    
    // getting list if results using the apiRequest function
    // once results have been fetched, the results list would be updated
    // if failure occurs, error would be set as error_message
    const getResults = async () => {
        let response = await apiRequest({
            token: token,
            endpoint: `/core/${instanceType}s/`,
        })

        if (response.success) {
            setResults(response?.body?.results)
            setLoading(false) 
            return null;
        } 

        setResults([])
        setError(response?.error_message)
        setLoading(false)

    }

    // run "getResults" function
    useEffect( () => {
        setSearch('')
        setFoundMatch(false)
        setResults([])
        setLoading(true)
        setError(false)
        getResults();
    }, [location])

    // update sub-header
    useEffect(() => {
        subHeader([`List of ${instanceType}s`], loading)
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
                    <PrimarySearchBar 
                        name="SearchBar" 
                        className="Primary-Search-Bar" 
                        id="Primary-Search-Bar"
                        valueHasChanged={handleValueChange} 
                        onChange={setSearch} 
                    />
                </SearchWrapper>
                
                <PrimaryButton 
                    text="New" 
                    height="40px" 
                    width="80px" 
                    to={`/create/${instanceType}`} 
                />
            </Header>

            <TableHeader data={getTableLabels()} />
            
            <Table 
                data={foundMatch ? foundMatch : results} 
                type={`${instanceType}s`} 
            />

        </Wrapper>
    )
}

const SearchWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 95%;
    max-width: 2000px;
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
