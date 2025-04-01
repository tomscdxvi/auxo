import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Track from '../../app/containers/User/Track';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function TrackPage() {
  return (
    <TrackContainer>
      <Track />
    </TrackContainer>
  )
}

