import React from 'react'
import SvgIcon from "../icons/SvgIcon"
import Features from './Features';
import {
    
    OuterWrapper,
    InnerWrapper,
    LeftWrapper,
    RightWrapper,
    StyledLogo,
    StyledTitle,
    StyledList,
    StyledItem

} from './StyledHeader';

export default function Header() {

    let [featuresBtn, setFeaturesBtn] = React.useState(false);
    let [profileBtn, setProfileBtn] = React.useState(false);
    let [notificationBtn, setNotificationBtn] = React.useState(false);
    
    let navbarItems = [
        {
            src: "features.svg",
            name: "features button", 
            action: setFeaturesBtn,
            width: "26px",
            height: "25px"
        },
        {
            src: "bell.svg",
            name: "Notifications button", 
            action: setNotificationBtn,
            width: "30px",
            height: "30px"

        },
        {
            src: "profile.svg",
            name: "Profile button", 
            action: setProfileBtn,
            width: "30px",
            height: "30px"

        }
    ]

    return (
        <OuterWrapper>
            <InnerWrapper>

                <LeftWrapper href="/">
                    <div>
                        <StyledLogo src="/images/favicon.ico"></StyledLogo>
                    </div>
                    <div>
                        <StyledTitle>Dashboard</StyledTitle>
                    </div>
                </LeftWrapper>

                <RightWrapper>
                    <StyledList>       
                        
                        {navbarItems.map((item, index) => {
                            return (
                                <StyledItem key={index} onClick={() => {item.action(args => !args)}} >
                                    <SvgIcon width={item.width} height={item.height} path={`/images/${item.src}`} alt={item.name} />
                                </StyledItem>
                            )
                        })}

                        <Features active={featuresBtn} />

                    </StyledList>
                </RightWrapper>

            </InnerWrapper>

        </OuterWrapper>
    )
}
