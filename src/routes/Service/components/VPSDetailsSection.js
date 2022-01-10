import React from 'react'
import styled from 'styled-components';
import Svg from '../../../components/icons/SvgIcon'

export default function VPSDetailsSection({list, heading}) {
    return (

        <ContentSectionWrapper>

            <ContentSectionHeader>

                <ContentSectionHeading>{heading}</ContentSectionHeading>
                
                <ContentSectionHeaderSvg> 
                    
                    <Svg path="/images/edit.svg" width={18} height={18} /> 
                    
                </ContentSectionHeaderSvg>
                
            </ContentSectionHeader>

            <ContentSectionGrid>
                
                {list.map((item, index) => {

                    return (

                        <GridItem key={index}>

                            <GridItemIcon>
                                <Svg path={item.svg} width={26} height={26} />
                            </GridItemIcon>
                            
                            <GridItemContent>

                                <GridItemHeading>{item.heading}</GridItemHeading>
                                <GridItemValue>{item.value}</GridItemValue>
                                
                            </GridItemContent>

                        </GridItem>

                    )

                })}

            </ContentSectionGrid>

        </ContentSectionWrapper>
    )
}


const GridItemValue = styled.span `

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #727880;

`;

const GridItemHeading = styled.span `

    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: #c4c8cd;

`;

const GridItemContent = styled.div `
    
    display: flex;
    flex-direction: column;

`;

const GridItemIcon = styled.div `
    
    height: fit-content;
    width: fit-content;
    align-items: center;
    justify-content: center;

`;

const GridItem = styled.div `

    width: auto;
    height: fit-content;

    display: flex;
    column-gap: 20px;

    align-items: center;

`;

const ContentSectionGrid = styled.div `

    width: 100%;
    height: fit-content;

    display: grid;
    row-gap: 26px;
    column-gap: 26px;

    grid-template-columns: repeat(5, 1fr);

`;

const ContentSectionHeaderSvg = styled.div `
    
    height: 100%;
    display: flex;
    width: fit-content;
    align-items: flex-start;
    justify-content: center;

`;

const ContentSectionHeading = styled.span `

    font-weight: 500;
    font-size: 24px;
    margin-right: 15px;

    font-style: normal;
    display: flex;
    align-items: center;
    color: #D0D5DC;

`;

const ContentSectionHeader = styled.div `
    
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: flex-start;

`;

const ContentSectionWrapper = styled.div `

    width: 100%;
    row-gap: 35px;

    height: fit-content;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 40px;
`;