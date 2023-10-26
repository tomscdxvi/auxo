import React, { useState } from 'react'
import { TextField } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

import { Button } from '../button';
import { FormInputDark } from '../form';
import DefaultToolTip from '../tooltip';

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
        text-headline
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
        bg-white
        p-12
        mb-8
    `}
`;

const TopFormContainer = styled.div`
    ${tw`
        grid
        grid-cols-2
        gap-12
        pt-12
    `}
`

const BottomFormContainer = styled.div`
    ${tw`
        grid
        grid-cols-3
        gap-12
        pt-12
    `}
`

const ButtonsContainer = styled.div`
    ${tw`
        flex
        flex-wrap
        mt-6
        justify-between
    `}
`;

// Set the styles and classes for MUI inputs
const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#172C66"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#172C66"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#172C66"
      },
      "& .MuiOutlinedInput-input": {
        color: "#172C66"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "#172C66"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "#172C66"
      },
      "& .MuiInputLabel-outlined": {
        color: "#172C66"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#172C66"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#172C66"
      }
    },
    select: {
        "& .MuiOutlinedInput-input": {
            color: "#172C66"
        },  
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#172C66"
            },
            "&:hover fieldset": {
              borderColor: "#172C66"
            },
            "&.Mui-focused fieldset": {
              borderColor: "#172C66"
            }
          }
    }
});
  

export default function WorkoutDetails({ prevStep, nextStep, handleChange, track }) {

    const Next = e => {
        e.preventDefault();
        nextStep();
    }

    const Prev = e => {
        e.preventDefault();
        prevStep();
    }

    const classes = useStyles();

    return (  
        <Form>
            <Title style={{ color: "white" }}>Two</Title>
            <FormContainer>
                <TopFormContainer>
                    <div>
                        <Title>Name</Title>
                        <TextField
                            placeholder="Name"
                            label="Name"
                            onChange={handleChange('name')}
                            className={classes.root}
                        />
                    </div>
                    <Box sx={{ minWidth: 60 }}>
                        <Title>Intensity</Title>
                        <FormControl style={{ minWidth: 180 }}>
                            <InputLabel id="demo-simple-select-label" style={{ color: "#172C66" }}>Intensity</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Intensity"
                                onChange={handleChange('intensity')}
                                className={classes.select}
                            >
                                <MenuItem value={"Easy"}>Easy</MenuItem>
                                <MenuItem value={"Normal"}>Normal</MenuItem>
                                <MenuItem value={"Hard"}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                        <DefaultToolTip 
                            content="
                            Easy (Could easily do many more reps)
                            Normal (Could do a 3-5 more reps)
                            Hard (Could only do 1-3 reps)"
                            text="Button"
                            placement="bottom"
                            tooltipClass="w-[290px] cursor-default"
                            buttonClass="text-headline !cursor-default"
                        />
                    </Box>
                </TopFormContainer>
                <BottomFormContainer>
                    <div>
                    <Title>Sets</Title>
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
                    <Title>Reps</Title>
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
                    <Title>Weight (in lbs.)</Title>
                    <TextField
                        placeholder="Weight"
                        label="Weight"
                        inputProps={{ type: "number", min: "1" }}
                        onChange={handleChange('weight')}
                        className={classes.root}
                        onKeyPress={(event) => { 
                          if (!/[1-9]/.test(event.key)) { 
                              event.preventDefault();
                          }
                      }}
                    />
                    </div>
                </BottomFormContainer>
            </FormContainer>

            <ButtonsContainer>
                <Button theme="filled" text="Prev" onClick={Prev} /> 
                <Button theme="filled" text="Confirm" />
            </ButtonsContainer>
        </Form>
    )
}
