// Dependencies
import React, {useState} from 'react'
import styled from 'styled-components'
import Svg from '../../../../components/icons/SvgIcon';
import { checkMachineStatus, getExtraActions } from '../functions/extraFunctions';

export default function Component ({...props}) {
    
    const {handleAction, hostname, status} = props;

    // component states
    const [extraMachineActions, setExtraMachineActions] = useState(getExtraActions(status));

    // return the color based on machine status
    const statusTextColor = (machineStatus) => {
        if (machineStatus === 'active') {
            return '#46E857';
        } else if (machineStatus === 'not_active') {
            return '#A75F5F';
        } else if (machineStatus === 'pending') {
            return '#E0C745';
        }
    }

    // vps details
    const serviceDetails = [ 
        {name: "Status", value: status, color: statusTextColor(checkMachineStatus(status))},
        {name: "IP address" ,value: "127.0.0.1"},
        {name: "Hostname" ,value: hostname}
    ]

    // map through the details list
    // return detail key with detail value
    const mapDetailsList = () => {
        return serviceDetails.map((item, index) => {
            return (
                <ItemWrapper key={index}>
                    <DetailKey >
                        {item.name}: 
                    </DetailKey>

                    <DetailValue textColor={item.name.toLowerCase() === "status" ? item.color : false} >
                        {item.value}
                    </DetailValue>
                </ItemWrapper>
            )
        })
    }

    const mapActionsList = () => {
        return extraMachineActions.map((actionButton, index) => {
            console.log(actionButton)
            return (
                <ButtonWrapper key={index}>
                    <Button onClick={() => {handleActionClick(actionButton.action)}}>
                        <Svg path={`/images/${actionButton.file}`} width={35} height={35} />
                        <ButtonLabel>{actionButton.label}</ButtonLabel>
                    </Button>
                </ButtonWrapper>
            )

        })
    }

    // run the handleAction function with the action
    const handleActionClick = (action) => handleAction(action);
    
    return (

        <Wrapper>
            <DetailsWrapper>
                <DetailsList>
                    {mapDetailsList()}
                </DetailsList>
            </DetailsWrapper>   

            <ActionsWrapper>
                <ActionsList>
                    {mapActionsList()}
                </ActionsList>
            </ActionsWrapper>

            <TemplateWrapper>
                <Template>
                    <TemplateIcon>
                        <Svg path="/images/centOs.svg" width={45} height={45} />
                    </TemplateIcon>

                    <TemplateTextWrapper>
                        <TemplateText> CentOs 8 </TemplateText>
                    </TemplateTextWrapper>
                </Template>
            </TemplateWrapper>

        </Wrapper>
    )
}


const ButtonLabel = styled.span `
    font-weight: 400;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #aeb3bb;
`;

const TemplateText = styled.span `
    font-weight: 400;
    font-size: 16px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #D7DCE3;
`;

const TemplateTextWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
`;

const TemplateIcon = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Template = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    flex-direction: column;
    row-gap: 15px;

    border-radius: 6px;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button `
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

const ButtonWrapper = styled.li `
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionsList = styled.ul `
    
    height: 100%;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

`;

const TemplateWrapper = styled.div `
    width: auto;
    height: auto;
    background: #10151b;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionsWrapper = styled.div `
    height: auto;
    width: auto;
    background: #10151b;
`;

const DetailValue = styled.span `

    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;

    color: ${props => props.textColor ? props.textColor : "#DFE1E2"};

`;

const DetailKey = styled.span `

    font-weight: normal;
    font-size: 15px;
    display: flex;
    align-items: center;

    color: #949CA8;

`;

const ItemWrapper = styled.li `
    text-decoration: none;
    display: flex;
    align-items: center;
    column-gap: 7px;
`;

const DetailsList = styled.ul `
    list-style: none;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
`; 

const DetailsWrapper = styled.div `
    display: flex;
    width: auto;
    height: auto;
    background: #10151b;
    border-radius: 10px;

    display: flex;
    align-items: center;
    padding-left: 30px;
`;

const Wrapper = styled.div `
    display: grid;
    grid-template-columns: 1fr 1.5fr 0.5fr;
    grid-template-rows: 126.25px; 
    margin-bottom: 30px;
    grid-column-gap: 30px;
`;
