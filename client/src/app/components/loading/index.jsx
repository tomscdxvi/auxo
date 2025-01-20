import { React, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import Lottie from 'react-lottie';

import LoadingLottie from '../../../assets/lotties/Loading.json';

const LoadingContainer = styled.div`
    ${tw`
        h-full
        w-full
        flex
        justify-center
        items-center
        bg-home-background
    `}
    position: absolute;
    top: 0;
    left: 0;
`

function Loading({ loadingProgress }) {
    const lottieOptions = {
        loop: false,
        autoplay: true,
        animationData: LoadingLottie,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        },
    }

    return (
        <LoadingContainer>
            <Lottie 
                options={lottieOptions}
                height={600}
                width={800}
                isClickToPauseDisabled={true}
                speed={1 + (loadingProgress / 100)}  // Adjust speed based on loading progress
            />
        </LoadingContainer>
    )
}

export default Loading;