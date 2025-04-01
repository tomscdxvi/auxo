import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Profile from '../../app/containers/User/Profile';

const HomeContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function ProfilePage() {
  return (
    <HomeContainer>
        <Profile />
    </HomeContainer>
  )
}
