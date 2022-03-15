// dependencies
import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

export default function NumberGridItem({fieldData, updateFormField, index}) {
    
    // component props
    let {value, description, label, minmax} = fieldData

    // setting up component states
    const [inputValue, setInputValue] = useState('');

    // this well update the inputValue to whatever the value of input is
    const handleInputChange = (event) => {
        if (event.target.value < minmax.min) setInputValue(minmax.min) 
        else if (event.target.value > minmax.max) setInputValue(minmax.max)
        else setInputValue(event.target.value); 
    }

    // on inputValue change, we'd like to change the formData
    useEffect(() => {
        updateFormField({
            inputValue,
            fieldIndex: index,
        })
    }, [inputValue])


    return (
        <MainWrapper>
            <Header>
                <Heading for={label} >
                    {label}
                </Heading>
                <Description >
                    {description}
                </Description>
            </Header>

            <InputWrapper>
                <Input  
                    onChange={handleInputChange}
                    value={inputValue} 
                    placeholder={value || 'ex: 1024'}
                    name={label} 
                    min={minmax?.min} 
                    max={minmax?.max} 
                    type='number'
                />
            </InputWrapper>
        </MainWrapper>
    )
  
}

const Input = styled.input `
    width: 100%;
    height: 100%;
    padding: 0px 10px; 
    border-radius: 6px;
    font-weight: 400;
    font-size: 1rem;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    outline: none;
    background: #10151c;
    color: #d3d6db;
    border: solid 1px #323334;

    &::placeholder {
        font-weight: 400;
        color: #a5a9af;
        font-size: 1rem;
    }
`;

const InputWrapper = styled.div `
    width: 100%;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Description = styled.span `
    font-size: 0.8rem;
    font-weight: 300;

    color: #a5a9af;
    text-transform: capitalize;
`;

const Heading = styled.span `
    font-weight: 400;
    color: rgb(186 193 203);
    font-size: 0.9rem;

    text-transform: capitalize;
`;

const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;

    padding-left: 6px;
    column-gap: 8px;
`;

const MainWrapper = styled.div `
    width: auto;
    height: fit-content;
    display: flex;
    flex-direction: column;

    row-gap: 6px;
`;