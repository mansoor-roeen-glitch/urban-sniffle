// Importing Dependencies
import React from 'react';
import ProgressBar from 'react-customizable-progressbar'
import styled from 'styled-components';


export default function ChartTypeB({...props}) {
  
    const {
        heading, 
        progressText, 
        progress, 
        description
    } = props

    return (

        <Chart>
                        
            <ChartHeader>
                <ChartHeading>
                    {heading}
                </ChartHeading>
            </ChartHeader> 

            <ProgressBarWrapper>

                <ProgressBar 
                    radius={54}
                    progress={progress}
                    strokeWidth={5}
                    strokeColor="#5c85cd"
                    trackStrokeWidth={5}
                />

                <ProgressBarTextWrapper>    
                    <ProgressBarText>
                        {progressText}
                    </ProgressBarText>
                    
                    <ProgressBarSubtext>
                        used
                    </ProgressBarSubtext>
                </ProgressBarTextWrapper>

            </ProgressBarWrapper>

            <ChartDescription>
                <ChartDescriptionText>
                    {description}
                </ChartDescriptionText>
            </ChartDescription>

        </Chart>

    )

}

const ProgressBarSubtext = styled.span `
    font-weight: 300;
    font-size: 14px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #878D95;
`;

const ProgressBarText = styled.span `
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;

    font-weight: 400;
    font-size: 20px;
`;

const ProgressBarTextWrapper = styled.div `
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    z-index: 2;
`;

const ProgressBarWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;

    width: 100%;
`;

const ChartDescriptionText = styled.span `
    font-size: 12px;
    line-height: 18px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #CCD1D9;
`;

const ChartDescription = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;

    width: 1000%;
`;

const ChartHeading = styled.span `
    font-weight: 500;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #CCD1D9;
`;

const ChartHeader = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;

    width: 100%;
`;

const Chart = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;

    row-gap: 8px;
    width: 100%;
`;