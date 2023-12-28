import React, { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import { Navbar } from '../../components/navbar';
import { MainSection } from './mainSection';
import { Stepper } from 'src/app/components/stepper';
//import { Stepper } from '@progress/kendo-react-layout';


const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        w-full
        h-full
        items-center
        overflow-x-hidden
    `}
`;

export default function RegisterPage() {

    const [step, setStep] = useState(0);
    const [steps, setSteps] = useState([
        {
            label: "User Details",
            isValid: undefined
        },
        {
            label: "Level",
            isValid: undefined
        },
        {
            label: "Goals",
            isValid: undefined
        }
    ]);

    const lastStepIndex = steps.length - 1;

    const lastStep = lastStepIndex === step;

    const isPreviousStepsValid =
        steps
            .slice(0, step)
            .findIndex((currentStep) => currentStep.isValid === false) === -1;
    return (
        <PageContainer>
            <Navbar />
            <MainSection />
        </PageContainer>
    )
}
