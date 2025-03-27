import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import LogoImage from '../../../assets/images/auxo-logo.png';
import LogoImageDark from '../../../assets/images/auxo-logo-darktheme.png';

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-12
    `}
`;

const SideBarLogoContainer = styled.div`
    ${tw`
        flex
        items-center
    `}
`;


const LogoContainerMobile = styled.div`
    ${tw`
        w-[150px] 
        h-[100px]
        flex 
        ml-6
        justify-center 
        items-center
    `}
`;

const ImageContainer = styled.div`
    ${tw`
        large:h-9
    `}
`; 


export function Logo() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <LogoContainerMobile>
                <ImageContainer>
                    <Link to="/">
                        <img src={LogoImage} alt="" style={{ width: 130.5, height: 36 }} />
                    </Link>
                </ImageContainer> 
            </LogoContainerMobile> 
        )
    }

    return (
        <LogoContainer>
            <ImageContainer>
                <Link to="/">
                    <img src={LogoImage} alt="" style={{ width: 261, height: 72 }} />
                </Link>
            </ImageContainer> 
        </LogoContainer> 
    )
}

export function DarkLogo() {
    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <LogoContainerMobile>
                <Link to="/">
                    <img src={LogoImageDark} alt="" />
                </Link>
            </LogoContainerMobile> 
        )
    }

    return (
        <LogoContainer>
            <ImageContainer>
                <Link to="/">
                    <img src={LogoImageDark} alt="" style={{ width: 261, height: 72 }} />
                </Link>
            </ImageContainer> 
        </LogoContainer> 
    )
}

export function SideBarLogo() {
    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <LogoContainerMobile>
                <ImageContainer>
                    <Link to="/">
                        <img src={LogoImage} alt="" style={{ width: 130.5, height: 36 }} />
                    </Link>
                </ImageContainer> 
            </LogoContainerMobile> 
        )
    }

    return (
        <SideBarLogoContainer>
            <ImageContainer>
                <Link to="/">
                    <img src={LogoImage} alt="" style={{ width: 130.5, height: 36 }} />
                </Link>
            </ImageContainer> 
        </SideBarLogoContainer> 
    )
}