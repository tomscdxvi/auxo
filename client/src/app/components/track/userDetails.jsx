import React, { useState } from 'react'
import { InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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
  

export default function UserDetails({ nextStep, handleChange, track }) {

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const Next = e => {
        e.preventDefault();
        nextStep();
    }
    
    console.log(date);

    const classes = useStyles();

    return (  
        <Form>
            <FormContainer>
                <div>
                    <Title>Title</Title>
                    <TextField
                        placeholder="Title"
                        label="Title"
                        onChange={handleChange('title')}
                        className={classes.root}
                    />
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                        <Title>Date</Title>
                        <TextField
                            placeholder="Date"
                            label="Date"
                            onChange={handleChange('date')}
                            className={classes.root}
                        />
                        <DefaultToolTip
                            content="You have the freedom to format the date to your preference."
                            text="Learn more"
                            placement="bottom"
                            tooltipClass="medium:w-[290px] xlarge:w-[280px] cursor-default"
                            buttonClass="text-white font-normal rounded-full bg-gray-800 outline-black !cursor-default w-[130px] mt-2"
                        />
                        {/*
                        <DatePicker 
                            onChange={(value) => {
                                setDate(dayjs(value).format("MM/DD/YYYY").toString());
                                
                                handleChange('date')
                            }} 
                            className={classes.root}
                            sx={{ svg: { color: "#172C66" }, width: 180 }} 
                        /> */}
                    </div>

                    <div>
                        <Title>Time</Title>
                        <TextField
                            placeholder="Start Time"
                            label="Start Time"
                            onChange={handleChange('start_time')}
                            className={classes.root}
                            sx={{ marginBottom: 2.5, marginRight: 2.5 }}
                        />
                        <TextField
                            placeholder="End Time"
                            label="End Time"
                            onChange={handleChange('end_time')}
                            className={classes.root}
                        />
                        <DefaultToolTip
                            content="You have the freedom to format the time to your preference."
                            text="Learn more"
                            placement="bottom"
                            tooltipClass="medium:w-[290px] xlarge:w-[280px] cursor-default"
                            buttonClass="text-white font-normal rounded-full bg-gray-800 outline-black !cursor-default w-[130px] mt-2"
                        />
                        {/*
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(value) => {
                                setStartTime(value)
                                handleChange('start_time')
                            }}
                            className={classes.root}
                            sx={{ svg: { color: "#172C66" }, marginBottom: 3 }} 

                        />

                        <TimePicker
                            label="End Time"
                            defaultValue={dayjs('2022-04-17T15:30')}
                            onChange={handleChange('end_time')}
                            className={classes.root}
                            sx={{ svg: { color: "#172C66" } }} 
                        /> */}
                    </div>
                    
                </LocalizationProvider>
                <Box sx={{ minWidth: 60 }}>
                    <Title>Type</Title>
                    <FormControl style={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label" style={{ color: "#172C66" }}>Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            defaultValue=""
                            onChange={handleChange('type')}
                            className={classes.select}
                        >
                            <MenuItem value={"Reps"}>Reps</MenuItem>
                            <MenuItem value={"Singles"}>Singles</MenuItem>
                            <MenuItem value={"Cardio"}>Cardio</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </FormContainer>
        </Form>
    )
}
