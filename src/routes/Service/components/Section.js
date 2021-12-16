import React from 'react'
import Detail from './Detail';
import styled from 'styled-components';
import PrimaryDropdown from '../../../components/dropdowns/PrimaryDropdown';
import PrimaryHeading from "../../../components/texts/PrimaryHeading";
import PrimaryInput from '../../../components/inputs/PrimaryInput';

export default function Section({data, heading, rows, rows1, rows2, rows3, rowHeight}) {
    return (
        <GeneralSec>
            <HeadingWrapper>
                <PrimaryHeading text={heading} />
            </HeadingWrapper>
            <ContentWrapper count={data.length} rows={rows} rows1={rows1} rows2={rows2} rows3={rows3} rowHeight={rowHeight}>
                {data.map((item) => {
                    return (
                        <DetailWrapper>

                            {(() => {
                                switch(item.type) {
                                    
                                    case "detail":
                                        return <Detail value={item.value} heading={item.heading} />;

                                    case "dropdown":
                                        return <PrimaryDropdown onChange={item.onChange} heading={item.heading} value={item.value} options={item.options} selected={0} />;
                                    
                                    case "input":
                                        return <PrimaryInput onChange={item.onChange} inputValue={item.inputValue} heading={item.heading} value={item.value} htmltype={item.htmltype} errorMes={item.errorMes} messageDur={item.messageDur} hasErrorMessage={item.hasErrorMessage} />
                                }
                            })()}

                        </DetailWrapper>
                    )
                })}
            </ContentWrapper>
        </GeneralSec>
    )
}


const DetailWrapper = styled.div `
`;

const ContentWrapper = styled.div `

    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(${props => props.rows}, ${props => props.rowHeight}px);
    grid-column-gap: 60px;

    @media screen and (max-width: 1800px) {
        grid-column-gap: 30px;
    }

    @media screen and (max-width: 1300px) {
        grid-column-gap: 50px;
        grid-template-rows: repeat(${props => props.rows1}, ${props => props.rowHeight}px);
        grid-template-columns: 1fr 1fr 1fr;
    }

    @media screen and (max-width: 1100px) {
        grid-column-gap: 25px;
    }

    @media screen and (max-width: 1050px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(${props => props.rows2}, ${props => props.rowHeight}px);
        grid-column-gap: 45px;

    }

    @media screen and (max-width: 850px) {
        grid-column-gap: 25px;
    }

    @media screen and (max-width: 770px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${props => props.rows3}, ${props => props.rowHeight}px);
    }

`;

const HeadingWrapper = styled.div `

    margin-bottom: 45px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

`;

const GeneralSec = styled.div `

    width: 100%;
    height: auto;
    background: var(--primary-background);
    display: flex;
    flex-direction: column;

`;
