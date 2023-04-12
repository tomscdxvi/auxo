import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import '../../styles/font.css';

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


export function NavItems() {

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <ListContainerMobile>
                
            </ListContainerMobile>
        )
    }; 

    return (
        <ListContainer>
            <SignUpItem>
                <Link to="/register">Sign up</Link>
            </SignUpItem>

            <SignInItem>
                <Link to="/login">Sign in</Link>
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
