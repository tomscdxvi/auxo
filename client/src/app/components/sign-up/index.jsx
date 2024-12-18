import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import { Footer } from '../footer';
import { FormInput } from '../form';
import { Button }   from '../button';
import { SCREENS } from '../responsive';
import '../../styles/register/main.css'
import '../../styles/form.css'
import { SignIn } from '../sign-in';
import { Checkbox } from '@mui/material';


const Label = styled.h1`
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 24px;
    ${tw`
        text-headline
        tracking-wider
        font-bold
        content-center
    `}
`

const SelectContainer = styled.div`
    ${tw`
        p-6
        inline-flex
    `}
`;

const MobileSelectContainer = styled.div`
    ${tw`
        p-0
    `}
`;

const MobileSelectLabel = styled.h1`
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 16px;
    ${tw`
        mt-6
        text-headline
        font-bold
    `}
`

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
    ${tw`
        grid
        grid-cols-2
    `}
`;

const MobileForm = styled.form`
    z-index: 100;
    ${tw`
        text-lg
        overflow-hidden
        max-h-full
        xlarge:text-lg
    `}
`;

const MobileFormContainer = styled.div`
    ${tw`
        grid
        grid-cols-1
    `}
`;

export function SignUp(props) {

    const navigate = useNavigate();

    const { open, handleSignUpClose } = props;

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
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

    // Handle Checkbox State
    const [checked, setChecked] = useState(false);
    const handleCheckbox = (e) => {
        setChecked(e.target.checked);
    } 

    console.log(checked);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        if(checked == false) { // If checked == false, that means this is a regular User account and not a Coach account.
            try {
                const { data } = await axios.post("http://localhost:5000/register", {...user}, {withCredentials: true})
    
                if(data) {
                    if(data.errors) {
                        const { username, password } = data.errors;
    
                        if(username) initializeError(username);
                            else if(password) initializeError(password);
                    } else {
                        if (user.username !== "" && user.email !== "" && user.password !== "" && user.confirm_password !== "") {
                            toast.success(user.username + "'s account has been created and can now sign-in using your account details.", {
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
                                handleSignUpClose();
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
        } else { // Else (This means checked is true), that means this is a Coach account and not a regular User account.
            try {
                const { data } = await axios.post("http://localhost:5000/registerCoach", {...user}, {withCredentials: true})
    
                if(data) {
                    if(data.errors) {
                        const { username, password } = data.errors;
    
                        if(username) initializeError(username);
                            else if(password) initializeError(password);
                    } else {
                        if (user.username !== "" && user.email !== "" && user.password !== "" && user.confirm_password !== "") {
                            toast.success(user.username + "'s account has been created and can now sign-in using your account details.", {
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
                                handleSignUpClose();
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
        }

        /* try {
            const { data } = await axios.post("http://localhost:5000/register", {...user}, {withCredentials: true})

            if(data) {
                if(data.errors) {
                    const { username, password } = data.errors;
                    if(username) {
                        initializeError(username);
                    } else if(password) {
                        initializeError(password);
                    }
                } else {
                    navigate("/track")
                }
            }
        } catch (error) {
            console.log(error);
        } */
    }; 

    console.log(user);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <Dialog open={open} onClose={handleSignUpClose} maxWidth="400px">
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
                <DialogTitle>Create User Account</DialogTitle>
                <DialogContent>
                    <MobileForm onSubmit={handleSubmitForm}>
                        <MobileFormContainer>
                            {inputs.map((input) => (
                                <FormInput key={input.id} {...input} value={user[input.name]} onChange={onChangeHandler} />
                            ))}

                            {/* 
                            <MobileSelectContainer>
                                <MobileSelectLabel>Select your Level</MobileSelectLabel>
                                <select name="level" className="input-form !w-[250px]" onChange={onChangeHandler}>
                                    <option value="" disabled selected hidden>Choose a level...</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </MobileSelectContainer> */}
                        </MobileFormContainer> 

                        <DialogContentText>
                            Already have an account? Sign-in <a onClick={handleSignUpClose} className="hover:text-paragraph hover:cursor-pointer">here!</a>
                        </DialogContentText>
                        <DialogActions className="m-3">
                            <Button theme="outline" text="Cancel" onClick={handleSignUpClose} />
                            <Button theme="filled" type="submit" text="Create" />
                        </DialogActions>
                    </MobileForm>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onClose={handleSignUpClose} maxWidth="400px">
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
            <DialogTitle>Create User Account</DialogTitle>
            <DialogContent>
                <Form onSubmit={handleSubmitForm}>
                    <FormContainer>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={user[input.name]} onChange={onChangeHandler} />
                        ))}
                        
                        {/* }
                        <SelectContainer>
                            <Label>Select your Level</Label>
                            <select name="level" className="input-form" onChange={onChangeHandler}>
                                <option value="" disabled selected hidden>Choose a level...</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </SelectContainer> */}
                        <SelectContainer>
                            <Label>Are you a Coach?</Label>
                            <Checkbox 
                                style={{marginBottom: 7 }}
                                checked={checked}
                                onChange={handleCheckbox}
                            />
                        </SelectContainer>
                    </FormContainer>

                    <DialogContentText>
                        Already have an account? Sign-in <a onClick={handleSignUpClose} className="hover:text-paragraph hover:cursor-pointer">here!</a>
                    </DialogContentText>
                    <DialogActions className="m-3">
                        <Button theme="outline" text="Cancel" onClick={handleSignUpClose} />
                        <Button theme="filled" type="submit" text="Create" />
                    </DialogActions>
                </Form>
            </DialogContent>
        </Dialog>
    )
}