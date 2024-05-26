import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { AuthenticatedCoachPage } from 'src/app/containers/AuthenticatedCoachPage';

const HomeContainer = styled.div`
  background-color: #243763;
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

export default function AuthenticatedCoach() {
  return (
    <HomeContainer>
      <AuthenticatedCoachPage />
    </HomeContainer>
  )
}

