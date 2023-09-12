import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import '../../styles/font.css';
import '../../styles/home/main.css'

import { SignIn } from '../sign-in';
import { Button } from '../button';

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
        transition
        duration-200
        ease-in-out
        hover:underline
    `}
`;

const SignUpItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-1
        medium:mr-12
        cursor-pointer
        transition
        duration-200
        ease-in-out
        hover:underline
        p-2
    `}
`;


export function NavItems(props) {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    const [ isOpen, setIsOpen ] = useState(false);
    const [ open, setOpen ] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if(isMobile) {
        return (
            <ListContainerMobile>
                
            </ListContainerMobile>
        )
    }; 

    return (
        <ListContainer>
            {/*
            <SignUpItem>
                <Link to="/register" className='home-link'>Sign up</Link>
            </SignUpItem> */}

            <SignInItem>
                <Button theme="filled" text="Sign In" onClick={handleClickOpen} />
                <SignIn signInOpen={open} handleClose={handleClose} />
            </SignInItem>

            {/* <SignUpItem>
                <Link to="/track">Track</Link>
            </SignUpItem> */}
        </ListContainer>
    )
}

export function NavItemsDark() {
    return (
        <ListContainer>
            <SignUpItem style={{ color: 'white' }}>
                <Link to="/register">Sign up</Link>
            </SignUpItem>

            <SignInItem style={{ color: 'white' }}>
                <Link to="/login">Sign in</Link>
            </SignInItem>

            {/* <SignUpItem style={{ color: 'white' }}>
                <Link to="/track">Track</Link>
            </SignUpItem> */}
        </ListContainer>
    )
}

export function NavItemsLoggedIn(props) {

    const navigate = useNavigate();

    const { onClick } = props;

    return (
        <ListContainer>
            <SignUpItem style={{ color: 'white' }}>
                <Link to="/register">Account Details</Link>
            </SignUpItem>

            <SignUpItem style={{ color: 'white' }}>
                <Link to="/register">Track Workout</Link>
            </SignUpItem>

            <SignUpItem style={{ color: 'white' }}>
                <Link to="/register">View Plans</Link>
            </SignUpItem>

            <SignUpItem style={{ color: 'white' }}>
                <Link to="/register">Calculate</Link>
            </SignUpItem>

            <SignInItem style={{ color: 'white' }} onClick={onClick}>
                Log Out
            </SignInItem>

            {/* <SignUpItem style={{ color: 'white' }}>
                <Link to="/track">Track</Link>
            </SignUpItem> */}
        </ListContainer>
    )
}
