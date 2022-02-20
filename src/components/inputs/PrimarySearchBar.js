import React, {useState} from 'react'
import styled from 'styled-components'
import SvgIcon from '../icons/SvgIcon'

export default function PrimarySearchBar(props) {
    
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [inputValue, setInputValue] = useState('');

    // updating the search value 
    const handleValueChange = (event) => {
        setInputValue(event.target.value)
        props.onChange(event.target.value); 
        props.valueHasChanged(event.target.value)
    }

    const handleInputFocus = () => {
        setIsInputFocused(true)
    }

    const handleInputBlur = () => {
        setIsInputFocused(false)
    }

    return (
    
        <Wrapper>    
            
            <StyledInput 
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur} 
                value={props.value} 
                onChange={handleValueChange} 
                name={props.name} 
                placeholder="Filter by records" 
                className={props.className} 
                id={props.id} 
            />

            <StyledLabel htmlFor={props.name} isInputFocused={isInputFocused} isInputEmpty={!inputValue} >
                <SvgIcon path="/images/general/search-bar-icon.svg" alt="Search Svg" width="18px" height="18px" />
            </StyledLabel>

        </Wrapper>
    )
}

const Wrapper = styled.div `
    width: 300px;
    height: 40px;
    border-radius: 4px;

    border: solid 1px #322d34;
`;

const StyledInput = styled.input ` 
    width: 100%;
    height: 100%;
    padding: 0px 15px;
    font-size: 16px;
    
    background: transparent;
    color: var(--primary-white);
    font-style: normal;
    outline: none;

    &::placeholder {
        padding-left: 30px
    }

    &:focus::placeholder {
        padding-left: 0px;
    }
`;

const StyledLabel = styled.label `
    top: 0px;
    left: 0px;
    bottom: 0px;
    height: 100%;
    padding-left: 15px;
    padding-top: 2px;
    
    position: absolute;
    display: ${props => props.isInputFocused || !props.isInputEmpty ? 'none' : 'flex'};
    pointer-events: none;
    align-items: center;  
    justify-content: center;
`;