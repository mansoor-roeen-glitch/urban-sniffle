import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Svg from '../../../../components/icons/SvgIcon'

export default function VPSDetailsSection({list, heading, updatePath, isEditable}) {

    // map through the list and return Grid Item
    const mapList = () => {
        return list.map((item, index) => {
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
        })
    }

    // this function will see if grid is editable or not
    // if is then return the svg, otherwise don't
    const renderIcon = () => {
        if (!isEditable) return null;
        return (
            <HeaderSvgWrapper> 
                <HeaderSvg>
                    <Link to={updatePath} style={{width: "fit-content", height: "fit-content"}}>
                        <Svg path="/images/edit.svg" width={16} height={16} /> 
                    </Link>
                </HeaderSvg>
            </HeaderSvgWrapper>
        )
    }

    return (

        <Wrapper>
            <Header>
                <Heading>{heading}</Heading>
                {renderIcon()}
            </Header>

            <GridWrapper>
                {mapList()}
            </GridWrapper>
        </Wrapper>
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

const GridWrapper = styled.div `

    width: 100%;
    height: fit-content;

    display: grid;
    row-gap: 26px;
    column-gap: 26px;

    grid-template-columns: repeat(5, 1fr);

`;

const HeaderSvg = styled.div `

    height: fit-content;
    width: fit-content;

    cursor: pointer;

    &:hover {
        opacity: .9;
    }

`;

const HeaderSvgWrapper = styled.div `
    
    height: 100%;
    display: flex;
    width: fit-content;
    align-items: flex-start;
    justify-content: center;

`;

const Heading = styled.span `

    font-weight: 500;
    font-size: 18px;
    margin-right: 15px;

    font-style: normal;
    display: flex;
    align-items: center;
    color: #D0D5DC;

`;

const Header = styled.div `
    
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: flex-start;

`;

const Wrapper = styled.div `

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