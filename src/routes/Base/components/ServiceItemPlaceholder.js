import React from 'react'
import styled from 'styled-components';

export default function ServiceItemPlaceholder({data}) {
    return (
        <ContentWrapper>
                <ContentHeader>
                    <HeaderList>
                        {data && data.map((item, index) => {
                            return (
                            
                                <ListItem key={index} style={{justifyContent: index === 0 ? "flex-start" : "center"}}>
                                    <ItemText>
                                        {item}
                                    </ItemText>
                                </ListItem>
                            
                            )
                            
                        })}
                    </HeaderList>
                </ContentHeader>
                <Content>

                </Content>
            </ContentWrapper>
    )
}


const Content = styled.div ``;

const ListItem = styled.li `
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ItemText = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 0.85rem;
    line-height: 124%;
    text-transform: uppercase;

    color: var(--primary-gray);
`;

const HeaderList = styled.ul `
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 70px 70px 70px;
    grid-template-rows: auto;
    column-gap: 40px;
`;

const ContentHeader = styled.div `
    width: 93%;
    max-width: 1400px;
    height: fit-content;
`;

const ContentWrapper = styled.div `
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
