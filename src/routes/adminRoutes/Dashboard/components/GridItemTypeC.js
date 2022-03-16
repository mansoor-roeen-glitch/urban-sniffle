// Importing Dependencies
import React from 'react';
import styled from 'styled-components';

export default function GridItemTypeC({iconSize, heading, status, tableHeaderData, tableData, isListOfTasks}) {
    
    // Component Variables
    const {iconWidth, iconHeight} = iconSize; 


    // JSX for Render

    return (
    
        <Wrapper>
            
            <Header>
                <HeadingWrapper>
                    <Heading>
                        {heading}
                    </Heading>
                    
                    {!isListOfTasks ? (

                        <Status>
                            {status}    
                        </Status>

                    ) : null }

                </HeadingWrapper>
            </Header>

            <TableContentWrapper>

                <TableHeader>
                    
                    <TableRowWrapper noBg={true}>

                        <TableRow isListOfTasks={isListOfTasks}>

                            {tableHeaderData.map((field, index) => {
                                
                                return (
                                    <TableField key={index} isListOfTasks={isListOfTasks}>
                                        <TableHeadingFieldValue>
                                            {field}
                                        </TableHeadingFieldValue>
                                    </TableField>
                                )

                            })}
                            
                        </TableRow>

                    </TableRowWrapper>

                </TableHeader> 

                <Table tableRowLength={tableData.length}>
                    
                    {tableData.map((table, index) => {

                        return (

                            <TableRowWrapper>
                        
                                <TableRow key={index} isListOfTasks={isListOfTasks}>

                                    {table.map((field, index) => {

                                        return(
                                            <TableField key={index} isListOfTasks={isListOfTasks}>
                                                <TableFieldValue>
                                                    {field}
                                                </TableFieldValue>
                                            </TableField>
                                        )

                                    })}

                                </TableRow>
                            
                            </TableRowWrapper>
                        )

                    })}

                </Table>

            </TableContentWrapper>

        </Wrapper>
    
    )

}


const TableContentWrapper = styled.div `
    height: fit-content;
    overflow-y: scroll;
    
    width: 100%;
    max-height: 200px;

    &:hover {
        
        &::-webkit-scrollbar-thumb {
            background-color: #4d5868ff;
        }

    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #4d586800;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    
`;

const Table = styled.div `
    display: grid;
    align-items: center;
    height: fit-content;

    width: 100%;
    padding-top: 4px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.tableRowLength}, 39px);
`;

const TableFieldValue = styled.span `
    color: #CDD1D7;

    font-size: 14px;
    font-weight: 300;
`;

const TableHeadingFieldValue = styled.span `
    color: #6B717A;

    font-size: 14px;
    font-weight: 300;
`;

const TableField = styled.div `
    width: auto;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;


    &:nth-child(1) {    
        border-right: ${props => props.isListOfTasks ? 'none' : 'solid 1px #181e26'};
        justify-content: flex-start;
    }

    &:nth-child(2) {
        justify-content: ${props => props.isListOfTasks ? 'center': 'flex-start'};
        padding-left: ${props => props.isListOfTasks ? '0px' : '15px'};
    }

    &:nth-child(3) {
        justify-content: ${props => props.isListOfTasks ? 'flex-end': 'center'};
    }

`;

const TableRow = styled.div `
    width: 94%;
    height: 100%;
    grid-column-gap: 10px;
    grid-template-rows: 1fr;

    grid-template-columns: ${props => !props.isListOfTasks ? '0.26fr 2.5fr 0.8fr 0.7fr 0.7fr' : '1fr 1fr 1fr'};

    display: grid;
`;

const TableRowWrapper = styled.div `
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

`;

const TableHeader = styled.div `
    width: 100%;
    height: 38px;
    z-index: 2;
    top: 0px;
    
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: #10151b;
    box-shadow: 0px 3px 6px #00000047;
    border-bottom: solid 2px #1E2125;

`;

const IconWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
`;

const Status = styled.span `
    color: #8A8E94;
    font-weight: 300;

    font-size: 14px;
`;

const Heading = styled.span `
    color: #CCD1D9;
    font-weight: 500;

    font-size: 16px;
`;

const HeadingWrapper = styled.div `
    display: flex;
    align-items: center;
    height: fit-content;
    width: fit-content;

    column-gap: 8px;
    width: 94%;
`;

const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 50px;
`;

const Wrapper = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #10151b;

    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding-bottom: 5px;

    &::before {
        content: '';
        position: absolute;
        background: #1E2125;
        
        top: 50px;
        width: 100%;
        height: 1px;
        left: 0px;
        right: 0px;
        z-index: 3;
    }

`;
