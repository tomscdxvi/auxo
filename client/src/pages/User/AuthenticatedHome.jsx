import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import AuthenticatedHomePage from '../../app/containers/User/AuthenticatedHomePage';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

export default function AuthenticatedHome() {
  return (
    <HomeContainer>
      <AuthenticatedHomePage />
    </HomeContainer>
  )
}

