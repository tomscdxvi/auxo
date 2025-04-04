import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Home from '../app/containers/Home';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
    bg-white
  `}
`;

export default function HomePage() {
  return (
    <HomeContainer>
        <Home />
    </HomeContainer>
  )
}
