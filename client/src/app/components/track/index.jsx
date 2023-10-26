import React, { useState, useEffect } from 'react'
import UserDetails from './userDetails';
import WorkoutDetails from './workoutDetails';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import { Button } from '../button';

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-end
        items-end
    `}
`;

export default function TrackForm() {

    const [step, setStep] = useState(1);

    const [state, setState] = useState({
        step: 1,
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        workout: []
    })

    const [track, setTrack] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        workout: []
    }); 

    const [workout, setWorkout] = useState({
        id: "",
        name: "",
        sets: "",
        reps: "",
        weight: "",
    });

    const [workouts, setWorkouts] = useState([]);

    const [workoutCounter, setWorkoutCounter] = useState(6); // Can update later to higher counter limit.
    const [workoutList, setWorkoutList] = useState([]);

    const prevStep = (e) => {
        setStep(step - 1);
    }

    const nextStep = (e) => {
        setStep(step + 1)
    }
    
    const addOn = (e) => {

        e.preventDefault();

        const object = workout
        setWorkoutList([...workoutList, object])

        console.log(workoutList);
        console.log(workout.id)
    }

    const handleChange = input => e => {
        setState({ [input]: e.target.value });
    }

    useEffect(() => {
        console.log(step);
        console.log(workoutList);
    }, [step]);

    console.log(state);

    if (step === 1) {
        return (
            <UserDetails 
                nextStep={nextStep} 
                handleChange={handleChange} 
                values={track} 
            />
        )
    } else if (step === 2) {
        return (
            <>
                <div>
                    <WorkoutDetails 
                        prevStep={prevStep}
                        nextStep={nextStep}
                        addOn={addOn}
                        handleChange={handleChange} 
                        values={workout} 
                    />
                    <div>
                        {workoutList.map((workout, index) =>             
                            <WorkoutDetails 
                                key={index}
                                prevStep={prevStep}
                                nextStep={nextStep}
                                addOn={addOn}
                                handleChange={handleChange} 
                                values={workout} 
                            />
                        )}
                    </div>
                    <ButtonsContainer>
                        <Button theme="filled" text="+" onClick={addOn} className="mr-auto ml-0" /> 
                        <Button theme="outline-white" text="Back" onClick={prevStep} className="mr-6" /> 
                        <Button theme="filled" text="Submit" onClick={nextStep} /> 
                    </ButtonsContainer>
                </div>
            </>
        )
    }
}
