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

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        justify-end
        items-end
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

    if (step === 1) {
        return (
            <>
            <div>
                <div>
                    <Title style={{ color: "white", marginTop: 50 }}>Workout Details</Title>
                    <UserDetails 
                        handleChange={handleChangeTrack} 
                        values={track} 
                    />
                </div>
                <ButtonsContainer>
                    <Button theme="filled" text="Next" className="mr-0 ml-auto" onClick={nextStep} />
                </ButtonsContainer>
            </div>
            </>
        )
    } else if (step === 2) {
        return (
            <>
                <div>
                    <Title style={{ color: "white", marginTop: 50 }}>Exercise Details</Title>
                    <WorkoutDetails 
                        prevStep={prevStep}
                        addOne={addExercise}
                        removeOne={removeExercise}
                        handleChange={handleChangeTrack} 
                        values={workout} 
                    />
                    {/*
                    <Title style={{ color: "white" }}>Exercise Details</Title> 
                    <div>
                        {workoutList.map((workout, index) =>             
                            <WorkoutDetails 
                                key={index}
                                prevStep={prevStep}
                                addOne={addExercise}
                                removeOne={removeExercise}
                                handleChange={handleChangeWorkout} 
                                values={workout} 
                            />
                        )}
                        </div> */}
                    <ButtonsContainer>
                        {/* {workoutList.length < workoutCounter ? <Button theme="filled" text="+" onClick={addExercise} className="mr-auto ml-0" />  
                            : <Button theme="disabled-filled" text="+" onClick={addExercise} className="mr-auto ml-0" />
                        } */}
                        {/* {workoutList.length > 0 ? <Button theme="filled" text="-" onClick={removeExercise} className="ml-0 mr-96" /> : null} */}
                        {/* {workoutList.length > 0 ? <Button theme="filled" text="Confirm" onClick={handleOpen} /> : null} */}
                        <Button theme="disabled-filled" text="+" onClick={addExercise} className="mr-auto ml-0" />
                        <Button theme="disabled-filled" text="-" onClick={removeExercise} className="ml-0 mr-96"/>
                        <Button theme="filled" text="Confirm" onClick={handleOpen} />
                        
                    </ButtonsContainer>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Track Workout
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Do you wish to track this workout?
                            </Typography>
                            <div className="flex mt-12">
                                <Button theme="outline-white" text="Back" onClick={handleClose} className="mr-9" /> 
                                <Button theme="filled" text="Track" className="mr-9" onClick={handleTrack} /> 
                            </div>
                        </Box>
                    </Modal>
                </div>
            </>
        )
    }
}
