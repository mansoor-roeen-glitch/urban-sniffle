import React from 'react'
import Detail from './Detail';
import styled from 'styled-components';
import PrimaryDropdown from '../../../components/dropdowns/PrimaryDropdown';
import PrimaryHeading from "../../../components/texts/PrimaryHeading";
import PrimaryInput from '../../../components/inputs/PrimaryInput';

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

                            {(() => {
                                switch(item.type) {
                                    
                                    case "detail":
                                        return <Detail value={item.value} heading={item.heading} />;

                                    case "dropdown":
                                        return <PrimaryDropdown onChange={item.onChange} heading={item.heading} value={item.value} options={item.options} selected={0} />;
                                    
                                    case "input":
                                        return <PrimaryInput onChange={item.onChange} inputValue={item.inputValue} heading={item.heading} value={item.value} htmltype={item.htmltype} />
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: ${props => props.rowHeight}px;
    grid-column-gap: 60px;

    @media screen and (max-width: 980px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(${props => props.rows}, 120px);
        grid-column-gap: 45px;

    }

    @media screen and (max-width: 625px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${props => props.count}, 120px);
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

    @media screen and (max-width: 1000px) {
        margin-bottom: 60px;
    }

    @media screen and (max-width: 800px) {
        margin-bottom: 30px;
    }

`;
