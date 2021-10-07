import React from 'react';
import SubHeader from '../../components/Header/SubHeader';
import styled from 'styled-components';

import Details from './components/Details'
import Console from './components/Console';
import Billing from './components/Billing';
import Settings from './components/Settings';

export default function Service(props) {

    const {id, hostname} = props.match.params
    const [selected, setSelected] = React.useState(0)

    const selectOptions = [
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
        },
        {
            text: "Settings",
            index: 3
        }
    ]

    const handleOptionClick = (index) => {
        setSelected(index)
    }

    return (
        <Wrapper>
            <SubHeader path={true} pathName={hostname} />
            <HeaderWrapper>
                <InnerWrapper>
                    <List>
                        {selectOptions.map((option) => {
                            return (
                                <Item className={selected === option.index ? "Option-Selected" : ""} style={{opacity: selected === option.index ? "1" : ".5"}}>
                                    <ItemButton onClick={() => {handleOptionClick(option.index)}}>
                                        <ItemText>{option.text}</ItemText>
                                    </ItemButton>
                                    {selected === option.index ? (
                                        
                                        <StyledLine></StyledLine>
                                    ) : null}
                                </Item>
                            )
                        })}
                    </List>
                </InnerWrapper>
            </HeaderWrapper>

            <ContentWrapper>

                {(() => {
                    switch(selected) {
                        
                        case 0:
                            return <Details />;

                        case 1:
                            return <Console />;
                        
                        case 2:
                            return <Billing />;
                        
                        case 3: 
                            return <Settings />
                    }
                })()}

            </ContentWrapper>

        </Wrapper>
    )
}

const ContentWrapper = styled.div `

`;

const StyledLine = styled.div `
    width: 100%;
    height: 1px;
    position: absolute;
    background: var(--primary-cyan);
    bottom: 0px;
`;
 
const ItemButton = styled.button `

    width: 100%;
    height: 100%;
    background: transparent;
    border: none;

    outline: none!important;

    &:hover {
        cursor: pointer;
    }

`;

const ItemText = styled.span `
    font-size: 1.22rem;
    font-weight: 300;
    font-style: normal;
    line-height: normal;
    color: var(--white);
`;

const Wrapper = styled.div `

`;


const Item = styled.li `
    width: 150px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const List = styled.ul `
    list-style: none;
    height: auto;

    display: flex;
    flex-direction: row;
    height: 100%;
`;

const HeaderWrapper = styled.div `
    width: 100%;
    height: 60px;
    background: transparent;
    padding-top: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    

    &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background: var(--white);
        opacity: .4;
    }
`;

const InnerWrapper = styled.div `
    width: 95%;
    max-width: 1400px;
    height: 100%;

`;

