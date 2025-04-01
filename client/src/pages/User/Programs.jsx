import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import ProgramsPage from '../../app/containers/User/ProgramsPage';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function Programs() {
  return (
    <TrackContainer>
        <ProgramsPage />
    </TrackContainer>
  )
}

