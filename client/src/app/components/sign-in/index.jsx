import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
import '../../styles/register/main.css';
import { SignUp } from '../sign-up';

const Form = styled.form`
    z-index: 1;
    ${tw`
        text-xs
        overflow-hidden
        max-h-full
        p-2
        xlarge:text-lg
    `}
`;

const MobileForm = styled.form`
    z-index: 1;
    ${tw`
        text-xs
        overflow-hidden
        max-h-full
        xlarge:text-lg
    `}
`;

export function SignIn(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    const { open, handleClose, selected } = props;

    const checkForRegisterLocation = () => {
        if (location.pathname === "/register") {
            handleClose(); // Close the modal if already on /register
        } else {
            handleClose(); // Close the modal
            navigate("/register"); // Navigate to /register if not already there
        }
    };

    // Cookies for JWT authorization
    const [ cookies, setCookies, removeCookie ] = useCookies([]);

    const [ data, setData ] = useState([]);

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [passwordType, setPasswordType] = useState("password");
    
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
            label: "Username",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: `Password`,
            label: "Password",
        }
    ];

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const { data } = await axios.post("http://localhost:5000/login", { ...values }, { withCredentials: true });
    
            if (data) {
                if (data.errors) {
                    // Handle errors here (username, password, etc.)
                } else {
                    // Handle success (set cookies and redirect to /home)
                    toast.success(`Welcome back, ${values.username}!`);
                    navigate("/home");  // Redirect to /home after successful login
                }
            }
        } catch (error) {
            toast.error("An error occurred during login.");
        }
    };
    
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default action (form submission)
            handleSubmit(e); // Call handleSubmit when Enter key is pressed
        }
    };

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Sign In</DialogTitle>
                <DialogContent>
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

                    <MobileForm onSubmit={handleSubmit}> 
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChangeHandler} />
                        ))}
                        <DialogContentText>
                            No account? Sign-up <a onClick={checkForRegisterLocation} className="hover:text-paragraph hover:cursor-pointer">here!</a>
                        </DialogContentText>
                        <DialogActions className="mt-4">
                            <Button theme="outline" text="Cancel" onClick={handleClose} />
                            <Button theme="filled" type="submit" text="Sign In" /> 
                        </DialogActions>
                    </MobileForm>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle className="p-4">Sign In</DialogTitle>
            <DialogContent>
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

                <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}> 
                    {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChangeHandler} />
                    ))}
                    <DialogContentText>
                        <div>
                            No account? Sign-up <a onClick={checkForRegisterLocation} className="hover:text-paragraph hover:cursor-pointer">here!</a>
                        </div>
                    </DialogContentText>
                    <DialogActions className="m-3 mt-4">
                        <Button theme="outline" text="Cancel" onClick={handleClose} />
                        <Button theme="filled" type="submit" text="Sign In" /> 
                    </DialogActions>
                </Form>
            </DialogContent>
        </Dialog>
    )
}