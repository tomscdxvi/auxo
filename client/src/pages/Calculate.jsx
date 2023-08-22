import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import CalculatePage from '../app/containers/CalculatePage';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
    bg-background
  `}
`;

export default function Calculate() {
  return (
    <HomeContainer>
        <CalculatePage />
    </HomeContainer>
  )
}
