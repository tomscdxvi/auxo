import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import RegisterPage from '../app/containers/RegisterPage';

const RegisterContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
    bg-home-background
  `}
`;

export default function Register() {
  return (
    <RegisterContainer>
        <RegisterPage />
    </RegisterContainer>
  )
}
