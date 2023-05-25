import React, { useState } from 'react';
import styled from 'styled-components'
import tw from 'twin.macro';
import './stepper.css';

const MainContainer = styled.div`
    display: inline;
    width: 502px;
    margin-top: 8%;
    margin-bottom: 3.05%;
    ${tw`
        flex
        justify-between
    `}
`;

const StepItem = styled.div`
    &:not(:first-child) {
        ${tw`
            before:content-[""]
            before:bg-paragraph
            before:absolute
            before:w-full
            before:h-[3px]
            before:right-2/4
            before:top-1/3
            before:translate-y-2/4
        `}
    }
    ${tw`
        relative
        flex
        flex-col
        justify-center
        items-center
        w-40
    `}
`

const Step = styled.div`
    ${tw`
        flex
        relative
        w-10
        h-10
        z-10
        bg-headline
        rounded-full
        justify-center
        items-center
        font-semibold
        text-white
    `}
`

export function Stepper() {

    const steps = ["User Details", "Level", "Goals"];

    const [currentStep, setCurrentStep] = useState(1);

    const handleStep = () => {
        
    }

    return(
        <MainContainer>
            {steps?.map((step, i) => (
                <StepItem key={i}>
                    <Step>{i + 1}</Step>
                    <p>{step}</p>
                </StepItem>
            ))}
        <button>
            Next
        </button>
        </MainContainer>
    )
}
