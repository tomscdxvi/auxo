import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { useMediaQuery } from 'react-responsive'
import { SCREENS } from '../../components/responsive';

import BikerIllustration from '../../../assets/images/bikerillustration.png'
import { SignIn } from 'src/app/components/sign-in';
import { SignUp } from 'src/app/components/sign-up';

const MainSectionContainer = styled.div`
    min-height: calc(100vh - 340px);
    margin-top: 11.90%;
    @media (min-width: ${SCREENS.medium}) {
        min-height: 50vh;
        overflow-y: hidden;
    }
    ${tw`
        flex
        justify-between
        w-full
        max-w-screen-2xlarge
        pl-3
        pr-3
        large:pl-12
        large:pr-12
    `}
`;

const LeftContainer = styled.div`
    height: 600px;
    ${tw`
        w-1/2
        flex
        flex-col
    `}
`;

const RightContainer = styled.div`
    height: 100px;
    ${tw`
        w-1/2
        flex
        flex-col
        relative
        mt-20 
    `}
`;

const Slogan = styled.h1`
    ${tw`
        font-bold
        text-2xl
        text-headline
        mb-4
        transition
        ease-in-out
        // hover:text-purple-800
        small:text-3xl
        small:leading-snug
        medium:text-5xl
        medium:font-extrabold
        large:font-black 
        large:leading-normal
        xlarge:text-6xl 
        xlarge:leading-relaxed
        duration-700
    `}
`;

const Description = styled.p`
    ${tw`
        text-xs
        overflow-hidden
        max-h-12
        text-paragraph
        small:max-h-full
        large:text-sm
        xlarge:text-lg
    `}
`;

const HorizontalLine = styled.hr`
    width: 78%;
    position: absolute;
    top: 71.2%;
    visibility: hidden;

    @media (min-width: ${SCREENS.medium}) {
        top: 75.5%;
        width: 70%;
    }
    ${tw`
        text-headline
        large:visible
    `}
`

const BikerIllustrationContainer = styled.div`
    width: auto;
    height: 28em;
    right: -0.5em;
    top: -10em;
    position: absolute;
    visibility: hidden;

    img {
        width: auto;
        height: 100%;
        max-width: fit-content;
    }

    @media (min-width: ${SCREENS.medium}) {
        height: 24em;
        right: 6em;
        top: -5em;
    }

    @media (min-width: ${SCREENS.large}) {
        height: 26em;
        right: 2em;
        top: -6em;
    }

    ${tw`
        medium:visible
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-6
        font-bold
    `}
`;

const FooterContainer = styled.div`
    width: 78%;
    position: absolute;
    top: 96%;
    text-align: center;
    @media (min-width: ${SCREENS.medium}) {
        width: 95%;
        position: absolute;
        top: 96%;
        text-align: center;
    }
    ${tw`
        text-sm
        text-paragraph
    `}
`

export function MainSection() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    const [ isOpen, setIsOpen ] = useState(false);


    const [ open, setOpen ] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const [ signUpOpen, setSignUpOpen ] = useState(false);
    
    const handleSignUpClose = () => {
        setSignUpOpen(false);
    }

    if(isMobile) {
        return (
            <MainSectionContainer style={{  marginTop: '9.758rem' }}>
                <LeftContainer style={{ width: '100%' }}>
                    <Slogan style={{ textAlign: 'center' }}>Track on the go.</Slogan>

                    <Description style={{ textAlign: 'center', fontSize: '1rem' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Maecenas a consequat risus, quis congue lorem. 
                    </Description>
                    
                    <ButtonsContainer className="flex justify-center items-center">
                        <Button theme="filled" text="Sign In" onClick={() => setOpen(true)} />
                        <SignIn open={open} handleClose={handleClose} />
                    </ButtonsContainer>

                    <ButtonsContainer className="flex justify-center items-center mb-48">
                        <Button theme="outline" text="Sign Up" className="font-bold" onClick={() => setSignUpOpen(true)} />
                        <SignUp open={signUpOpen} handleSignUpClose={handleSignUpClose} />
                    </ButtonsContainer>

                    <ButtonsContainer className="flex justify-center items-center">
                        <a target="_blank" href="">
                            <Button theme="outline" text="Learn More" /> 
                        </a>
                    </ButtonsContainer>

                    <ButtonsContainer className="flex justify-center items-end">
                        <Link to="">
                            <Button theme="outline" text="Need Help?" /> 
                        </Link>
                    </ButtonsContainer>
                </LeftContainer>
            </MainSectionContainer>
        )
    }; 

    return (
        <MainSectionContainer>
            <LeftContainer>
                <Slogan>Track on the go.</Slogan>

                <Description>
                    Are you interested in<span style={{ fontWeight: "bold" }}> starting your journey in fitness</span> or are you a <span style={{ fontWeight: "bold" }}> hardened veteran</span> that has many years of experience in this space? 
                    With <span style={{ fontWeight: "bold" }}> Auxo</span>, you are going to constantly grow due to our <span style={{ fontWeight: "bold" }}>planning and easy-to-use tracking technology.</span>
                </Description>

                <ButtonsContainer>
                    <a target="_blank" href="https://github.com/auxo-group">
                        <Button theme="outline" text="Learn more about our company" /> 
                    </a>
                </ButtonsContainer>
            </LeftContainer>

            <RightContainer>
                <BikerIllustrationContainer>
                    <img src={BikerIllustration} title="Designed by Control Illustrations" alt="Illustration of someone riding a bike" />
                </BikerIllustrationContainer>
            </RightContainer> 

            <HorizontalLine />

            {/* 
            <FooterContainer>
                <Footer />
            </FooterContainer> */}
        </MainSectionContainer>
    )
}