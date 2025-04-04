import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Navbar, NavbarDark } from '../../components/navbar';
import { MainSection } from './mainSection';


const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

export default function Home() {
    return (
        <PageContainer>
            <Navbar />
            <MainSection />
        </PageContainer>
    )
}
