import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Navbar } from '../../../components/navbar';
import { MainSection } from './mainSection';

const PageContainer = styled.div`
    background-color: #243763;
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

export default function CalculatePage() {
    return (
        <PageContainer>
            <MainSection />
        </PageContainer>
    )
}
