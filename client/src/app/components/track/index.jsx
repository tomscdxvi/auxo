import React, { useState } from 'react'
import UserDetails from './userDetails';
import WorkoutDetails from './workoutDetails';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

export default function TrackForm() {

    const { step, setStep } = useState(1);

    const { state, setState } = useState({
        step: 1,
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        workout: [{
            name: "",
            sets: "",
            reps: "",
            weight: ""
        }]
    })

    const [track, setTrack] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        workout: []
    }); 

    const [workout, setWorkout] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
    });

    const prevStep = () => {
        setStep(step - 1);
    }

    const nextStep = () => {
        setStep(step + 1);
    }

    const handleChange = input => e => {
        setState({ [input]: e.target.value });
    }

    switch (step) {
        case 1: 
            return (
                <UserDetails 
                    nextStep={nextStep}
                    handleChange={handleChange} 
                    values={track} 
                />
            )
        case 2: 
            return (
                <WorkoutDetails 
                    nextStep={nextStep}
                    handleChange={handleChange} 
                    values={workout} 
                />
            )
        default:
    }

    return (
        <UserDetails 
            nextStep={nextStep}
            handleChange={handleChange} 
            values={track} 
        />
    )
}
