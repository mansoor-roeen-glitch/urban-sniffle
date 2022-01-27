// Importing Dependencies
import React from 'react';
import styled from 'styled-components';

// Importing Components
import Svg from '../../../components/icons/SvgIcon';


export default function GridItemTypeB({iconSize, heading, iconPath, used, available, textValue}) {
  
    // Component Variables 
    const {iconWidth, iconHeight} = iconSize;


    // JSX For Render 

    return (

        <Wrapper>
            
            <ContentWrapper>

                <ItemContent>

                    <ItemHeading>
                        {heading}
                    </ItemHeading>

                    <ItemValue>
                        {textValue}
                    </ItemValue>

                    </ItemContent>
                
                <ItemContent/>

                <ItemIcon>
                    
                    <Svg 

                        width={iconWidth}
                        height={iconHeight}

                        path={`/images/adminDashboard/${iconPath}`}

                    />

                </ItemIcon>

            </ContentWrapper>

            <ProgressBarWrapper>
                <ProgressBar />
            </ProgressBarWrapper>

            <DescriptionWrapper>
                <Description>
                    {used} / {available} MB Used
                </Description>
            </DescriptionWrapper>

        </Wrapper>

    )

}


const ProgressBar = styled.div `
    height: 3px;
    width: 100%;

    background: #35303a;
`;

const ProgressBarWrapper = styled.div `
    width: 100%;
    margin: 20px 0px;
    
    height: fit-content;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;

    &::after {
        height: 3px;
        width: 25%;
        transition: width .3s ease;
        
        content: '';
        background: #758397;

        position: relative;
        z-index: 2;
    }
`;

const Description = styled.span `
    color: #a4a9b1;

    font-size: 14px;
`;

const DescriptionWrapper = styled.div `
    width: 100%;
    margin-top: 20px;
    border-top: solid 1px #273446;

    display: flex;
    height: fit-content;

    padding-top: 15px;
`;

const ContentWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: fit-content;

    width: 100%;
`;

const ItemIcon = styled.div `
    display: flex;
    width: fit-content;
    height: fit-content;
    align-items: center;
    justify-content: center;
`;

const ItemValue = styled.span `
    color: #e3e3e4;
    
    font-size: 18px;
    font-weight: 400;
`;

const ItemHeading = styled.span `
    color: #9a9ea6;
    
    font-size: 18px;
    font-weight: 300;
`;

const ItemContent = styled.div `
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
    align-self: flex-end;

`;

const Wrapper = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #10151b;

    width: 100%;
    height: 100%;
    padding: 20px 22px;
    border-radius: 10px;
`;
