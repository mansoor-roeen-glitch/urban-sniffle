// Dependencies
import React, {useState} from 'react'
import styled from 'styled-components'
import Svg from '../../../../components/icons/SvgIcon';
import { checkMachineStatus, getExtraActions } from '../functions/extraFunctions';

export default function Component ({...props}) {
    
    const {
        handleAction,
        hostname,
        status,
    } = props;

    // Component States
    const [extraMachineActions, setExtraMachineActions] = useState(getExtraActions(status));

    const statusTextColor = (machineStatus) => {
        if (machineStatus === 'active') {
            return '#46E857';
        } else if (machineStatus === 'not_active') {
            return '#A75F5F';
        } else if (machineStatus === 'pending') {
            return '#E0C745';
        }
    }

    let vpsDetails = [ 
        
        {
            name: "Status",
            value: status,
            color: statusTextColor(checkMachineStatus(status)),          
        },
        {
            name: "IP address",
            value: "127.0.0.1"
        },
        {
            name: "Hostname",
            value: hostname
        }

    ]

    // Component Functions
    const handleActionClick = (action) => handleAction(action);
    

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

                                <VPSDetailValue textColor={VPSItem.name.toLowerCase() === "status" ? VPSItem.color : false} >
                                    {VPSItem.value}
                                </VPSDetailValue>
                                
                            </VPSDetailWrapper>

                        )
                    })}

                </VPSDetailsList>

            </VPSDetails>   

            <VPSButtons>
                
                <VPSButtonsList>
                    
                    {extraMachineActions.map((actionButton, index) => {
                        
                        return (

                            <VPSButtonWrapper key={index}>

                                <VPSButton onClick={() => {handleActionClick(actionButton.action)}}>

                                    <Svg path={`/images/${actionButton.file}`} width={35} height={35} />
                                    <VPSButtonLabel>{actionButton.label}</VPSButtonLabel>

                                </VPSButton>

                            </VPSButtonWrapper>

                        )

                    })}

                </VPSButtonsList>

            </VPSButtons>

            <VPSTemplateWrapper>

                <VPSTemplate>

                    <VPSTemplateSvgWrapper>
                        <Svg path="/images/centOs.svg" width={45} height={45} />
                    </VPSTemplateSvgWrapper>

                    <VPSTemplateTextWrapper>
                        <VPSTemplateText> CentOs 8 </VPSTemplateText>
                    </VPSTemplateTextWrapper>

                </VPSTemplate>

            </VPSTemplateWrapper>

        </VPSDetailsWrapper>
    )
}


const VPSButtonLabel = styled.span `
    font-weight: 400;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #aeb3bb;
`;

const VPSTemplateText = styled.span `
    font-weight: 400;
    font-size: 16px;

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

    border-radius: 6px;
    align-items: center;
    justify-content: center;
`;

const VPSButton = styled.button `
    width: 100%;
    height: 100%;
    row-gap: 15px; 

    background: transparent;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    cursor: pointer;

    border-left: ${props => props.hasBorders ? 'solid 5px #0d1117' : 'none'};
    border-right: ${props => props.hasBorders ? 'solid 5px #0d1117' : 'none'};

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
    grid-template-columns: 1fr 1fr 1fr;

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

    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;

    color: ${props => props.textColor ? props.textColor : "#DFE1E2"};

`;

const VPSDetailName = styled.span `

    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;

    color: #949CA8;

`;

const VPSDetailWrapper = styled.li `
    text-decoration: none;
    display: flex;
    align-items: center;
    column-gap: 7px;
`;

const VPSDetailsList = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
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
    grid-template-rows: 126.25px; 
    margin-bottom: 30px;
    grid-column-gap: 30px;
`;
