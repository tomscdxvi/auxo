import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Calculate from '../../app/containers/User/Calculate';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function CalculatePage() {
  return (
    <HomeContainer>
        <Calculate />
    </HomeContainer>
  )
}
