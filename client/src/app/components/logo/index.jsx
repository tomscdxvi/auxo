import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';

// import Logo from .. 

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-12
    `}
`;

const LogoText = styled.header`
    ${tw`
        text-xl
        medium:text-2xl
        font-bold
        m-1
        text-headline
    `}
`;

const LogoContainerMobile = styled.div`
    width: 100%;
`;

const LogoTextMobile = styled.header`
    text-align: center;
    ${tw`
        text-2xl
        font-bold
        text-headline
        mt-32
    `}
`

/* const Image = styled.div`

    width:auto;
    ${tw`
        h-6
        medium:h-9
    `}

    img{
        width:auto;
        height:100%;
    }
`; */


export function Logo() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <LogoContainerMobile>
                {/* <Image>
                    <img src={LogoImg} alt="" />
                </Image> */}
                <LogoTextMobile>Auxo</LogoTextMobile>
            </LogoContainerMobile> 
        )
    }

    return (
        <LogoContainer>
            {/* <Image>
                <img src={LogoImg} alt="" />
            </Image> */}
            <LogoText>Auxo</LogoText>
        </LogoContainer> 
    )
}
