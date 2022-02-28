// dependencies
import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

export default function StringGridItem({fieldData, updateFormField, index}) {
    
    // component props
    let {value, errorMes, description, label, stringValidation, minmax, regex} = fieldData

    // setting up component states
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [inputCompleted, setInputCompleted] = useState();

    // set is input focused to true
    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    // we'll see if value is valid or not
    // if failed, inputerror would be set to true
    // else if, do nothin...
    const handleInputBlur = () => {
        let isStringValid = stringValidation(inputValue, minmax.max, minmax.min, regex)
        
        if (isStringValid.error) {
            setInputError(isStringValid)
            setInputCompleted(false)

            // update the form
            updateFormField({
                inputValue,
                fieldIndex: index,
                errorMes: isStringValid,
            })
        }
        
        else {

            setInputError({error: false});
            // if input is not empty
            // then set input completed to true
            if (inputValue !== '') {
                setInputCompleted(true)
                
                // update the form
                updateFormField({
                    inputValue,
                    fieldIndex: index,
                })

            } 

            else {setInputCompleted(false)}
        }

        setIsInputFocused(false)
    }

    // this well update the inputValue to whatever the value of input is
    const handleInputChange = (event) => {
        if (event.target.value === '') {
            setInputValue('')
        } else {
            // we'll see if character is valid or not
            if (regex.test(event.target.value)) {
                setInputValue(event.target.value)
            }
        }
    }

    // setting up component onMount effect
    useEffect(() => {
        // i'll check if input error is true
        if (inputError) setShowError(inputError);
        // if it's true then we'll set showError to true
    }, [inputError])

    return (
        <MainWrapper>
            <Header>
                <Heading for={label} error={showError?.error}>
                    {label}
                </Heading>
                <Description error={showError?.error}>
                    {description}
                </Description>
            </Header>

            <InputWrapper>
                <Input  
                    inputCompleted={inputCompleted}
                    error={showError?.error}
                    onChange={handleInputChange}
                    value={inputValue} 
                    placeholder={value}
                    name={label} 
                    minlength={minmax?.min} 
                    maxlength={minmax?.max} 
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
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
    background: ${props => props.inputCompleted ? '#10151c': 'transparent'};
    color: #d3d6db;
    border: solid 1px ${props => props.error ? '#4b1e1e' : '#323334'};

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
    font-size: 0.85rem;
    font-weight: 300;

    color: ${props => props.error ? '#af6f65' : '#a5a9af'};
    text-transform: capitalize;
`;

const Heading = styled.span `
    font-weight: 400;
    color: ${props => props.error ? '#bb5b5b' : 'rgb(186 193 203)'};
    font-size: 1rem;

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

    row-gap: 10px;
`;