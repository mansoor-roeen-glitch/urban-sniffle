import React from 'react'
import styled from 'styled-components'

export default function SelectSection({options, selected, handleOptionClick}) {

    return (

        <Wrapper>
            <List>

                {options.map((option, index) => {
                    
                    return (
                        
                        <Item key={index} selected={selected === option.index}>
                            
                            <ItemButton onClick={() => {handleOptionClick(option.index)}}>

                                <ItemText selected={selected === option.index} >{option.text}</ItemText>

                            </ItemButton>
                            
                        </Item>
                    )

                })}
                
            </List>
        </Wrapper>
    )
}

const ItemText = styled.div `
    
    font-size: 1.1rem;
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

    width: 93%;
    max-width: 1600px;
    height: 62px;
    margin: 35px 0px;

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