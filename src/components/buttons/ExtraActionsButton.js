import React from 'react'
import styled from 'styled-components';

export default function ExtraActionsButton () {

    const [isActive, setIsActive] = React.useState(false);

    const handleButtonClick = () => {
        setIsActive(!isActive);
    }

    React.useEffect(() => {

    }, [])


    return (
        <ExtraActionsButtonWrapper onClick={handleButtonClick}>
                        
            <ExtraActionsText>
                Extra Actions
            </ExtraActionsText>
            
            <ExtraActionsSvg>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 4.27583L1.65025 2.625L7.00233 8.07275L12.3497 2.625L14 4.27583L7.00233 11.375L0 4.27583Z" fill="#8C929B"/>
                </svg>
            </ExtraActionsSvg>

            <ExtraActionsDropdown isActive={isActive}>
                <ExtraActionsList>
                    <ExtraActionItem>
                        <ExtraActionItemText>
                            Reboot Service
                        </ExtraActionItemText>
                    </ExtraActionItem>
                    <ExtraActionItem>
                        <ExtraActionItemText>
                            Reset Service
                        </ExtraActionItemText>
                    </ExtraActionItem>
                    <ExtraActionItem>
                        <ExtraActionItemText>
                            Stop Service
                        </ExtraActionItemText>
                    </ExtraActionItem>
                    <ExtraActionItem>
                        <ExtraActionItemText>
                            Shutdown
                        </ExtraActionItemText>
                    </ExtraActionItem>
                </ExtraActionsList>
            </ExtraActionsDropdown>

        </ExtraActionsButtonWrapper>
    )
}

const ExtraActionItemText = styled.span `
    color: #C2C2C2;
    font-size: 17px;
    text-align: center;
    font-weight: 400;
`;

const ExtraActionItem = styled.li `
    height: 45px;
    margin: 0px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom-width: 0.5px;
    border-bottom-style: solid;
    border-bottom-color: #d8d3e51f;
    background-color: #13181F;

    &:hover {
        opacity: .8;
    }
`;

const ExtraActionsList = styled.ul `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
    width: 100%;
`;

const ExtraActionsDropdown = styled.div `
    width: 100%;
    height: fit-content;
    position: absolute;
    
    background: var(--primary-background);
    box-shadow: 0 3px 20px rgb(255 255 255 / 3%), 0 1px 2px rgb(0 0 0 / 3%), 0 0 0 1px rgb(255 255 255 / 10%);
    border-radius: 2px;
    z-index: 2;

    bottom: 57px;
    display: ${props => props.isActive ? "flex" : "none"};
`;

const ExtraActionsSvg = styled.div `
    width: fit-content;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ExtraActionsText = styled.span `
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #C2C2C2;

`;

const ExtraActionsButtonWrapper = styled.button `
    width: 170px;
    height: 45px;
    background: #13181F;
    border: 1px solid #3D3F42; 
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 2px;

    column-gap: 10px;
    cursor: pointer;
    position: relative;
`;