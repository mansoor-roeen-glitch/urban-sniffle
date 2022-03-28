// dependencies
import React, {useEffect, useState, useRef} from 'react'
import styled from 'styled-components'

// components
import SvgIcon from '../icons/SvgIcon'
import PrimaryOption from '../dropdowns/PrimaryOption'

export default function ManyToManyField({fieldData, updateFormField, index}) {

    // Component props
    let {ui, choices} = fieldData

    // Reference to Filter Select Wrapper
    const nodeRef = useRef();

	// Component States
    const [isDropdownActive, setIsDropdownActive] = useState(false)
    const [lastSelectedOption, setLastSelectedOption] = useState(choices[0]?.index)

    // toggle state of dropdown
    const handleDropdownToggle = () => setIsDropdownActive(!isDropdownActive);

    // get the list of selected options
    const getSelectedOptions = () => {
        if (Array.isArray(choices) && choices !== []) { 
            let result = '';
            choices.map(({label, isChecked}, index) => {
                if (isChecked) result = result + label + ', '
            })

            return result;
        }

        return '';
    }

    // updating selected option
    const updateSelectedOption = (index) => setLastSelectedOption(index);

    // render list of options for dropdown;
    const returnRenderList = () => {
        if (Array.isArray(choices) && choices !== []) {
            return choices?.map((option, optionIndex) => {
                return (
                    <DropdownButton onClick={() => {updateSelectedOption(optionIndex)}}>
                        <PrimaryOption option={option} isOptionInLastPosition={optionIndex +1 === choices.length} />
                    </DropdownButton>)
            })
        }

        return null;
    }

    // handle mousedown
    const handleClick = e => {
        if (nodeRef.current.contains(e.target)) return;
        // outside click 
        setIsDropdownActive(false)
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
        document.removeEventListener("mousedown", handleClick);
        };
    })

    // see if changes are made to selectedOption, if yes then do stuff
    useEffect(() => updateFormField({selectedOption: lastSelectedOption, fieldIndex: index}), [lastSelectedOption])


    return (
        <MainWrapper ref={nodeRef}>
            
            <HeadingWrapper>
                <StyledHeading>
                    {ui.label}
                </StyledHeading>    
                <Description>
                    {ui.description}
                </Description>
            </HeadingWrapper>        
            
            <ContentWrapper onClick={handleDropdownToggle}>
                <ContentTextWrapper>
                    <ContentText>
                        {getSelectedOptions()}
                    </ContentText>
                </ContentTextWrapper>
                <ContentSvgWrapper>
                    <ContentSvg>
                        <SvgIcon width="14px" height="14px" path="/images/general/dropdown-expand-icon.svg" alt="arrow bottom" />
                    </ContentSvg>
                </ContentSvgWrapper>
            </ContentWrapper>
            
            <DropdownMenuWrapper isDropdownActive={isDropdownActive}>
                <DropDownMenu>
                    {returnRenderList()} 
                </DropDownMenu>
            </DropdownMenuWrapper>

        </MainWrapper>
    )
}

const DropdownButton = styled.li `
    width: 100%;
    height: fit-content;

    cursor: pointer;
`;

const DropDownMenu = styled.ul `
    list-style: none;
    width: 100%;
    height: fit-content;
`;

const DropdownMenuWrapper = styled.div `
    height: fit-content;
    position: absolute;
    background: #10151c;
    border: solid 1px #242424;
    display: ${props => props.isDropdownActive ? 'initial' : 'none'};
    
    width: 100%;
    border-radius: 6px;
    z-index: 2;
    top: 83px;
    min-height: 100px;
`;

const ContentSvgWrapper = styled.div `
    height: fit-content;
    width: fit-content;
`;

const ContentSvg = styled.div `
    height: fit-content;
    width: fit-content;
`

const Description = styled.span `
    font-size: 0.8rem;
    font-weight: 300;

    color: #a5a9af;
    text-transform: capitalize;
`;

const StyledHeading = styled.span `
    font-weight: 400;
    color: rgb(186 193 203);
    font-size: 0.9rem;

    text-transform: capitalize;
`;

const ContentText = styled.span `
    font-size: 1rem;
    font-weight: 400;
    color: #d3d6db;
`;

const ContentTextWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const ContentWrapper = styled.div `
    height: 40px;
    width: 100%;
    border-radius: 6px;
    padding: 0px 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #10151c;
    border: solid 1px #323334;
    cursor: pointer;
`;

const HeadingWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;

    padding-left: 6px;
    column-gap: 8px;
`;

const MainWrapper = styled.div `
    width: auto;
    height: fit-content;
    display: flex;
    flex-direction: column;

    row-gap: 6px;
`; 