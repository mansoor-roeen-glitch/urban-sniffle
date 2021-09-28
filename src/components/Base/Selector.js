import React from 'react'
import styled from 'styled-components'

export default function Selector() {
    
    const [selected, setSelected] = React.useState(2)
    
    return (
        <Wrapper>
            <InnerWrapper>
                <List>
                    <Item>

                    </Item>
                </List>
            </InnerWrapper>
        </Wrapper>
    )
}

const Item = styled.li `
    width: 200px;
    height: 10px;
`;

const List = styled.ul `
    list-style: none;
    height: auto;
`;

const Wrapper = styled.div `
    width: 100%;
    height: auto;
    background: transparent;
    padding-top: 25px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const InnerWrapper = styled.div `
    width: 95%;
    max-width: 1400px;
`;

