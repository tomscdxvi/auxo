import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';

// import Logo from .. 

const LogoContainer = styled.div`
    ${tw`
        flex
        items-center
        ml-12
    `}
`;

const LogoText = styled.div`
    ${tw`
        text-xl
        medium:text-2xl
        font-bold
        text-black
        m-1
    `}
`;

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
    return (
        <LogoContainer>
            {/* <Image>
                <img src={LogoImg} alt="" />
            </Image> */}
            <LogoText>Auxo</LogoText>
        </LogoContainer>
    )
}
