// Importing Dependencies
import React from 'react';
import styled from 'styled-components';
import ChartTypeB from '../../../components/charts/ChartTypeB';

// Importing Components
import Svg from '../../../components/icons/SvgIcon';


export default function ServerStatisticsComponent() {
    

    // React State Variables 
    const [isDropdownActive, setIsDropdownActive] = React.useState(false)
    const [selectedDropdownOption, setSelectedDropdownOption] = React.useState(0)

    // Component Variables
    
    const dropdownOptions = [
        {
            optionText: 'Local Host'
        },
        {
            optionText: 'Random Server '
        }
    ]

    const charts = [
        {
            heading: "CPU",
            progressText: "32%",
            description: "1 GB / 20 GB used",

            progress: 32,
        },
        {
            heading: "Disk",
            progressText: "35%",
            description: "3 GB / 20 GB used",

            progress: 35,
        },
        {
            heading: "Ram",
            progressText: "39%",
            description: "1 GB / 20 GB used",

            progress: 39,
        },
        {
            heading: "Storage",
            progressText: "12%",
            description: "1 GB / 20 GB used",

            progress: 12,
        },
        {
            heading: "Bandwidth",
            progressText: "85%",
            description: "1 GB / 20 GB used",

            progress: 85,
        }
    ]


    // Functions ^^
    const handleDropdownClick = () => setIsDropdownActive(!isDropdownActive)
    
    const handleOptionClick = (index) => {
        setSelectedDropdownOption(index)
        setIsDropdownActive(false)
    }


    // JSX For Render
    return (
        
        <Wrapper>

            <Header>

                <HeadingWrapper>
                    <Heading>
                        Server Statistics
                    </Heading>
                </HeadingWrapper>

                <Dropdown>

                    <DropdownButton onClick={handleDropdownClick}>

                        <DropdownButtonText>
                            - {dropdownOptions[selectedDropdownOption].optionText} -
                        </DropdownButtonText>

                        <DropdownButtonIcon>
                            <Svg width={14} height={14} path='/images/general/arrow-down-icon.svg' />
                        </DropdownButtonIcon>

                    </DropdownButton>

                    <DropdownList isDropdownActive={isDropdownActive}>
                        
                        {dropdownOptions.map((option, index) => (

                            <DropdownListItem>
                                <DropdownItemButton onClick={() => handleOptionClick(index) } > 

                                    <DropdownButtonText>
                                        {option.optionText}
                                    </DropdownButtonText>

                                </DropdownItemButton>
                            </DropdownListItem>

                        ))}

                    </DropdownList>

                </Dropdown>

            </Header>

            <ChartsWrapper>
                <ChartGrid>

                    {charts.map((chart, index) => (

                        <ChartTypeB 
                            key={index}
                            heading={chart.heading}
                            progress={chart.progress}
                            description={chart.description}
                            progressText={chart.progressText}
                        />

                    ))}

                </ChartGrid>
            </ChartsWrapper>

        </Wrapper>

    )

}

const ChartGrid = styled.div `
    display: grid;
    
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const ChartsWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 48px;
    width: 98%;
`;

const DropdownItemButton = styled.button `
    width: 100%;
    height: 100%;
    
    background: transparent;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const DropdownListItem = styled.li `
    width: 100%;
    height: 32px;
`;

const DropdownList = styled.ul `
    width: 100%;
    padding: 10px 15px;
    top: 35px;
    
    display: ${props => props.isDropdownActive ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    background: #171D25;
    list-style: none;
`;

const DropdownButtonIcon = styled.div `
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DropdownButtonText = styled.span `
    font-size: 14px;
    
    font-weight: normal;
    font-style: normal;
    align-items: center;
    display: flex;
    color: #CDD1D7;
`;

const DropdownButton = styled.button `
    width: 100%;
    height: 100%;
    padding: 0px 15px;

    background: transparent;
    justify-content: space-between;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Dropdown = styled.div `
    display: flex;
    flex-direction: column;
    background-color: #171D25;
    
    height: 32px;
    width: 360px;
    z-index: 2;
`;

const Heading = styled.span `
    font-weight: 500;
    font-size: 18px;

    color: #CCD1D9;
`;

const HeadingWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
`;

const Header = styled.div `
    width: 96%;
    
    display: flex;
    justify-content: space-between;
    height: fit-content;
`;

const Wrapper = styled.div `
    width: 100%;
    height: 380px;
    border-radius: 7px;
    padding: 25px 0px 0px;

    background: #10151B;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
