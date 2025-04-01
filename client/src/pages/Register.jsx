import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import Register from '../app/containers/Register';

const RegisterContainer = styled.div`
  ${tw`
    w-full
    h-screen
    flex
    flex-col
    bg-white
  `}
`;

export default function RegisterPage() {
  return (
    <RegisterContainer>
        <Register />
    </RegisterContainer>
  )
}
