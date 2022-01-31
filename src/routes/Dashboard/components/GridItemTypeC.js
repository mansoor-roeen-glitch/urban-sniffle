// Importing Dependencies
import React from 'react';
import styled from 'styled-components';

// Importing Components
import Svg from '../../../components/icons/SvgIcon';


export default function GridItemTypeC({iconSize, heading, status, tableHeaderData, tableData}) {
    
    // Component Variables
    const {iconWidth, iconHeight} = iconSize; 

    
    // Functions ^^
    const shouldHaveBg = (index) => {
        console.log(index)
        let reminder = index % 2;

        if (reminder == 0) {
            return false;

        } else if (reminder == Math.round(reminder)) {
            return true;

        } else {
            return false;
        
        }

    }


    // JSX for Render

    return (
    
        <Wrapper>
            
            <Header>
                <HeadingWrapper>
                    <Heading>
                        {heading}
                    </Heading>
                    <Status>
                        {status}
                    </Status>
                </HeadingWrapper>
            </Header>

            <TableHeader>
                
                <TableRowWrapper noBg={true}>

                    <TableRow>

                        {tableHeaderData.map((field, index) => {
                            
                            return (
                                <TableField key={index}>
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

                    let bg = shouldHaveBg(index + 1);

                    return (

                        <TableRowWrapper noBg={bg}>
                      
                            <TableRow key={index}>

                                {table.map((field, index) => {

                                    return(
                                        <TableField key={index}>
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

        </Wrapper>
    
    )

}


const Table = styled.div `
    display: grid;
    align-items: center;
    height: fit-content;
    overflow-y: scroll;

    width: 100%;
    max-height: 200px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.tableRowLength}, 50px);

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
    }

    &::-webkit-scrollbar-track {
        background-color: #28292a;
        position: sticky;
    }


`;

const TableFieldValue = styled.span `
    color: #CDD1D7;

    font-size: 17px;
    font-weight: 300;
`;

const TableHeadingFieldValue = styled.span `
    color: #6B717A;

    font-size: 16px;
    font-weight: 300;
`;

const TableField = styled.div `
    width: auto;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;


    &:nth-child(1) {    
        border-right: solid 1px #181e26;
        justify-content: flex-start;
    }

    &:nth-child(2) {
        justify-content: flex-start;
        padding-left: 15px;
    }

    &:nth-child(5) {
        border-right: none;
    }

`;

const TableRow = styled.div `
    width: 94%;
    height: 100%;
    grid-column-gap: 10px;
    grid-template-rows: 1fr;
    grid-template-columns: 0.3fr 2.5fr 0.8fr 0.7fr 0.7fr;

    display: grid;
`;

const TableRowWrapper = styled.div `
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px #181e26;

    &::before {
        content: '';
        position: absolute;
        background: ${props => props.noBg ? 'transparent' : '#0e1218' };

        height: 100%;
        width: 100%;

    }

`;

const TableHeader = styled.div `
    width: 100%;
    height: 45px;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 3px 6px #00000047

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

    font-size: 16px;
`;

const Heading = styled.span `
    color: #CCD1D9;
    font-weight: 500;

    font-size: 18px;
`;

const HeadingWrapper = styled.div `
    display: flex;
    align-items: center;
    height: fit-content;
    width: fit-content;

    column-gap: 8px;
    width: 93%;
`;

const Header = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 60px;
`;

const Wrapper = styled.div `
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #10151b;

    width: 100%;
    height: 100%;
    border-radius: 10px;

    &::before {
        content: '';
        position: absolute;
        background: #1E2125;
        
        top: 60px;
        width: 100%;
        height: 1px;
        left: 0px;
        right: 0px;
    }

    &::after {
        content: '';
        position: absolute;
        background: #1E2125;
        
        top: 105px;
        width: 100%;
        height: 1px;
        left: 0px;
        right: 0px;
    }

`;
