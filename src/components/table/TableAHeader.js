import React from 'react'
import styled from 'styled-components';

export default function PrimaryTableItemHeader({data}) {
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
    font-size: 0.85rem;

    text-transform: uppercase;
    color: var(--primary-gray);
`;

const HeaderList = styled.ul `
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 85px 85px 85px;
    grid-template-rows: auto;
    column-gap: 40px;
`;

const ContentHeader = styled.div `
    width: 95%;
    max-width: 2000px;
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
