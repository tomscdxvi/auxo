import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Logo } from '../logo';
import { NavItems } from './navitems';

const NavbarContainer = styled.div`
    min-height:68px;

    ${tw`
        w-full
        min-w-full
        max-w-screen-2xlarge
        flex
        flex-row
        items-center
        large:pl-12
        large:pr-12 
        justify-between
    `}
`;

const LogoContainer = styled.div``;

/* const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

*/

export function Navbar() {
    return (
        <NavbarContainer>
            <Logo />
            <NavItems />
        </NavbarContainer>
    )
}
