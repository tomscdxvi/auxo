import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import PlanPage from '../../app/containers/User/CalculatePage';

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

