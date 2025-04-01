import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Programs from '../../app/containers/User/Programs';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function ProgramsPage() {
  return (
    <TrackContainer>
        <Programs />
    </TrackContainer>
  )
}

