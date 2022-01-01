import React from 'react'
import styled from 'styled-components'
import SvgIcon from '../icons/SvgIcon'
import PrimaryOption from './PrimaryOption';

export default function PrimaryDropdown({heading, options, selected, onChange}) {

    const [isActive, setIsActive ] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(selected)

    const handleClick = (event) => {
        setIsActive(!isActive)
    }

    const handleOptionClick = (option, index) => {
        setIsActive(!isActive)
        setSelectedOption(index)
        onChange(index)
    }

    window.onclick = (event) => {
        if (!event.target.classList.contains('primary-dropdown')) {
            setIsActive(false)
        }
    }

    return (
        <Wrapper>
            <HeadingWrapper>
                <StyledHeading>
                    {heading}
                </StyledHeading>    
            </HeadingWrapper>        
            <ContentWrapper onClick={handleClick} className="primary-dropdown">
                <ContentTextWrapper>
                    <ContentText>
                        { options[selectedOption].name }
                    </ContentText>
                </ContentTextWrapper>
                <ContentSvgWrapper>
                    <ContentSvg>
                        <SvgIcon width="16px" height="16px" path="/images/arrow-bottom.svg" alt="arrow bottom" />
                    </ContentSvg>
                </ContentSvgWrapper>
            </ContentWrapper>
            {isActive && (
                <DropdownMenuWrapper>
                    <DropDownMenu>
                        { options && options.map((option, index) => {
                            return (
                                <DropdownButton onClick={() => {handleOptionClick(option, index)}}>
                                    <PrimaryOption option={option} isOptionInLastPosition={index +1 === options.length} />
                                </DropdownButton>
                            )

                        } )}
                    </DropDownMenu>
                </DropdownMenuWrapper>
            )}
        </Wrapper>
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
    width: 100%;
    height: fit-content;
    position: absolute;
    
    background: #11161f;
    border-radius: 2px;
    z-index: 2;

    top: 83px;
`;

const ContentSvgWrapper = styled.div `
    height: fit-content;
    width: fit-content;
`;

const ContentSvg = styled.div `
    height: fit-content;
    width: fit-content;
`

const StyledHeading = styled.span `
    font-size: 0.9rem;
    font-weight: 500;
    color: #7b8187;
    opacity: .9;
    text-transform: uppercase;
`;

const ContentText = styled.span `
    font-size: 1rem;
    font-weight: 300;
    font-style: normal;
    color: var(--white);
    opacity: .85;
`;

const ContentTextWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const ContentWrapper = styled.div `
    height: 42px;

    width: 100%;
    border-radius: 3px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    cursor: pointer;
    background-color: #11161f;
`;

const HeadingWrapper = styled.div `
    height: fit-content;
    width: 100%;

    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Wrapper = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 14px;
`; 