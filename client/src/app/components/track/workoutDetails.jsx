import React, { useState } from 'react'
import { TextField } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

import { Button } from '../button';
import { FormInputDark } from '../form';

const Form = styled.form`
    z-index: 100;
    ${tw`
        text-xs
        max-h-full
        xlarge:text-lg
    `}
`;

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-white
        mb-4
        tracking-wider
        xlarge:text-xl 
        xlarge:leading-relaxed
    `}
`;

const FormContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    z-index: 100;
    ${tw`
        grid
        grid-cols-2
        gap-12
        p-12
        mb-8
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-6
        items-end
        justify-end
    `}
`;

// Set the styles and classes for MUI inputs
const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "white"
      },
      "& .MuiOutlinedInput-input": {
        color: "white"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "white"
      },
      "& .MuiInputLabel-outlined": {
        color: "white"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "white"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "white"
      }
    },
    select: {
        height: '2.5rem',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
        },
        '& .MuiSvgIcon-root': {
            color: 'white'
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
    },
});
  

export default function WorkoutDetails({ prevStep, nextStep, addOn, handleChange, workout }) {

    const Prev = e => {
      e.preventDefault();
      prevStep();
    }

    const Next = e => {
        e.preventDefault();
        nextStep();
    }

    const classes = useStyles();

    return (  
        <Form>
            <FormContainer>
                <div>
                    <Title>Exercise Name</Title>
                    <TextField
                        placeholder="Name"
                        label="Name"
                        onChange={handleChange('name')}
                        className={classes.root}
                    />
                </div>
                <div>
                    <Title>Number of Sets</Title>
                    <TextField
                        placeholder="Sets"
                        label="Sets"
                        inputProps={{ type: "number", min: "1" }}
                        onChange={handleChange('sets')}
                        className={classes.root}
                        onKeyPress={(event) => { 
                          if (!/[1-9]/.test(event.key)) { 
                              event.preventDefault();
                          }
                      }}
                    />
                </div>
                <div>
                    <Title>Number of Reps</Title>
                    <TextField
                        placeholder="Reps"
                        label="Reps"
                        inputProps={{ type: "number", min: "1" }}
                        onChange={handleChange('reps')}
                        className={classes.root}
                        onKeyPress={(event) => { 
                          if (!/[1-9]/.test(event.key)) { 
                              event.preventDefault();
                          }
                      }}
                    />
                </div>
                <div>
                    <Title>Weight in lbs.</Title>
                    <TextField
                        placeholder="Weight"
                        label="Weight"
                        inputProps={{ type: "number", min: "1",  }}
                        onChange={handleChange('weight')}
                        className={classes.root}
                        onKeyPress={(event) => { 
                          if (!/[1-9]/.test(event.key)) { 
                              event.preventDefault();
                          }
                        }}
                    />
                </div>
            </FormContainer>
        </Form>
    )
}
