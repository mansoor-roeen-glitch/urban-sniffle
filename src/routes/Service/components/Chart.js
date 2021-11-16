import React from 'react'
import styled from 'styled-components'
import { VictoryPie } from 'victory'

export default function Chart({heading, usage, total, unit}) {

    return (
        <StyledOuterWrapper>
            
            <HeadingContainer>
                <HeadingText>
                    {heading}
                </HeadingText>
                <SubHeadingText>
                    {(usage / 1048576).toFixed(2)}{unit} out of {(total / 1048576).toFixed(2)}{unit} used 
                </SubHeadingText>
            </HeadingContainer> 
            
            <ChartWrapper>
                <TextWrapper>
                    <StyledText>
                        {parseInt((usage / total) * 100)}%
                    </StyledText>
                </TextWrapper>
                <VictoryPie
                    padAngle={0}
                    // used to hide labels
                    labelComponent={<span/>}
                    innerRadius={68}
                    width={200} height={200}
                    data={[{'key': "", 'y': usage}, {'key': "", 'y': (total-usage)} ]}
                    colorScale={["#ba97e4", "#242a35" ]}
                />
            </ChartWrapper>

        </StyledOuterWrapper>
    )
}

const SubHeadingText = styled.span `
    font-size: 0.97rem;
    margin-top: 10px;
    color: var(--white);
    opacity: .5;
    font-weight: 300;
`;

const HeadingText = styled.span `
    font-size: 1.22rem;
    font-weight: normal;
    color: var(--white);
    opacity: .8;
`;

const StyledOuterWrapper = styled.div `
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    height: fit-content;
    width: fit-content;
`;

const HeadingContainer = styled.div `
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ChartWrapper = styled.div `
    width: 200px;
    height: 200px;
`;

const TextWrapper = styled.div `
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px; 
    right: 0px;

    display: flex;
    align-items: center;
    justify-content: center;

`

const StyledText = styled.div `
    text-align: center;
    font-style: normal;
    font-weight: normal;
    font-size: 1.35rem;
    color: var(--white);
    opacity: .8;
`;