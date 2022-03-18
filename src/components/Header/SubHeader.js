import React from 'react'
import styled from 'styled-components'

export default function Header({
    
    path,
    pathName,
    loading, 
    serviceNotActivated

    }) {

    return (
        <Wrapper shouldHaveMarginBottom={!serviceNotActivated} loading={loading}>
            <InnerWrapper>
                <ContentWrapper>
                    <ProfileWrapper>
                        <StyledImage>    
                            <svg width="20" height="20" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 0C7.61175 0 0 7.61175 0 17C0 26.3882 7.61175 34 17 34C26.3882 34 34 26.3882 34 17C34 7.61175 26.3882 0 17 0ZM17 31.1667C12.5757 31.1667 8.62183 29.1252 6.02225 25.9392C6.38917 25.1062 7.1315 24.5296 8.66717 24.174C11.8462 23.4402 14.9841 22.7842 13.4739 20.0019C9.00433 11.7569 12.2003 7.08333 17 7.08333C21.7062 7.08333 24.9815 11.5841 20.5261 20.0019C19.0598 22.7673 22.0844 23.4246 25.3328 24.174C26.8657 24.5282 27.6137 25.1019 27.9834 25.9321C25.3824 29.1238 21.4271 31.1667 17 31.1667Z" fill="white" fillOpacity="0.85"/>
                            </svg>
                        </StyledImage>

                        <StyledUsernameWrapper>
                            <StyledUserName>
                                Hostler
                            </StyledUserName>
                        </StyledUsernameWrapper>

                        <StyledArrow>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#ba97e4"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
                        </StyledArrow>

                    </ProfileWrapper>

                    {/* if Path */}
                    {path ? (
                        <PathWrapper>
                            <PathText>
                                {pathName}
                            </PathText>
                        </PathWrapper>
                    ) : null}

                </ContentWrapper>
            </InnerWrapper>
        </Wrapper>
    )
}

const PathWrapper = styled.div `
    align-items: center;
    justify-content: center;
    margin-left: 12px;
`

const PathText = styled.span `
    font-weight: normal;
    font-size: 1rem;
    color: var(--primary-white);

    display: flex;
    align-items: center;
    opacity: .8;
    font-weight: 300;
`;

const StyledArrow = styled.div `
    height: auto;
    width: auto;

    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledUsernameWrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    
`;

const StyledUserName = styled.span `
    color: var(--primary-purple);
    font-size: 1rem;
    font-weight: 400;
`;

const ContentWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    display: flex;
    align-items: center;
`;

const ProfileWrapper = styled.div `
    height: fit-content;
    width: fit-content;
    background: "transparent";

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImage = styled.div `
    margin-right: 12px;
    align-items: center;
    display: flex;
    justify-content: center;

    * {

        fill: var(--primary-purple);
    }
`;

const Wrapper = styled.div `
    z-index: 2;
    width: 100%;
    height: 55px;
    padding-left: 172px;
    background: var(--secondary-background);

    display: flex;
    align-items: center;
    justify-content: center;

    filter: drop-shadow(0px 7px 4px #0D1117);

    &::after {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background: ${props => props.loading ? '#46484F' : "transparent"};
    }

    &::before {
        content: "";
        position: absolute;
        bottom: 0px;
        width: 40%;
        height: 1px;
        background: ${props => props.loading ? '#787E91' : "transparent"};
        animation: loadingAnim 2s ease infinite ;
        z-index: 2;
    }

    @keyframes loadingAnim {
        0% {
            left: -40%;
        }
        100% {
            left: 100%;
        }
    }
`;

const InnerWrapper = styled.div `
    width: 95%;
    max-width: 2000px;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
