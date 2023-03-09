import React from 'react'
import styled from 'styled-components';
// import WorkoutIllustration from ../../../assets/images/
import { SCREENS } from '../../components/responsive';
import tw from 'twin.macro';

const TopSectionContainer = styled.div`
    height: 400px;
    margin-top: 6em;
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
    ${tw`
        w-1/2
        flex
        flex-col
    `}
`;

const RightContainer = styled.div`
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
        text-black
        mb-4
        transition
        ease-in-out
        hover:text-purple-800
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
        text-gray-800
        small:max-h-full
        large:text-sm
        xlarge:text-lg
    `}
`;

export function TopSection() {
    return (
        <TopSectionContainer>
            <LeftContainer>
                <Slogan>Track on the go.</Slogan>

                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Maecenas a consequat risus, quis congue lorem. 
                    Etiam dictum porttitor tortor, in vehicula mi elementum sed. 
                    Integer porta ac leo sed hendrerit.
                </Description>
            </LeftContainer>

            {/* <RightContainer>
                <WorkoutIllustration>
                    <img src={FemaleIllustration} title="Designed by slidesgo" alt="Illustration of a female working out." />
                </WorkoutIllustration>
            </RightContainer> */}
        </TopSectionContainer>
    )
}
