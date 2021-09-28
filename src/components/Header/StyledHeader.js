import styled from "styled-components";

const OuterWrapper = styled.header `
    background: transparent;
    width: 100vw;
    height: auto;
    padding-top: 15px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 12px;

    &::after {
        content: "";
        position: absolute;
        bottom: -12px;
        width: 100%;
        height: 4px;
        background: linear-gradient(to right, rgb(159,125,195), #8ECBE9);
    }
`;

const InnerWrapper = styled.nav `
    width: 95%;
    height: 65px;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LeftWrapper = styled.a`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    column-gap: 10px;
    text-decoration: none;
`;

const RightWrapper = styled.div `
    width: fit-content;
    height: fit-content;
`;

const StyledLogo = styled.img `
    width: 48px;
    height: 40px;
`;

const StyledTitle = styled.span `
    font-size: 26px;
    line-height: normal;
    text-decoration: none;
    font-family: "Josefin Sans", "Roboto", sans-serif;
    font-weight: 300;
    color: var(--primary-white);

    @media screen and (max-width: 600px) {
        display: none;
    }
`;

const StyledList = styled.ul `
    display: flex;
    list-style: none;
    column-gap: 28px;
    align-items: center;
`;

const StyledItem = styled.button `

    background: transparent;
    width: fit-content;
    height: fit-content;
    
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        opacity: .8;
    }

`;

export {
    OuterWrapper,
    InnerWrapper,
    LeftWrapper, 
    RightWrapper,
    StyledLogo,
    StyledTitle,
    StyledList,
    StyledItem
}   