import React from 'react'
import styled from 'styled-components'

export default function SelectSection({selectedOption, handleOptionClick, handleOptionClickProp}) {

    const options = [
        {
            text: "Details",
            index: 0
        },
        {
            text: "Console",
            index: 1
        },
        {
            text: "Billing",
            index: 2
        }
        ,
        {
            text: "Settings",
            index: 3
        }
    ]

    return (

        <Wrapper>
            <List>

                {options.map((option, index) => {
                    
                    return (
                        
                        <Item key={index} selected={selectedOption === option.index}>
                            
                            <ItemButton onClick={() => {handleOptionClick(option.index, handleOptionClickProp)}}>

                                <ItemText selected={selectedOption === option.index} >{option.text}</ItemText>

                            </ItemButton>
                            
                        </Item>
                    )

                })}
                
            </List>
        </Wrapper>
    )
}

const ItemText = styled.div `
    
    font-size: 15px;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    color: ${props => !props.selected ? "#767f8b" : "#d1d5db"};

`;

const ItemButton = styled.button `

    width: 100%;
    height: 100%;

    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }

`;

const Item = styled.li `

    width: 150px;
    height: 100%;

    display: flex;
    align-items: center;
    text-decoration: none;
    justify-content: center;

    &::after {

        bottom: 0px;
        position: absolute;
        z-index: 2;
        content: "";
        width: 100%;
        height: 4px;
        background: #aebbce;

        display: ${props => !props.selected ? "none" : "initial"};

    }

`;

const List = styled.ul `

    height: 100%;
    list-style: none;

    display: flex;
    flex-direction: row;

`;

const Wrapper = styled.div `

    width: 95%;
    max-width: 2000px;
    height: 62px;
    margin: 0px 0px 30px;

    display: flex;
    align-items: center;

    &::after {
    
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 4px;
        background: #1a1e24;

    }

`;