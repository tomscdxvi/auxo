import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie';
import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { useMediaQuery } from 'react-responsive'
import { SCREENS } from '../../components/responsive';

import BikerIllustration from '../../../assets/images/bikerillustration.png';
import HomeLottie from '../../../assets/lotties/HomeLottie.json';
import { SignIn } from 'src/app/components/sign-in';
import { SignUp } from 'src/app/components/sign-up';

const PageContainer = styled.div`
    height: 100vh;
    width: 100%;
    overflow-y: scroll;
`

const Section = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TopContainer = styled.div`
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

const Header = styled.h1`
    ${tw`
        font-bold
        text-paragraph
        mb-4
        transition
        ease-in-out
        // hover:text-purple-800
        small:text-3xl
        small:leading-snug
        medium:text-4xl
        medium:font-extrabold
        large:font-black 
        large:leading-normal
        xlarge:text-5xl 
        xlarge:leading-relaxed
        duration-700
    `}
`

const Slogan = styled.h1`
    ${tw`
        font-bold
        text-2xl
        text-paragraph
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
        hover:transition
        hover:duration-200
        hover:ease-in-out
        hover:bg-gray-background
        hover:text-white
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

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    const [ isOpen, setIsOpen ] = useState(false);

    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        const checkUserLoggedIn = async() => {
            try {
                const response = await axios.get("http://localhost:5000/user/data", { withCredentials: true });

                // If the user is logged in, the request will succeed and return user data
                if (response.data) {
                    // User is logged in, proceed to render the home page
                    console.log("User is logged in:", response.data.user);
                    navigate("/home");
                } else {
                    navigate("/");
                }
            } catch (error) {
                navigate("/");
            }
        };

        checkUserLoggedIn();
    }, [navigate]);

    const handleClose = () => {
        setOpen(false);
    }

    const [ signUpOpen, setSignUpOpen ] = useState(false);
    
    const handleSignUpClose = () => {
        setSignUpOpen(false);
    }

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: HomeLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    }

    return (
        <PageContainer>
            <Section>
                <TopContainer>
                    <LeftContainer>
                        <Slogan>Track on the go.</Slogan>

                        <Description>
                            Are you interested in<span style={{ fontWeight: "bold" }}> starting your journey</span> or are you <span style={{ fontWeight: "bold" }}>experienced </span> with many years in fitness? 
                            With <span style={{ fontWeight: "bold" }}> Auxo</span>, you are going to elevate your training regardless of your level by utilizing our <span style={{ fontWeight: "bold" }}>planning and easy-to-use tracking technology.</span>
                        </Description>

                        <ButtonsContainer>
                            <Button theme="filled" text="Get started!" onClick={() => navigate("/register")} /> 
                        </ButtonsContainer>
                    </LeftContainer>

                    <RightContainer>
                        <BikerIllustrationContainer>
                            {/*
                                <img src={BikerIllustration} title="Designed by Control Illustrations" alt="Illustration of someone riding a bike" />
                            */}
                            <Lottie 
                                options={lottieOptions}
                                height={400}
                                width={400}
                                isClickToPauseDisabled={true}
                            />
                        </BikerIllustrationContainer>
                    </RightContainer> 

                    {/* 
                    <FooterContainer>
                        <Footer />
                    </FooterContainer> */}
                </TopContainer>
            </Section>
            <Section>
                <div>
                    <Header>Who is using Auxo?</Header>

                    <div>

                    </div>
                </div>
            </Section>
            <Section>
                <div>
                    <Header>Features</Header>

                    <div>

                    </div>
                </div>
            </Section>
            <Section>
                <div>
                    <Header>Pricing</Header>

                    <div>

                    </div>
                </div>
            </Section>
        </PageContainer>
    )
}