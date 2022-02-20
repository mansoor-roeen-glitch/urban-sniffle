import axios from 'axios';
import React, {useEffect} from 'react'
import styled from 'styled-components'
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PrimarySearchBar from '../../components/inputs/PrimarySearchBar';
import TableHeader from '../../components/table/TableAHeader';
import Table from '../../components/table/TableA';

export default function Nodes(
    
    {
        
        config, 
        handleNodeClick, 
        userDataLoading, 
        userData,
        handleSubHeader
    
    }) {

    const [error, setError] = React.useState();
    const [nodes, setNodes] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("")
    const [foundMatch, setFoundMatch] = React.useState(false);

    const handleValueChange = (value) => {
        const keyword = value;
    
        if (keyword !== '') {
          
            const searchRes = nodes.filter((plan) => {
            
                return plan.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            
            });

            setFoundMatch(searchRes);

        } else {
          
            setFoundMatch(false);
        
        }
    }

    const getNodes = async () => {
        let response = await axios({
            method: "get",
            url: `https://hosnet.io/api/nodes/`,
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

        const nodes = await getNodes()

        if (nodes.status) {
            setNodes(nodes.data.results);
            setLoading(false);
        } else {
            setError(nodes.data);
            setLoading(false);
        }


    }, [])

    // Updating Sub-Header based on route
    useEffect(() => {
        handleSubHeader(["nodes"], loading)
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

    if (!loading && userDataLoading) {
        return (
            <Wrapper>
            </Wrapper>
        )
    }

    // if (!userDataLoading && !loading && userData.is_staff === false) {
    //     return (
    //         <Redirect to="/" push={true} />
    //     )
    // }

    return (
        <Wrapper>
            <Header>
        
                <SearchWrapper>
                    <PrimarySearchBar valueHasChanged={handleValueChange} onChange={setSearch} name="SearchBar" className="Primary-Search-Bar" id="Primary-Search-Bar" />
                </SearchWrapper>
                
                <PrimaryButton to="/create/node" text="New" width="80px" height="40px" />

            </Header>

            <TableHeader data={["name", "size", "period", "bandwidth"]} />
            <Table handleNodeClick={handleNodeClick} data={foundMatch ? foundMatch : nodes} type="nodes" />

        </Wrapper>
    )
}

const SearchWrapper = styled.div `

`;

const Header = styled.div `
    width: 93%;
    max-width: 1600px;
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
