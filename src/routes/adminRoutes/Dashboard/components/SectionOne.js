// Importing Dependencies 
import React from 'react';
import styled from 'styled-components';

// Importing Components
import GridItemTypeA from './GridItemTypeA';
import GridItemTypeB from './GridItemTypeB';


export default function SectionOneComponent() {
  return (

    <SectionOne>

        <SectionOneLeft>
            
            <SectionOneLeftTop>

                <GridItemTypeA
                    heading='VPS Count'
                    value='205'
                    iconPath='vps-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

                <GridItemTypeA
                    heading='Templates'
                    value='3'
                    iconPath='template-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

                <GridItemTypeA
                    heading='Free IPV4 IPs'
                    value='12'
                    iconPath='ipv4-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

            </SectionOneLeftTop>
            
            <SectionOneLeftBottom>
                
                <GridItemTypeA
                    heading='Users Count'
                    value='25'
                    iconPath='users-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

                <GridItemTypeA
                    heading='Clusters Count'
                    value='1'
                    iconPath='vps-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

                <GridItemTypeA
                    heading='Free IPV6 IPs'
                    value='118'
                    iconPath='ipv4-icon.svg'
                    iconSize={{
                        iconWidth: 25,
                        iconHeight: 25,
                    }}
                />

            </SectionOneLeftBottom>

        </SectionOneLeft>


        <SectionOneRight>

            <GridItemTypeB
                heading='Cluster Ram'
                textValue='NAN%'
                iconPath='cluster-ram-icon.svg'
                
                used='Nan'
                available='Nan'
                iconSize={{
                    iconWidth: 30,
                    iconHeight: 30,
                }}
            />

            
            <GridItemTypeB
                heading='Cluster Ram'
                textValue='NAN%'
                iconPath='cluster-ram-icon.svg'
                
                used='Nan'
                available='Nan'
                iconSize={{
                    iconWidth: 30,
                    iconHeight: 30,
                }}
            />

        </SectionOneRight>

    </SectionOne>

  )
}


const SectionOneLeftBottom = styled.div `
    height: auto;
    display: grid;
    
    width: 100%;
    column-gap: 25px;
    grid-template-columns: 1.2fr 1.2fr 2fr;
`;

const SectionOneLeftTop = styled.div `
    height: auto;
    display: grid;
    
    width: 100%;
    column-gap: 25px;
    grid-template-columns: 1.2fr 1.2fr 2fr;
`;

const SectionOneRight = styled.div `
    width: auto;
    display: grid;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 190px;
    column-gap: 25px;
`; 

const SectionOneLeft = styled.div `
    width: auto;
    display: grid;
    
    grid-template-rows: 85px 85px;
    grid-template-columns: 1fr;
    row-gap: 25px;
`;

const SectionOne = styled.div `
    display: grid;
    height: fit-content;

    width: 100%;
    grid-column-gap: 25px;
    grid-template-columns: 3fr 2fr;
`;