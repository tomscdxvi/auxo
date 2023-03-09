import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive'
import { SCREENS } from '../responsive';

const ListContainer = styled.ul`
    ${tw`
        flex
        list-none
    `}
`;

const SignInItem = styled.li`
    ${tw`
        text-sm
        medium:text-base
        text-black
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:text-black
        p-2
    `}
`;

const SignUpItem = styled.li`
    ${tw`
        text-sm
        medium:text-base
        text-black
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:text-black
        border-solid
        rounded-md
        border-black
        border-2
        p-2
    `}
`;

export function NavItems() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    if(isMobile) {
        return (
           {/* Hide NavBar Items */}
        )
    };

    return (
        <ListContainer>
            <SignInItem>
                <a href="#">Sign in</a>
            </SignInItem>

            <SignUpItem>
                <a href="#">Sign up</a>
            </SignUpItem>
        </ListContainer>
    )
}
