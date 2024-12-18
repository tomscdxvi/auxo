import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';

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
