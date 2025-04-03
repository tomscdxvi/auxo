import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@mui/styles'; 

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
        relative
    `}
`;

const MainContainer = styled.div`
    width: 1400px;
    ${tw`
        flex
        flex-col
        mx-auto
    `}
`;

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        mb-4
        tracking-wider
        font-bold
        xlarge:text-2xl 
        xlarge:leading-relaxed
    `}
`;

export function WorkInProgress() {
    return (
        <>
            <PageContainer>
                <MainContainer>
                    <div className="flex items-center justify-between mt-16">
                        <Title>Work in progress, check back at another time! 🚧</Title>
                    </div>
                </MainContainer>
            </PageContainer>
        </>
    )
}