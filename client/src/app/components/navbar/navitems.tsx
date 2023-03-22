import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';

const ListContainer = styled.ul`
    ${tw`
        flex
        list-none
    `}
`;

const ListContainerMobile = styled.ul`
    visibility: hidden;
`

const SignInItem = styled.li`
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:underline
        p-2
    `}
`;

const SignUpItem = styled.li`
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:underline
        p-2
    `}
`;


export function NavItems() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <ListContainerMobile>
                
            </ListContainerMobile>
        )
    }; 

    return (
        <ListContainer>
            <SignUpItem>
                <a href="#">Sign up</a>
            </SignUpItem>

            <SignInItem>
                <a href="#">Sign in</a>
            </SignInItem>
        </ListContainer>
    )
}
