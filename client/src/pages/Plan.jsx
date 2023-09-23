import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { PlanPage } from 'src/app/containers/PlanPage';

const TrackContainer = styled.div`
  background-color: #243763;
  ${tw`
    w-full
    h-screen
    flex
    flex-col
  `}
`;

export default function Plan() {
  return (
    <TrackContainer>
        <PlanPage />
    </TrackContainer>
  )
}

