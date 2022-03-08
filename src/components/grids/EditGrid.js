// dependencies
import React from 'react'
import styled from 'styled-components';

// components
import NumberGridItem from './NumberGridItem';
import FloatGridItem from './FloatGridItem';
import StringGridItem from './StringGridItem';
import DropdownGridItem from '../dropdowns/PrimaryDropdown';
// import Detail from './Detail';
// import PrimaryDropdown from '../../../components/dropdowns/PrimaryDropdown';
// import PrimaryHeading from "../../../components/texts/PrimaryHeading";
// import PrimaryInput from '../../../components/inputs/PrimaryInput';


export default function EditGrid({data, heading, updateForm, formData}) {
    
    // updating the input field from form depending on fieldIndex
    const updateInputFormField = ({fieldIndex, inputValue, errorMes}) => {
        let newFormData = [...formData];
        newFormData[fieldIndex].inputValue = inputValue;
        
        // if we got error, then update with error
        if (errorMes) newFormData[fieldIndex].errorMes = errorMes;

        updateForm(newFormData)
    }

    // updating the dropdown field
    const updateDropdownField = ({selectedOption, fieldIndex}) => {
        if (formData[fieldIndex].selected === selectedOption) return null;

        let newFormData = [...formData];
        // if the selected option is not that same as it was previously
        // then update form data
        newFormData[fieldIndex].selected = selectedOption
        updateForm(newFormData)
    }

    // determine the field type and return component
    const determineItemField = (gridItem, index) => {
        // checks if field is string
        if (gridItem?.field === 'string') {
            return <StringGridItem fieldData={gridItem} key={index} index={index} updateFormField={updateInputFormField} />}
        // checks if field is number
        else if (gridItem?.field === 'number') {
            return <NumberGridItem fieldData={gridItem} key={index} index={index} updateFormField={updateInputFormField} />}
        // checks if field is float
        else if (gridItem?.field === 'float') {
            return <FloatGridItem fieldData={gridItem} key={index} index={index} updateFormField={updateInputFormField} />}
        // checks if field is float
        else if (gridItem?.field === 'selector') {
            return <DropdownGridItem fieldData={gridItem} key={index} index={index} updateFormField={updateDropdownField} />}
    }

    // this function maps through data
    // returns grid item
    const mapGridData = () => {
        // we wanna return the end result
        return data?.map((gridItem, index) => (
            determineItemField(gridItem, index)
        ))
    }

    return (

        <MainWrapper>
            
            <GridHeader>
                <GridHeading>
                    update "test-plan-3" plan
                </GridHeading>
            </GridHeader>    

            <FormWrapper>
                <Grid>
                    {mapGridData()}
                </Grid>
            </FormWrapper>

        </MainWrapper>

    )
}

const FormWrapper = styled.div `
    width: 100%;

    height: fit-content;
    display: flex;
    flex-direction: column;
`;

const Grid = styled.li `
    display: grid;
    list-style: none;

    width: 100%;
    grid-column-gap: 30px;
    grid-row-gap: 20px;

    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
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
    row-gap: 30px;
`;