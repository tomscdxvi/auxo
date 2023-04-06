import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import LogoImage from '../../../assets/images/auxo-logo.png';

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-12
    `}
`;

const LogoContainerMobile = styled.div`
    margin: auto;
    ${tw`
        flex
        items-center
    `}
`;

const ImageContainer = styled.div`
    width:auto;
    ${tw`
        h-6
        medium:h-9
    `}
    img {
        width:auto;
        height:100%;
    }
`; 


export function Logo() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <LogoContainerMobile>
                <ImageContainer>
                    <Link to="/">
                        <img src={LogoImage} alt="" />
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