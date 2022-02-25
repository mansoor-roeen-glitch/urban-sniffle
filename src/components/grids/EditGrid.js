// dependencies
import React from 'react'
import styled from 'styled-components';

// components
// import Detail from './Detail';
// import PrimaryDropdown from '../../../components/dropdowns/PrimaryDropdown';
// import PrimaryHeading from "../../../components/texts/PrimaryHeading";
// import PrimaryInput from '../../../components/inputs/PrimaryInput';


export default function EditGrid({data, heading}) {
    
    // determine the field type and return component
    const determineItemField = (gridItem) => {
        // checks if field is number
        if (gridItem?.field === 'string') {
            return <StringGridItem fieldData={gridItem} />}
        // checks if field is float
        else if (gridItem?.field === 'float') {
            // return <FloatGridItem fieldData={gridItem} />    
        }
        // checks if field is string
        else if (gridItem?.field === 'number') {
            // return <NumberGridItem fieldData={gridItem} />
        }
    }

    // this function maps through data
    // returns grid item
    const mapGridData = () => {
        // we wanna return the end result
        return data?.map(gridItem => (
            determineItemField(gridItem)
        ))
    }

    return (

        <MainWrapper>
            
            <GridHeader>
                <GridHeading>
                    update "test-plan-3" plan
                </GridHeading>
            </GridHeader>    

            <Grid>
                {mapGridData()}
            </Grid>

        </MainWrapper>

    )
}

const GridItem = styled.span `
    color: white;
`;

const Grid = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const GridHeading = styled.span `
    color: rgb(207 214 223);
    font-size: 20px;
    font-weight: 600;
`;

const GridHeader = styled.div `
    display: flex;
    align-items: center;
    height: fit-content;

    width: 100%;
`;

const MainWrapper = styled.div `
    display: flex;
    flex-direction: column;
    height: fit-content;

    width: 100%;
    column-gap: 30px;
`;