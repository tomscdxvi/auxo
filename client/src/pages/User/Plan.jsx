import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import PlanPage from '../../app/containers/User/PlanPage';

const TrackContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-white
  `}
`;

export default function Plan() {
  return (
    <TrackContainer>
        <PlanPage />
    </TrackContainer>
  )
}

