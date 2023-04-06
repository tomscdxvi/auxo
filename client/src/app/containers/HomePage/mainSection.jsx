import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { useMediaQuery } from 'react-responsive'
import { SCREENS } from '../../components/responsive';

import BikerIllustration from '../../../assets/images/bikerillustration.png'

const MainSectionContainer = styled.div`
    min-height: calc(100vh - 340px);
    margin-top: 16rem;
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
    top: 72.2%;
    visibility: hidden;
    ${tw`
        text-headline
        xlarge:visible
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

    @media (min-width: ${SCREENS.lg}) {
        height: 16 em;
        right: -4em;
        top: -6em;
    }

    @media (min-width: ${SCREENS.xl}) {
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
    `}
`;

const FooterContainer = styled.div`
    width: 78%;
    position: absolute;
    top: 97.5%;
    text-align: center;
    ${tw`
        text-sm
        text-paragraph
    `}
`

export function MainSection() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <MainSectionContainer style={{  marginTop: '9.758rem' }}>
                <LeftContainer style={{ width: '100%' }}>
                    <Slogan style={{ textAlign: 'center' }}>Track on the go.</Slogan>

                    <Description style={{ textAlign: 'center' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Maecenas a consequat risus, quis congue lorem. 
                        Etiam dictum porttitor tortor, in vehicula mi elementum sed. 
                        Integer porta ac leo sed hendrerit.
                    </Description>

                    <ButtonsContainer style={{ marginLeft: 50 }}>
                        <a target="_blank" href="">
                            <Button theme="outline" text="Learn more about our company" /> 
                        </a>
                    </ButtonsContainer>

                    <ButtonsContainer style={{ marginLeft: 100, marginTop: 140 }}>
                        <a target="_blank" href="">
                            <Button theme="filled" text="Sign Up" /> 
                        </a>
                    </ButtonsContainer>

                    <ButtonsContainer style={{ marginLeft: 102.5, marginTop: 50 }}>
                        <a target="_blank" href="https://github.com/Black-Bulls-Group">
                            <Button theme="filled" text="Sign In" /> 
                        </a>
                    </ButtonsContainer>

                    <ButtonsContainer style={{ marginLeft: 135, marginTop: 50 }}>
                        <Link to="" >
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas a consequat risus, quis congue lorem. 
                    Etiam dictum porttitor tortor, in vehicula mi elementum sed. 
                    Integer porta ac leo sed hendrerit.
                </Description>

                <ButtonsContainer>
                    <a target="_blank" href="https://github.com/Black-Bulls-Group">
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

            <FooterContainer>
                <Footer />
            </FooterContainer>
        </MainSectionContainer>
    )
}
