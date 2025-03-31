import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Navbar, NavbarDark } from '../../components/navbar';
import { MainSection } from './mainSection';
import { Stepper } from 'src/app/components/stepper';
//import { Stepper } from '@progress/kendo-react-layout';


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

export default function RegisterPage() {
    return (
        <PageContainer>
            <Navbar />
            <MainSection />
        </PageContainer>
    )
}
