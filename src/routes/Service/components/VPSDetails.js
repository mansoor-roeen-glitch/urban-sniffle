import React from 'react'
import styled from 'styled-components'
import Svg from '../../../components/icons/SvgIcon';

export default function Component () {
    
    let vpsDetails = [ 
        
        {
            name: "Status",
            value: "Inactive",

            color: "A75F5F", 
            green: "46E857",
            red: "A75F5F",
            yellow: "E0C745",
            
        },
        {
            name: "IP address",
            value: "127.0.0.1"
        },
        {
            name: "Hostname",
            value: "test_hostname_1"
        }

    ]

    let buttons = [
        {
            file: "reboot_button.svg"
        },
        {
            file: "stop_button.svg"
        },
        {
            file: "power_button.svg"
        },
        {
            file: "delete_button.svg"
        }
    ]
    
    return (

        <VPSDetailsWrapper>

            <VPSDetails>
                
                <VPSDetailsList>

                    {vpsDetails.map((VPSItem, index) => {
                        return (

                            <VPSDetailWrapper key={index}>

                                <VPSDetailName >
                                    {VPSItem.name}: 
                                </VPSDetailName>

                                <VPSDetailValue textColor={VPSItem.name.toLowerCase() === "status" ? `#${VPSItem.color}` : false} >
                                    {VPSItem.value}
                                </VPSDetailValue>
                                
                            </VPSDetailWrapper>

                        )
                    })}

                </VPSDetailsList>

            </VPSDetails>   

            <VPSButtons>
                
                <VPSButtonsList>
                    
                    {buttons.map((actionButton, index) => {
                        
                        return (

                            <VPSButtonWrapper key={index}>

                                <VPSButton>

                                    <Svg path={`/images/${actionButton.file}`} width={55} height={55} />

                                </VPSButton>

                            </VPSButtonWrapper>

                        )

                    })}

                </VPSButtonsList>

            </VPSButtons>

            <VPSTemplateWrapper>

                <VPSTemplate>

                    <VPSTemplateSvgWrapper>
                        <Svg path="/images/centOs.svg" width={60} height={60} />
                    </VPSTemplateSvgWrapper>

                    <VPSTemplateTextWrapper>
                        <VPSTemplateText> CentOs 8 </VPSTemplateText>
                    </VPSTemplateTextWrapper>

                </VPSTemplate>

            </VPSTemplateWrapper>

        </VPSDetailsWrapper>
    )
}

const VPSTemplateText = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #D7DCE3;
`;

const VPSTemplateTextWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
`;

const VPSTemplateSvgWrapper = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const VPSTemplate = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    row-gap: 15px;

    align-items: center;
    justify-content: center;
`;

const VPSButton = styled.div `
    width: 100%;
    height: 100%;

    background: transparent;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:hover {
        opacity: .8;
    }
`;

const VPSButtonWrapper = styled.li `
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const VPSButtonsList = styled.ul `
    
    height: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

`;

const VPSTemplateWrapper = styled.div `
    width: auto;
    height: auto;
    background: #10151b;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const VPSButtons = styled.div `
    height: auto;
    width: auto;
    background: #10151b;
`;

const VPSDetailValue = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    display: flex;
    align-items: center;

    color: ${props => props.textColor ? props.textColor : "#DFE1E2"};

`;

const VPSDetailName = styled.span `
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    display: flex;
    align-items: center;

    color: #949CA8;

`;

const VPSDetailWrapper = styled.li `
    text-decoration: none;
    display: flex;
    align-items: center;
    column-gap: 5px;
`;

const VPSDetailsList = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`; 

const VPSDetails = styled.div `
    display: flex;
    width: auto;
    height: auto;
    background: #10151b;
    border-radius: 10px;

    display: flex;
    align-items: center;
    padding-left: 30px;
`;

const VPSDetailsWrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.5fr;
    grid-template-rows: 144px; 
    margin-bottom: 30px;
    grid-column-gap: 30px;
`;
