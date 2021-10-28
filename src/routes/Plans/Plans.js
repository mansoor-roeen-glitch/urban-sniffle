import axios from 'axios';
import React, {useEffect} from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SubHeader from '../../components/Header/SubHeader';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from '../Base/components/ServiceItemPlaceholder';
import ServiceList from '../Base/components/ServiceList';

export default function Plans({config}) {

    const [error, setError] = React.useState();
    const [plans, setPlans] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const getPlans = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/plans/`,
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

        const plans = await getPlans()

        if (plans.status) {
            setPlans(plans.data.results);
            setLoading(false);
        } else {
            setError(plans.data);
            setLoading(false);
        }


    }, [])

    if (loading) {
        return <h1>Loading</h1>
    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName="Plans" />
            
            <Header>
                <SearchWrapper>
                    <PrimarySearchBar name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                <PrimaryButton to="/create" text="New plan" width="110px" height="40px" />
            </Header>

            <ServiceItemPlaceholder data={["name", "size", "period", "bandwidth"]} />
            <ServiceList data={plans} type="plans" />

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
