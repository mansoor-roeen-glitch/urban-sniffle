import React from 'react'
import styled from 'styled-components';

export default function ServiceItemPlaceholder() {
    return (
        <ContentWrapper>
                <ContentHeader>
                    <HeaderList>
                        <ListItem style={{justifyContent: "flex-start"}}>
                            <ItemText>
                                Hostname
                            </ItemText>
                        </ListItem>
                        <ListItem>
                            <ItemText>
                                Plan
                            </ItemText>
                        </ListItem>
                        <ListItem>
                            <ItemText>
                                Status
                            </ItemText>
                        </ListItem>
                        <ListItem>
                            <ItemText>
                                Ram
                            </ItemText>
                        </ListItem>
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
    justify-content: flex-end;
`;

const ItemText = styled.span `
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 124%;
    text-transform: uppercase;

    color: var(--primary-gray);
`;

const HeaderList = styled.ul `
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 100px 100px 100px;
    grid-template-rows: auto;
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
