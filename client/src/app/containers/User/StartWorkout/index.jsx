import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { NavbarLoggedIn } from '../../components/navbar';
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

export function StartWorkout() {
    return (
        <PageContainer>
            <MainSection />
        </PageContainer>
    )
}
