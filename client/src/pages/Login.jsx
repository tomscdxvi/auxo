import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import LoginPage from '../app/containers/LoginPage';

const LoginContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
    bg-background
  `}
`;

export default function Login() {
  return (
    <LoginContainer>
        <LoginPage />
    </LoginContainer>
  )
}
