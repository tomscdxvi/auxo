import React, { useState } from 'react'
import { InputLabel, TextField } from '@mui/material'
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
        text-black
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
        rounded
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
        borderColor: "black"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "black"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black"
      },
      "& .MuiOutlinedInput-input": {
        color: "black"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "black"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "black"
      },
      "& .MuiInputLabel-outlined": {
        color: "black"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "black"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "black"
      }
    },
    select: {
        height: "3.5rem",
        width: "200px",
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "black"
        },
        '& .MuiSvgIcon-root': {
            color: "black"
        },
        "& .MuiOutlinedInput-input": {
            color: "black"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "red"
        },
    },
});
  

export default function UserDetails({ nextStep, handleChange, track }) {

    const [date, setDate] = useState();

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
                        <DatePicker 
                            onChange={(value) => {
                                setDate(dayjs(value).format("MM/DD/YYYY"));

                                handleChange({target: { name: "date", value: date}})
                            }} 
                            className={classes.root}
                            sx={{ svg: { color: 'white' } }} 
                        />
                    </div>

                    <div>
                        <Title>Time</Title>
                        <MultiInputTimeRangeField
                            defaultValue={[dayjs('2023-09-23T00:00'), dayjs('2023-09-23T00:00')]}
                            onChange={handleChange('time')}
                            className={classes.root}
                        />
                    </div>
                </LocalizationProvider>
                <div>
                    <Title>Type</Title>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        defaultValue="Reps"
                        onChange={handleChange('type')}
                        className={classes.select}
                    >
                        <MenuItem value="Reps">Reps</MenuItem>
                        <MenuItem value="Singles">Singles</MenuItem>
                        <MenuItem value="Cardio">Cardio</MenuItem>
                    </Select>
                </div>
            </FormContainer>

            <ButtonsContainer>
                <Button theme="filled" text="Next" onClick={Next} /> 
            </ButtonsContainer>
        </Form>
    )
}
