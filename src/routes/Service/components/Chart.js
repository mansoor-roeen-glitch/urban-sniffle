import React from 'react'
import ProgressBar from 'react-customizable-progressbar'
import styled from 'styled-components';

export default function Chart({heading, total, usage, text}) {
  
  // Usage Progress for chart and text
  const progress = Math.floor((usage / total) * 100);
  
  return (

    <ChartWrapper>
      
      <ChartHeader>
        <ChartHeading>
          {heading}
        </ChartHeading>
        <ChartSubHeader>
          {Math.round(usage / 1048576)} GB / {Math.round(total / 1048576)} GB used
        </ChartSubHeader>
      </ChartHeader>
      
      <ProgressBarWrapper>
        <ProgressTextWrapper>
          <ProgressText>{progress}%</ProgressText>
        </ProgressTextWrapper>
        <ProgressBar

            radius={65}
            progress={progress}
            strokeWidth={10}
            strokeColor="#a183c7"
            strokeLinecap="square"
            trackStrokeWidth={4}
            trackStrokeColor="#494953"
            initialAnimation

        />
      </ProgressBarWrapper>
    </ChartWrapper>
  )
}

const ProgressTextWrapper = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressText = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 900;
    font-size: 25px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFC;

`;

const ChartSubHeader = styled.span `
  
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #C6CBD1;

`;

const ChartHeading = styled.span `
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #A183C7;
`;

const ChartWrapper = styled.div `
  padding: 5px 10px;
  background: #131921;
  width: 200px;
  border-radius: 3px;
  
  display: flex;
  flex-direction: column;
  align-items: center;

  filter: drop-shadow(0px 0px 1px #3F4041);
`;

const ChartHeader = styled.div `
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 13.5px;

  &::after {
    content: "";
    width: 200px;
    height: 1px;
    position: absolute;
    bottom: 0px;
    background: #32363A;
  }
`;

const ProgressBarWrapper = styled.div `
  display: flex;
  justify-content: center;
  text-align: center;
  width: fit-content;
  height: fit-content;
`;