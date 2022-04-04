// Importing Dependencies 
import React from 'react';
import styled from 'styled-components';

// Importing Components
import GridItemTypeC from './GridItemTypeC';


export default function SectionTwoComponent({ ...props }) {

    console.log(props)

    const {
        tableOneData,
        tableTwoData,
        tableOneHeaderData,
        tableTwoHeaderData,
    } = props

    return (

        <SectionTwo>

            <GridItemTypeC 
                heading='List Of IP Addresses'
                status='(1/20 online)'
                iconPath='ipv4-icon.svg'

                tableHeaderData={tableOneHeaderData}
                tableData={tableOneData}

                iconSize={{
                    iconWidth: 20, 
                    iconHeight: 20,
                }} 

            />

            <GridItemTypeC 
                heading='List Of Recent Tasks'

                tableHeaderData={tableTwoHeaderData}
                tableData={tableTwoData}
                
                iconSize={{
                    iconWidth: 20, 
                    iconHeight: 20,
                }} 

            />

        </SectionTwo>

    )
}


const SectionTwo = styled.div `
    display: grid;
    height: fit-content;

    width: 100%;
    grid-gap: 35px;
    grid-template-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
`;
