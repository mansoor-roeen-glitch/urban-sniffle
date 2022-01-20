import React from 'react'
import styled from 'styled-components';
import Svg from '../../components/icons/SvgIcon';

export default function FormElement(

    {
        type,
        value,
        title,
        desc,
        placeholder,
        onChange,
    })
    
    {

        let isInput = type === "input"

        const handleInputChange = (event) => {
            onChange({value: event.target.value})
        }

        return (
            <Wrapper>
                
                <ElementHeader>
                    <ElementHeading> {title} </ElementHeading>
                    <ElementDesc> {desc} </ElementDesc>
                </ElementHeader>

                <ElementWrapper>

                    {isInput && (<ElementInput placeholder={placeholder} value={value} onChange={handleInputChange} /> )}

                    {!isInput && 
                        (<ElementDropdown>

                            <ElementDropdownButton>

                                <ElementDropdownButtonText>
                                    {title}
                                </ElementDropdownButtonText>

                                <ElementDropdownSvg>
                                    <Svg path="/images/dropdown.svg" width={11} height={24} />
                                </ElementDropdownSvg>

                            </ElementDropdownButton>

                            

                        </ElementDropdown> )}

                </ElementWrapper>

            </Wrapper>
        )
}

const ElementDropdownSvg = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    position: absolute;

    right: 20px;
    height: 100%;
`;

const ElementDropdownButtonText = styled.span `
    width: 100%;
    color: #ced0d4;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;

    display: flex;
    align-items: center;
`;

const ElementDropdownButton = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 20px;
    
    width: 100%;
    height: 100%;
    background-color: #141923;
`;

const ElementDropdown = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 45px;
`;

const ElementInput = styled.input `
    width: 100%;
    height: 40px;
    padding-left: 20px;
    font-size: 14px;
    border-radius: 6px;
    
    color: #ced0d4;
    border: solid 1px #24282e;
    background: transparent;

    &::placeholder {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;

        display: flex;
        align-items: center;

        color: #666F7B; 
    }
`;

const ElementWrapper = styled.div `
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ElementDesc = styled.span `
    font-style: normal;
    font-weight: 300;
    font-size: 15px;

    display: flex;
    align-items: center;

    color: #6d6f72;
`;

const ElementHeading = styled.span `
    font-style: normal;
    font-weight: 400;
    font-size: 16px;

    display: flex;
    align-items: center;

    color: #c9ced5;
`;

const ElementHeader = styled.div `
    
    display: flex;
    flex-direction: column;

    width: auto;
    height: fit-content;

`;

const Wrapper = styled.div `
    
    width: 100%;
    max-width: 780px;
    column-gap: 40px;

    height: fit-content;
    display: grid;

    grid-template-columns: 1.1fr 1.2fr;

`;