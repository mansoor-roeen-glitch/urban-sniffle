import axios from 'axios';
import React, {useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SubHeader from '../../components/Header/SubHeader';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import ServiceItemPlaceholder from '../Base/components/ServiceItemPlaceholder';
import ServiceList from '../Base/components/ServiceList';

export default function Templates({config, handleTemplateClick, userDataLoading, userData}) {

    const [error, setError] = React.useState();
    const [templates, setTemplates] = React.useState();
    const [loading, setLoading] = React.useState(true);

    const getTemplates = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/templates/`,
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

        const response = await getTemplates()

        if (response.status) {
            setTemplates(response.data.results);
            setLoading(false);
        } else {
            setError(response.data);
            setLoading(false);
        }


    }, [])

    if (loading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={true} pathName="Templates" />
            </Wrapper>
        )
    }

    if (!loading && error) {
        return (
            <Wrapper>
                <SubHeader path={true} pathName="Templates" />
                <h1>Error occured</h1>
            </Wrapper>
        )
    }

    if (!loading && userDataLoading) {
        return (
            <Wrapper>
                <SubHeader path={true} loading={userDataLoading} pathName="Plans" />
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
            <SubHeader path={true} pathName="Templates" />
            
            <Header>
                <SearchWrapper>
                    <PrimarySearchBar name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                    
                <PrimaryButton to="/templates/create" text="New" width="80px" height="40px" />

            </Header>

            <ServiceItemPlaceholder data={["name", "type", "id", "file"]} />
            <ServiceList handleTemplateClick={handleTemplateClick} data={templates} type="templates" />

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
