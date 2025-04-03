import React, { useState, useEffect } from 'react'
import UserDetails from './userDetails';
import WorkoutDetails from './workoutDetails';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import { Button } from '../button';
import DefaultToolTip from '../tooltip';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, Modal, Typography } from '@mui/material';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { SCREENS } from '../../components/responsive';

const AccordionContainer = styled.div`
    ${tw`
        w-full
    `}
`;

const AccordionItemContainer = styled.div`
    ${tw`
        border 
        border-gray-300 
        rounded-lg 
        overflow-hidden 
        mb-4
    `}
`;

const AccordionHeader = styled.div`
    ${tw`
        flex 
        justify-between 
        items-center 
        bg-white
        text-headline
        text-2xl
        p-4 
        cursor-pointer
    `}

    &:hover {
        background-color: #172C66; /* Change this to your desired hover color */
        color: #fff;
    }
`;

const AccordionContent = styled.div`
    ${tw`
        p-4 
        bg-gray-100
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-end
        items-end
        hover:bg-gray-background
        hover:text-white
    `}
`;

const MobileButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-start
        items-start
        mb-6
    `}
`;


const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        mb-4
        tracking-wider
        ml-0
        mr-auto
        font-bold
        xlarge:text-xl 
        xlarge:leading-relaxed
    `}
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function TrackForm() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [track, setTrack] = useState({
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        type: "",
        name: "",
        intensity: "",
        sets: "",
        reps: "",
        weight: "",
    }); 

    const [workout, setWorkout] = useState({
        id: null,
        name: "",
        intensity: "",
        sets: "",
        reps: "",
        weight: "",
    });

    const [workoutCounter, setWorkoutCounter] = useState(1); // Can update later to higher counter limit.
    const [workoutList, setWorkoutList] = useState([]);

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = (e) => {

        e.preventDefault();

        setOpenModal(true);
        // pushWorkout();
    }

    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    const [isWorkoutDetailsOpen, setIsWorkoutDetailsOpen] = useState(false);
    
    const handleClose = (e) => {

        e.preventDefault();

        setOpenModal(false);
        // removeWorkout();
    }

    /* 
    const pushWorkout = () => {
        for(var i = 0; i < workoutList.length; i++) {
            track.workout.push({
                workout: workoutList[i]
            });
        }

        console.log(track);
    } */
    
    // Implement in a later update?
    /* 
    const removeWorkout = () => {
        var array = [track.workout];

        array.splice(-1);

        setTrack(array);

        console.log(track);
    } */

    const addExercise = (e) => {

        e.preventDefault();

        const object = {...workout, id: workoutList.length}
        setWorkoutList([...workoutList, object]);

        // pushWorkout();

    }

    const removeExercise = (e) => {

        e.preventDefault();

        var array = [...workoutList];

        array.splice(-1);

        setWorkoutList(array);
        
        console.log(workoutList);
    }

    const handleChangeTrack = (input) => e => {
        setTrack({ ...track, [input]: e.target.value });

        localStorage.setItem('track', track);
    }

    const handleChangeWorkout = (input) => e => {
        /* 
        const updateWorkoutList = workoutList.map((workout, id) => {

            if(workout.id === 0) {
                return { ...workout, [input]: e.target.value };
            } 
            return workout; 
        });

        setWorkoutList(updateWorkoutList); */

        setWorkout({ ...workout, [input]: e.target.value });

    }

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const initializeError = (error) => {
        toast.error(error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: {
                background: "#CDFADC",
                color: '#333333' 
            }
        }); 
    }

    const storeTrackId = (value) => {
        try {
            localStorage.setItem('@storage_track', value);
        } catch (error) {
            console.log(error);
        }
    }

    const handleTrack = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('@storage_user');

        try {

            const { data } = await axios.post(`http://localhost:5000/user/${userId}/track`, {...track}, {withCredentials: true})

            if(data) {
                if(data.errors) {
                    const { title  } = data.errors;

                    if(title) initializeError(title);
                } else {
                    if (track.title!== "") {
                        toast.success(track.title + " has been tracked. You will be redirected to the next page shortly!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });

                        storeTrackId("hello!");

                        await timeout(4000).then(() => {
                            navigate("/home");
                        })
                    } else {
                        toast.error("There was an error creating this tracking.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            style: {
                                background: "#CDFADC",
                                color: '#333333' 
                            }
                        }); 
                    }
                }
            }
        } catch(error) {
            toast.error("There was a big error creating this tracking.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                style: {
                    background: "#CDFADC",
                    color: '#333333' 
                }
            }); 
        }
    }

    const prevStep = (e) => {
        e.preventDefault();

        setStep(step - 1);

        console.log(track)
    }

    const nextStep = (e) => {
        e.preventDefault();

        setStep(step + 1)
    }

    useEffect(() => {
        // console.log(step);

        localStorage.getItem('track', JSON.stringify(track));
    }, [step, track]);

    // console.log(track);
    // console.log(workoutList);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    return (
        <>
            <AccordionContainer>
                {/* User Details Accordion */}
                <AccordionItemContainer>
                <AccordionHeader onClick={() => setIsUserDetailsOpen(!isUserDetailsOpen)}>
                    <span>User Details</span>
                    {isUserDetailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </AccordionHeader>
                {isUserDetailsOpen && (
                    <AccordionContent>
                        <UserDetails 
                            handleChange={handleChangeTrack} 
                            values={track} 
                        />
                    </AccordionContent>
                )}
                </AccordionItemContainer>

                {/* Workout Details Accordion */}
                <AccordionItemContainer>
                <AccordionHeader onClick={() => setIsWorkoutDetailsOpen(!isWorkoutDetailsOpen)}>
                    <span>Workout Details</span>
                    {isWorkoutDetailsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </AccordionHeader>
                {isWorkoutDetailsOpen && (
                    <AccordionContent>
                        <WorkoutDetails 
                            prevStep={prevStep}
                            addOne={addExercise}
                            removeOne={removeExercise}
                            handleChange={handleChangeTrack} 
                            values={workout} 
                        />
                    </AccordionContent>
                )}
                </AccordionItemContainer>
            </AccordionContainer>
            <ButtonsContainer>
                <Button theme="text" text="Track" />
            </ButtonsContainer>
        </>
    )
}
