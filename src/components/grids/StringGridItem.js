// dependencies
import React, {useState, useEffect} from 'react'

export default function StringGridItem(props) {
  
    // component props
    let {value, errorMes, description, label, stringValidation, minmax, regex} = props

    // setting up component states
    const [inputValue, setInputValue] = useState();
    const [inputError, setInputError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // set is input focused to true
    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    // we'll see if value is valid or not
    // if failed, inputerror would be set to true
    // else if, do nothin...
    const handleInputBlur = () => {
        let isStringValid = stringValidation(value, minmax.max, minmax.min, regex)
        if (!isStringValid) setInputError(true);

        setIsInputFocused(false)
    }

    // setting up component onMount effect
    useEffect(() => {
        // i'll check if input error is true
        if (inputError) showError(true);
        // if it's true then we'll set showError to true
    }, [inputError])

    return (
        <MainWrapper>
            <Header>
                <Heading for={label}>
                    {label}
                </Heading>
                <Description>
                    {description}
                </Description>
            </Header>

            <InputWrapper>
                <Input 
                    value={inputValue} 
                    name={label} 
                    minlength={minmax.min} 
                    maxlength={minmax.max} 
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                />
            </InputWrapper>
        </MainWrapper>
    )
  
}

const Description = styled.span `
    font-size: 0.85rem;
    font-weight: 300;

    color: #a5a9af;
    text-transform: capitalize;
`;

const Heading = styled.span `
    font-weight: 400;
    color: rgb(186 193 203);
    font-size: 1rem;

    text-transform: capitalize;
`;

const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;

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