import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import AuthenticatedCoachPage from '../../app/containers/Coach/AuthenticatedCoachPage';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-background
  `}
`;

export default function AuthenticatedCoach() {
  return (
    <HomeContainer>
      <AuthenticatedCoachPage />
    </HomeContainer>
  )
}

