import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import AuthenticatedHome from '../../app/containers/User/AuthenticatedHome';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function AuthenticatedHomePage() {
  return (
    <HomeContainer>
      <AuthenticatedHome />
    </HomeContainer>
  )
}

