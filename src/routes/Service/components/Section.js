import React from 'react'
import styled from 'styled-components';
import PrimaryHeading from "../../../components/texts/PrimaryHeading";
import Detail from './Detail';

export default function Section({data, heading, rows, rowHeight}) {
    return (
        <GeneralSec>
            <HeadingWrapper>
                <PrimaryHeading text={heading} />
            </HeadingWrapper>
            <ContentWrapper count={data.length} rows={rows} rowHeight={rowHeight}>
                {data.map((item) => {
                    return (
                        <DetailWrapper>
                            <Detail heading={item.heading} value={item.value} />
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

    width: 93%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: ${props => props.rowHeight}px;
    grid-column-gap: 60px;

    @media screen and (max-width: 980px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(${props => props.rows}, 130px);
        grid-column-gap: 45px;
    }

    @media screen and (max-width: 625px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${props => props.count}, 130px);
    }

`;

const HeadingWrapper = styled.div `

    margin-bottom: 35px;
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
    margin-bottom: 80px;

`;
