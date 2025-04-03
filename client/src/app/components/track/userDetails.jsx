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
import { makeStyles } from "@mui/styles";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

import { SCREENS } from '../../components/responsive';
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
        font-bold
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
        gap-12
        p-12
        mb-8
    `}
`;

const MobileFormContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    z-index: 100;
    ${tw`
        mr-[170px]
        bg-white
        grid
        grid-cols-1
        gap-8
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

    const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const Next = e => {
        e.preventDefault();
        nextStep();
    }
    
    console.log(date);

    const classes = useStyles();
    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});
    
    return (  
        <Form>
            <FormContainer>
                <div>
                    <Title>Title</Title>
                    <TextField
                        placeholder="Title"
                        label="Title"
                        variant="standard"
                        onChange={handleChange('title')}
                    />
                </div>
                <div>
                    <div>
                        <Title>Date</Title>
                        <TextField
                            label="Today's Date"
                            value={date}
                            variant="standard"
                        />
                        {/*
                        <DefaultToolTip
                            content="You have the freedom to format the date to your preference."
                            text="Learn more"
                            placement="bottom"
                            tooltipClass="bg-headline medium:w-[290px] xlarge:w-[280px] cursor-default"
                            buttonClass="bg-headline text-white font-normal rounded-full outline-black !cursor-default w-[130px] mt-2"
                        />
                        */}
                    </div>

                    <div>
                        <Title>Time</Title>
                        <TextField
                            placeholder="Start Time"
                            label="Start Time"
                            variant="standard"
                            onChange={handleChange('start_time')}
                            sx={{ marginBottom: 2.5, marginRight: 2.5 }}
                        />
                        <div>
                            <TextField
                                placeholder="End Time"
                                label="End Time"
                                variant="standard"
                                onChange={handleChange('end_time')}
                            />
                            <DefaultToolTip
                                content="You have the freedom to format the time to your preference."
                                text="Learn more"
                                placement="bottom"
                                tooltipClass="bg-headline medium:w-[290px] xlarge:w-[280px] cursor-default"
                                buttonClass="bg-headline text-white font-normal rounded-full outline-black !cursor-default w-[130px] mt-2"
                            />
                        </div>
                    </div>
                </div>
                <Box sx={{ minWidth: 60 }}>
                    <Title>Type</Title>
                    <FormControl style={{ minWidth: 180 }}>
                        <InputLabel id="demo-simple-select-label" style={{ color: "#172C66" }}>Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type"
                            defaultValue=""
                            variant="standard"
                            onChange={handleChange('type')}
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
