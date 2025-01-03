import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import TrackPage from '../../app/containers/User/TrackPage';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
  `}
`;

export default function Track() {
  return (
    <TrackContainer>
      <TrackPage />
    </TrackContainer>
  )
}

