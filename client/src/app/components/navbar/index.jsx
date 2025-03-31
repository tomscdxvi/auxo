import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Logo, DarkLogo } from '../logo';
import { NavItems, NavItemsDark, NavItemsLoggedIn } from './navitems';

const NavbarContainer = styled.div`
    min-height:68px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    ${tw`
        w-full
        large:flex
        large:flex-row
        large:items-center
        large:pb-8
        large:pl-12
        large:pr-12 
        large:justify-between
    `}
`;

// Imported Bootstrap in index.js is messing with Navbar, implement fix later.

export function Navbar() {
    return (
        <NavbarContainer>
            <Logo />
            <NavItems />
        </NavbarContainer>
    )
}

export function NavbarDark() {
    return (
        <NavbarContainer>
            <DarkLogo />
            <NavItemsDark />
        </NavbarContainer>
    )
}

export function NavbarLoggedIn() {
    return (
        <NavbarContainer>
            <Logo />
            <NavItemsLoggedIn />
        </NavbarContainer>
    )
}
