// Importing Dependencies 
import React from 'react';
import styled from 'styled-components';

// Importing Components
import Svg from '../../../components/icons/SvgIcon';


export default function GridItemTypeA({heading, value, iconSize, iconPath}) {
  
    // Component Variables
    const {iconHeight, iconWidth} = iconSize

    return (

        <Wrapper>
            
            <ItemContent>

                <ItemHeading>
                    {heading}
                </ItemHeading>

                <ItemValue>
                    {value}
                </ItemValue>

            </ItemContent>

            <ItemIcon>
                
                <Svg 

                    width={iconWidth}
                    height={iconHeight}

                    path={`/images/adminDashboard/${iconPath}`}

                />

            </ItemIcon>

        </Wrapper>

    )

}


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
    font-weight: 500;
`;

const ItemHeading = styled.span `
    color: #848b95;
    
    font-size: 16px;
    font-weight: 300;
`;

const ItemContent = styled.div `
    display: flex;
    width: fit-content;
    height: fit-content;
    flex-direction: column;
`;

const Wrapper = styled.div `
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: space-between;
    background: #10151b;

    width: 100%;
    height: 100%;
    padding: 0px 22px;
    border-radius: 10px;
`;
