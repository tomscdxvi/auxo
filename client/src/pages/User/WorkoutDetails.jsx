import { React, useState } from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import WorkoutDetails from '../../app/containers/User/WorkoutDetailsPage';

const WorkoutDetailsContainer = styled.div`
  background-color: #243763;
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `}
`;

export default function ViewWorkoutDetails() {
  return (
    <WorkoutDetailsContainer>
      <WorkoutDetails />
    </WorkoutDetailsContainer>
  )
}

