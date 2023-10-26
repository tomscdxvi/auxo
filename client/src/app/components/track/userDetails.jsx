import React, { useState } from 'react'
import { InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
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

    const [date, setDate] = useState();

    const Next = e => {
        e.preventDefault();
        nextStep();
    }
    
    console.log(date);

    const classes = useStyles();

    return (  
        <Form>
            <Title style={{ color: "white" }}>One</Title>
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
                <Box sx={{ minWidth: 60 }}>
                    <Title>Type</Title>
                    <FormControl style={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label" style={{ color: "#172C66" }}>Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
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

            <ButtonsContainer>
                <Button theme="filled" text="Next" onClick={Next} /> 
            </ButtonsContainer>
        </Form>
    )
}
