// dependencies
import React from 'react'
import styled from 'styled-components'
import TableItem from './TableAItem'

export default function PrimaryTable({data, type}) {
    
    // This function will return Table Row depending on type
    // if type is service and service_plan doesn't exist, then return null
    const typeSwitch = (item, index) => {

        if (type === 'services' && !item.service_plan) return null;

        switch (type) {

            case "services": 
                return (
                    <TableItem type="service" index={index} item={[
                        item.id, item.hostname, item.plan, item.status, item.service_plan.ram
                    ]} redirectTo={`/services/${item.id}/${item.hostname?.toLowerCase()}`} key={index} />);

            case "plans":
                return (
                    <TableItem type="plan" index={index} details={item} item={[
                        item.id, item.name, item.size, item.period, item.bandwidth
                    ]} redirectTo={`/plans/${item.id}`} key={index} />);

            case "templates":
                return (
                    <TableItem index={index} details={item} type="template" item={[
                        item.id, item.name, item.type, item.id, item.file
                    ]} redirectTo={`/templates/${item.id}`} key={index} />);

            case "nodes":
                return (
                    <TableItem index={index} details={item} type="node" item={[
                        item.id, item.name, item.size, item.ram, item.bandwidth
                    ]} redirectTo={`/nodes/${item.id}`} key={index} />);

            case "ippools":
                return (
                    <TableItem index={index} details={item} type="ip_pool" item={[
                        item.id, item.name, item.type, item.interface, item.mask
                    ]} redirectTo={`/ippools/${item.id}`} key={index} />);
        }

    }

    // mapping through all the results
    // if data is empty then return nothing
    // otherwise call typeSwitch Function
    const mapData = () => {
        return data.map((item, index) => {
            return typeSwitch(item, index)
        })
    }
    
    if (!Array.isArray(data) || data === []) {
        return (
            <MessageWrapper>
                <MessageInnerWrapper>
                    <Message>
                        No Results Found
                    </Message>
                </MessageInnerWrapper>
            </MessageWrapper>
        )
    }

    return (    
        <MainWrapper>
            <TableWrapper>
                {mapData()}
            </TableWrapper>
        </MainWrapper>
    )
}

const MessageInnerWrapper = styled.div `
    width: 95%;
    max-width: 2000px;
`;

const Message = styled.p `
    color: var(--white);
    font-size: 18;
    width: 450px;
`

const MessageWrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;

    padding-top: 25px;

`;

const TableWrapper = styled.ul `
    TableWrapper-style: none;
    display: flex;
    flex-direction: column;

    width: fit-content;
    height: fit-content;
    width: 100%;

`

const MainWrapper = styled.div `
    width: 100%;
    padding-top: 10px;
    background: transparent;
    
    align-items: center;
    justify-content: center;
    display: flex;
`;

