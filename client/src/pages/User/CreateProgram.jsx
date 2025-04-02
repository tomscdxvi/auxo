import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import CreateProgram from 'src/app/containers/User/CreateProgram';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function CreateProgramPage() {
  return (
    <TrackContainer>
        <CreateProgram />
    </TrackContainer>
  )
}

