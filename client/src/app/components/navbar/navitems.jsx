import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { Box, FormControl, InputLabel, Menu, MenuItem, Modal, Select, TextField, Typography, Pagination, Stack } from '@mui/material';

import { SCREENS } from '../responsive';
import '../../styles/home/main.css';

import { SignIn } from '../sign-in';
import { Button } from '../button';
import { SignUp } from '../sign-up';


const ListContainer = styled.ul`
    ${tw`
        pt-9
        flex
        list-none
    `}
`;

const ListContainerMobile = styled.ul`
    visibility: hidden;
`

const ListContainerLoggedIn = styled.ul`
    ${tw`
        mt-32
        list-none
    `}
`;

const SignInItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        mt-3
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        medium:mr-12
        cursor-pointer
        hover:transition
        hover:duration-200
        hover:ease-in-out
        hover:bg-gray-background
        hover:no-underline
    `}
`;

const SignUpItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        mt-3
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        medium:mr-12
        cursor-pointer
        hover:transition
        hover:duration-200
        hover:ease-in-out
        hover:no-underline
    `}
`;

const LogOutItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    margin-top: 24px;
    ${tw`
        text-lg
        medium:text-xl
        text-black
        font-bold
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        rounded-md
        p-2
    `}
`;

const NavItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    margin-top: 24px;
    ${tw`
        text-lg
        medium:text-xl
        text-black
        font-bold
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        rounded-md
        p-2
    `}
`;


export function NavItems() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    const [ open, setOpen ] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const [ signUpOpen, setSignUpOpen ] = useState(false);
    
    const handleSignUpClose = () => {
        setSignUpOpen(false);
    }

    if(isMobile) {
        return (
            <ListContainerMobile>
                <SignInItem>
                </SignInItem>
            </ListContainerMobile> 
        )
    }; 

    return (
        <ListContainer>

            <SignInItem>
                <Button theme="filled" text="Sign In" className="font-bold mr-8" onClick={() => setOpen(true)} />
                <SignIn open={open} handleClose={handleClose} />
                <Button theme="outline" text="Sign Up" className="font-bold" onClick={() => setSignUpOpen(true)} />
                <SignUp open={signUpOpen} handleSignUpClose={handleSignUpClose} />
            </SignInItem>
        </ListContainer>
    )
}

export function NavItemsDark() {

    const navigate = useNavigate();

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    const [ open, setOpen ] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const [ signUpOpen, setSignUpOpen ] = useState(false);
    
    const handleSignUpClose = () => {
        setSignUpOpen(false);
    }

    if(isMobile) {
        return (
            <ListContainerMobile>
                <SignInItem>
                </SignInItem>
            </ListContainerMobile> 
        )
    }; 

    return (
        <ListContainer>
            <SignUpItem>
                <Button theme="text" text="Sign Up" className="font-bold" onClick={() => navigate("/register")} />
            </SignUpItem>

            <SignInItem>
                <Button theme="filled" text="Sign In" className="font-bold mr-8" onClick={() => setOpen(true)} />
                <SignIn open={open} handleClose={handleClose} />
            </SignInItem>
        </ListContainer>
    )
}

export function NavItemsLoggedIn() {

    const navigate = useNavigate();

    // Cookies for JWT authorization
    const [ cookies, setCookies, removeCookie ] = useCookies([]);

    // Log out modal
    const [ logOutModalOpen, setLogOutModalOpen ] = useState(false);
    const handleLogOutModal = (e) => {

        e.preventDefault();

        setLogOutModalOpen(true);
    }

    // Log out Modal
    const handleLogOutModalClose = (e) => {

        e.preventDefault();

        setLogOutModalOpen(false);
    }

    // Handle logout function 
    const handleLogOut = () => {
        removeCookie("jwt");
        localStorage.removeItem('@storage_user');
        
        navigate("/");
    };

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

    return (
        <ListContainerLoggedIn>
            <Link to="/home" className='auth-link'>
                <NavItem>
                    Dashboard
                </NavItem>
            </Link>

            <Link to="/track" className='auth-link'>
                <NavItem>
                    Track
                </NavItem>
            </Link>

            <Link to="/plan" className='auth-link'>
                <NavItem>
                    Playbook
                </NavItem>
            </Link>

            <Link to="/calculate" className='auth-link'>
                <NavItem>
                    Calculate
                </NavItem>
            </Link>

            <LogOutItem onClick={handleLogOutModal}>
                Log Out
            </LogOutItem>

            <Modal
                open={logOutModalOpen}
                onClose={handleLogOutModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Log Out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you wish to log out of this account?
                    </Typography>
                    <div className="flex mt-12">
                        <Button theme="outline-white" text="Back" onClick={handleLogOutModalClose} className="mr-9" /> 
                        <Button theme="filled" text="Confirm" className="mr-9" onClick={handleLogOut} /> 
                    </div>
                </Box>
            </Modal>

            {/* <NavItem style={{ color: 'white' }}>
                <Link to="/track">Track</Link>
            </NavItem> */}
        </ListContainerLoggedIn>
    )
}
