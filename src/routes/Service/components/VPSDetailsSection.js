import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Svg from '../../../components/icons/SvgIcon'

export default function VPSDetailsSection({ list, heading, editPath }) {

    return (

        <ContentSectionWrapper>

            <ContentSectionHeader>

                <ContentSectionHeading>{heading}</ContentSectionHeading>
                
                <ContentSectionHeaderSvg> 
                    
                    <ContentSectionHeaderSvgWrapper>
                        <Link to={editPath} style={{width: "fit-content", height: "fit-content"}}>
                            <Svg path="/images/edit.svg" width={16} height={16} /> 
                        </Link>
                    </ContentSectionHeaderSvgWrapper>

                </ContentSectionHeaderSvg>
                
            </ContentSectionHeader>

            <ContentSectionGrid>
                
                {list.map((item, index) => {

                    return (

                        <GridItem key={index}>

                            <GridItemIcon>
                                <Svg path={item.svg} width={20} height={20} />
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
    font-size: 15px;
    display: flex;
    align-items: center;
    color: #686b6e;

`;

const GridItemHeading = styled.span `

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #bdc2c9;

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

const ContentSectionHeaderSvgWrapper = styled.div `

    height: fit-content;
    width: fit-content;

    cursor: pointer;

    &:hover {
        opacity: .9;
    }

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
    font-size: 18px;
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
    row-gap: 22px;

    height: fit-content;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 50px;
`;