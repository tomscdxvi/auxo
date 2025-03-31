import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

import { Footer } from '../../components/footer';
import { FormInput } from '../../components/form';
import { Button }   from '../../components/button';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/signupillustration.png'
import '../../styles/register/main.css'
import '../../styles/form.css'

const PageContainer = styled.div`
    ${tw`
        flex
        items-center
        justify-center
        w-full
        large:pl-12
        large:pr-12
    `}
`;

const MainContainer = styled.div`
    width: 1000px;
    margin-top: 6%;
    margin-bottom: 3.05%;
    ${tw`
        flex
        flex-col
    `}
`;

const Title = styled.h1`
    ${tw`
        font-semibold
        text-paragraph
        pt-4
        pl-12
        pr-4
        pb-0
        xlarge:text-3xl 
        xlarge:leading-relaxed
    `}
`;

const Description = styled.p`
    ${tw`
        font-normal
        text-paragraph
        xlarge:text-lg
        xlarge:leading-relaxed
    `}
`;

const Label = styled.h1`
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 24px;
    ${tw`
        text-white
        tracking-wider
        font-bold
    `}
`

const SelectContainer = styled.div`
    ${tw`
        p-6
    `}
`;

const Form = styled.form`
    z-index: 100;
    ${tw`
        text-xs
        overflow-hidden
        max-h-full
        xlarge:text-lg
    `}
`;

const FormContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    z-index: 100;
    ${tw`
        grid
        grid-cols-2
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        justify-end
        pt-4
        hover:transition
        hover:duration-200
        hover:ease-in-out
        hover:bg-gray-background
        hover:text-white
    `}
`;

const HorizontalLine = styled.hr`
    width: 20%;
    position: absolute;
    top: 75.8%;
    left: 0;
    z-index: 1;
    visibility: hidden;
    ${tw`
        text-white
        xlarge:visible
    `}
`

const ImageContainer = styled.div`
    width: auto;
    height: 28em;
    left: 2em;
    top: 19em;
    position: absolute;
    visibility: hidden;
    z-index: 2;
    img {
        width: auto;
        height: 100%;
        max-width: fit-content;
    }

    @media (min-width: ${SCREENS.lg}) {
        height: 16 em;
        right: -4em;
        top: -6em;
    }

    @media (min-width: ${SCREENS.xl}) {
        height: 26em;
        right: 2em;
        top: -6em;
    }

    ${tw`
        medium:visible
    `}
`;

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: "column",
        display: "flex"
    },
    input: {
      color: "white"
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF",
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& fieldset": {
                        borderColor: "white", // Default border color
                    },
                    "&:hover fieldset": {
                        borderColor: "white", // Hover border color
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "transparent", // Remove blue focus border
                    },
                    "&.Mui-focused": {
                        outline: "none", // Remove the blue glow from focus
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "white", // Label color
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: "white", // Input text color
                    outline: "none", // Suppress blue outline from focus
                },
            },
        },
    },
});

export function MainSection() {

    const navigate = useNavigate();

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const [step, setStep] = useState(1); // Track current step
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        level: ""
    });

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

    const inputs = [ 
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: `Username`,
            pattern: "^[_A-z0-9]*((-|\s)*[_A-z0-9])*$",
            error: "Symbols and/or spaces around your username are not allowed, please try again.",
            label: "Username",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "text",
            placeholder: `Email Address`,
            pattern: "^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+[.])+[a-z]{2,5}$",
            error: "Sorry, this email is not valid. Please try again.",
            label: "Email Address",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: `Create Password`,
            pattern: "[A-Za-z0-9]{8,}$",
            error: "Password should only contain letters, numbers, and must have atleast 8 characters.",
            label: "Password",
            required: true
        },
        {
            id: 4,
            name: "confirm_password",
            type: "password",
            placeholder: `Re-type Password`,
            pattern: user.password,
            error: "Sorry, this password does not match.",
            label: "Confirm Password",
            required: true
        }
    ];

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:5000/register", {...user}, {withCredentials: true})

            if(data) {
                if(data.errors) {
                    const { username, password } = data.errors;

                    if(username) initializeError(username);
                        else if(password) initializeError(password);
                } else {
                    if (user.username !== "" && user.email !== "" && user.password !== "" && user.confirm_password !== "") {
                        toast.success(user.username + "'s account has been created. You will be redirected to the sign in page shortly.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });

                        await timeout(4000).then(() => {
                            navigate("/login");
                        })
                    } else {
                        toast.error("There was an error creating this account.", {
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
            toast.error("There was an error creating this account.", {
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
    }; 

    const classes = useStyles();

    console.log(user);

    return (
        <PageContainer>
            <ImageContainer>
                <img src={SignUpIllustration} alt="" />
            </ImageContainer>
            <MainContainer>
                <Title>Create User Account</Title>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

                <Form onSubmit={handleSubmit} className='p-12'>
                    <TextField
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        variant="standard"
                        sx={{
                            marginBottom: 2
                        }}
                    />

                    <TextField
                        label="Email Address"
                        name="email"
                        value={user.email}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        variant="standard"
                        sx={{
                            marginBottom: 2
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        variant="standard"
                        sx={{
                            marginBottom: 2
                        }} 
                    />

                    <TextField
                        label="Confirm Password"
                        name="confirm_password"
                        type="password"
                        value={user.confirm_password}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        variant="standard"
                        sx={{
                            marginBottom: 2
                        }}
                    />

                    <TextField
                        label="Select Level"
                        name="level"
                        value={user.level}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        variant="standard"
                        select
                        sx={{
                            marginBottom: 4
                        }}
                    >
                        <MenuItem value={10}>Beginner</MenuItem>
                        <MenuItem value={20}>Intermediate</MenuItem>
                        <MenuItem value={30}>Advanced</MenuItem>
                    </TextField>

                    <Description>
                        Joining us as a Coach? Sign up <a className="font-semibold hover:text-paragraph hover:cursor-pointer">here!</a>
                    </Description>
                    
                    <ButtonsContainer>
                        <Button type="submit" theme="filled" text="Create Account" />
                    </ButtonsContainer>

                    {/* 
                    <ThemeProvider theme={theme}>
                        <TextField
                            label="Username"
                            name="username"
                            value={user.username}
                            onChange={onChangeHandler}
                            required
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                        label="Email Address"
                        name="email"
                        value={user.email}
                        onChange={onChangeHandler}
                        required
                        fullWidth
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={onChangeHandler}
                            required
                            fullWidth
                            sx={{
                                marginBottom: 3
                            }} 
                        />

                        <TextField
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
                            value={user.confirm_password}
                            onChange={onChangeHandler}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Select Level"
                            name="level"
                            value={user.level}
                            onChange={onChangeHandler}
                            required
                            fullWidth
                            select
                        >
                            <MenuItem value={10}>Beginner</MenuItem>
                            <MenuItem value={20}>Intermediate</MenuItem>
                            <MenuItem value={30}>Advanced</MenuItem>
                        </TextField>

                        <Button type="submit" theme="filled" text="Create Account" />
                    </ThemeProvider>
                    */}
                </Form>
            </MainContainer>
        </PageContainer>
    )
}
