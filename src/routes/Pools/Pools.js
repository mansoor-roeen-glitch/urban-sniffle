import axios from 'axios';
import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SubHeader from '../../components/Header/SubHeader';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from '../Base/components/ServiceItemPlaceholder';
import ServiceList from '../Base/components/ServiceList';

export default function Pools({config, handlePoolClick, userDataLoading, userData}) {

    const [error, setError] = React.useState();
    const [pools, setPools] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("")
    const [foundMatch, setFoundMatch] = React.useState(false);

    const handleValueChange = (value) => {
        const keyword = value;
    
        if (keyword !== '') {
          
            const searchRes = pools.filter((plan) => {
            
                return plan.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            
            });

            setFoundMatch(searchRes);

        } else {
          
            setFoundMatch(false);
        
        }
    }

    const getPools = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/pools/`,
            headers: {
                "content-type": "application/json",
                "Authorization": `Token ${config}`
            }
        })
            .then((res) => {return {status: 200, data: res.data}})
            .catch((error ) => {return {status: false, data: error};})
        
        return response;
    }

    useEffect( async () => {

        const pools = await getPools()

        if (pools.status) {
            setPools(pools.data.results);
            setLoading(false);
        } else {
            setError(pools.data);
            setLoading(false);
        }


    }, [])

    if (loading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={true || userDataLoading} pathName="pools" />
            </Wrapper>
        )
    }

    if (!loading && error) {
        return (
            <Wrapper>
                <SubHeader path={true} pathName="pools" />
                <h1>Error occured</h1>
            </Wrapper>
        )
    }

    if (!loading && userDataLoading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={userDataLoading} pathName="pools" />
            </Wrapper>
        )
    }

    if (!userDataLoading && !loading && userData.is_staff === false) {
        return (
            <Redirect to="/" push={true} />
        )
    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName="pools" />
            
            <Header>
        
                <SearchWrapper>
                    <PrimarySearchBar valueHasChanged={handleValueChange} onChange={setSearch} name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                
                <PrimaryButton to="/create/pool" text="New" width="80px" height="40px" />

            </Header>

            <ServiceItemPlaceholder data={["name", "type", "interface", "mask"]} />
            <ServiceList handlePoolClick={handlePoolClick} data={foundMatch ? foundMatch : pools} type="pools" />

        </Wrapper>
    )
}

const SearchWrapper = styled.div `

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
