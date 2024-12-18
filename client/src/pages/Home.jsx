import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import HomePage from '../app/containers/HomePage';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
    bg-home-background
  `}
`;

export default function Home() {
  return (
    <HomeContainer>
        <HomePage />
    </HomeContainer>
  )
}
