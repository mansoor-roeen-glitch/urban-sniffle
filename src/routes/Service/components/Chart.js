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
          
          <ChartSubHeaderTop>
        
            <ChartSubHeaderTopLeft>{progress}%</ChartSubHeaderTopLeft>
            <ChartSubHeaderTopRight>Used</ChartSubHeaderTopRight>
        
          </ChartSubHeaderTop>  
          
          <ChartSubHeaderBottom>
            {usage} GB out of {parseInt(total / 1048576)} GB used
          </ChartSubHeaderBottom>
        
        </ChartSubHeader>

      </ChartHeader>
      
      <ProgressBarWrapper>

        <ProgressTextWrapper>

          <ProgressText> {progress}% </ProgressText>
          <SubProgressText>used</SubProgressText>

        </ProgressTextWrapper>

        <ProgressBar

            radius={50}
            progress={progress}
            strokeWidth={7}
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

const SubProgressText = styled.span `
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #878D95;
`;

const ProgressTextWrapper = styled.div `
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProgressText = styled.span `
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;

`;

const ChartSubHeaderBottom = styled.span `  
  font-family: "Roboto";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  display: flex;
  align-items: center;

  color: #b6bac1;

`;

const ChartSubHeaderTopRight = styled.span `
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  display: flex;
  align-items: center;

  color: #b6bac1;

`; 

const ChartSubHeaderTopLeft = styled.span `
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  display: flex;
  align-items: center;

  color: #BB83C0;

`;

const ChartSubHeaderTop = styled.div `
  display: flex;
  column-gap: 7px;
  height: fit-content;
  align-items: baseline;
`;

const ChartSubHeader = styled.span `
  
  display: flex;
  flex-direction: column;

`;

const ChartHeading = styled.span `
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  display: flex;
  align-items: center;

  color: #E2E6ED;

`;

const ChartHeader = styled.div `
  display: flex;
  flex-direction: column;
  row-gap: 7px;
`;

const ProgressBarWrapper = styled.div `
  display: flex;
  justify-content: center;
  text-align: center;
  width: fit-content;
  height: fit-content;
`;

const ChartWrapper = styled.div `
  background: #10151b;
  width: auto;
  border-radius: 3px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 30px;

`;
