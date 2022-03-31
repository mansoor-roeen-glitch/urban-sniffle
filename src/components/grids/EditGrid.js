// dependencies
import React from 'react'
import styled from 'styled-components';

// components
import NumberField from './NumberField';
import FloatField from './FloatField';
import TextField from './TextField';
import SelectField from '../dropdowns/PrimaryDropdown';
import ManyToManyField from './ManyToManyField';

export default function EditGrid({data, heading, updateForm, formData}) {
    
    const [error, setError] = React.useState(false);
    
    // updating the input field from form depending on fieldIndex
    const updateInputFormField = ({fieldIndex, inputValue, errorMes}) => {

        let newFormData = [...formData];

        if (newFormData[fieldIndex].type === 'number') {
            if (newFormData[fieldIndex].key === 'price') inputValue = inputValue
            else inputValue = Math.round(inputValue);
        }

        newFormData[fieldIndex].inputValue = inputValue;
        
        // if we got error, then update with error
        if (errorMes) newFormData[fieldIndex].error = errorMes
        else newFormData[fieldIndex].error = false;

        updateForm(newFormData)
    }

    // updating the dropdown field
    const updateSelectFormField = ({selectedOption, fieldIndex}) => {
        if (formData.choice === selectedOption) return null;

        let newFormData = [...formData];
        newFormData[fieldIndex].choice = selectedOption;
        updateForm(newFormData);
    }

    // updating the many to many lists
    const updateManyToManyField = ({selectedOption, fieldIndex}) => {
        let newFormData = [...formData];
        console.log(selectedOption)
        if (Array.isArray(formData[fieldIndex].choices) && formData[fieldIndex].choices !== []) {
            let isChecked = formData[fieldIndex].choices[selectedOption].isChecked
            newFormData[fieldIndex].choices[selectedOption].isChecked = !isChecked;

            updateForm(newFormData);
        }

        return null;
    }   

    // determine the field type and return component
    const determineItemField = (gridItem, index) => {

        if (!gridItem || !gridItem?.type) return null;

        // checks if field is string
        if (gridItem?.type === 'text') {
            return <TextField fieldData={gridItem} key={index} index={index} updateFormField={updateInputFormField} />}
        // checks if field is number
        else if (gridItem?.type === 'number') {
            return <NumberField fieldData={gridItem} key={index} index={index} updateFormField={updateInputFormField} />}
        // checks if field is float
        else if (gridItem?.type === 'select' || gridItem.type === 'foreignkey') {
            return <SelectField fieldData={gridItem} key={index} index={index} updateFormField={updateSelectFormField} />}

        else if (gridItem?.type === 'manytomany-lists') {
            return <ManyToManyField fieldData={gridItem} key={index} index={index} updateFormField={updateManyToManyField} />}
    }

    // this function maps through data
    // returns grid item
    const mapGridData = () => {
        // we wanna return the end result
        if (data.length > 0 && data !== false) {
            return data.map((gridItem, index) => (
                determineItemField(gridItem, index)
            ))
        }
    }

    React.useEffect(() => {
        if (data === [] || !data) setError(true);
    }, [])


    if (error) {
        return null;
    }

    return (

        <MainWrapper>
            
            <GridHeader>
                <GridHeading>
                    {heading.charAt(0).toUpperCase() + heading.slice(1)}
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