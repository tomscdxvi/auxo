import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import StartWorkout from '../app/containers/StartWorkoutPage';

const StartWorkoutContainer = styled.div`
  background-color: #243763;
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

export default function StartWorkoutPage() {
  return (
    <StartWorkoutContainer>
        <StartWorkout />
    </StartWorkoutContainer>
  )
}

