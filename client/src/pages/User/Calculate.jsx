import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import CalculatePage from '../../app/containers/User/CalculatePage';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function Calculate() {
  return (
    <HomeContainer>
        <CalculatePage />
    </HomeContainer>
  )
}
