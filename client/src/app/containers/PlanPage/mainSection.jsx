import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { FormInputDark } from '../../components/form';
import { DarkLogo } from '../../components/logo';
import { Button }   from '../../components/button';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/track-illustration.png';
import PlusIcon from '../../../assets/images/plus-icon.png';
import '../../styles/authenticatedhome/main.css';
import '../../styles/font.css'
import TrackCard from '../AuthenticatedHomePage/Card';

// TODO: Fix NavBar padding later

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
    margin-top: 8%;
    margin-bottom: 3.05%;
    ${tw`
        flex
        flex-col
        justify-center
        items-center
    `}
`;

const NavbarContainer = styled.div`
    min-height:68px;

    ${tw`
        w-full
        min-w-full
        max-w-screen-2xlarge
        flex
        flex-row
        items-center
        large:pl-12
        large:pr-12 
        justify-between
    `}
`;

const ListContainer = styled.ul`
    ${tw`
        pt-9
        flex
        list-none
    `}
`;

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

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-white
        mb-4
        tracking-wider
        xlarge:text-xl 
        xlarge:leading-relaxed
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
        flex-wrap
        mt-6
        items-center
        justify-center
    `}
`;

const HorizontalLine = styled.hr`
    width: 37%;
    position: absolute;
    top: 73%;
    right: 0;
    z-index: 1;
    visibility: hidden;
    ${tw`
        text-white
        xlarge:visible
    `}
`

const ImageContainer = styled.div`
    width: auto;
    height: 20em;
    right: 10em;
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

const PlusIconContainer = styled.div`
    width: auto;
    height: 2.5em;
    z-index: 2;
    img {
        width: auto;
        height: 100%;
        max-width: fit-content;
    }

    ${tw`
        medium:visible
    `}
`;

const FooterContainer = styled.div`
    width: 78%;
    position: absolute;
    top: 97.5%;
    text-align: center;
    ${tw`
        text-sm
        text-paragraph
    `}
`

export function MainSection() {

    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [cookies, setCookies, removeCookie] = useCookies([]);

    // Loading state to check for API call before rendering page.
    const [loading, setLoading] = useState(true);   

    // Data state to store response data from the api
    const [ data, setData ] = useState([]);
    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

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

    // Get user data async function
    const getUserData = async () => {
        try {
            // Initially set Loading to true to ensure that the page is loading at the moment
            setLoading(true);

            // Get user id from local storage when it is initially stored when the user logs in
            const userId = localStorage.getItem('@storage_user');

            // Axios get from api route which will find a user by id and return the user's data
            await axios.get(`http://localhost:5000/user/${userId}`).then((res) => {
                // console.log(res.data.history[0].title);

                // Set the data state to hold the response data which is the user's data
                setData(res);

                
                // Now set loading to false to render the page which the data from the api
                setLoading(false);


                /* 
                toast("⭐ Welcome back, " + res.data.username, {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                }); */
            });
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/login");
            } else {
                const { data } = await axios.post(
                    "http://localhost:5000/home",
                    {},
                    { withCredentials: true }
                );
                if(!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else {
                    /* toast("⭐ Welcome back, ", {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    }); */
                }
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);


    useEffect(() => {
        try {
            getUserData().then(() => {
                // console.log(`The user's id is: ${userId}`);
                //console.log(data); 
            })
        } catch(error) {
            console.log(error);
        } 
    }, []);

    const TrackContainer = styled.div`
        z-index: 100;
        width: 1004px;
        ${tw`
            grid
            grid-cols-3
            gap-6
        `}
    `;

    const handleLogOut = () => {
        removeCookie("jwt");
        
        navigate("/");
    };

    const NavItems = () => {
        return (
            <ListContainer>
                <SignUpItem style={{ color: 'white' }}>
                    <Link to="/home" className='auth-link'>Home</Link>
                </SignUpItem>
    
                <SignUpItem style={{ color: 'white' }}>
                    <Link to="/track" className='auth-link'>Track Workout</Link>
                </SignUpItem>
    
                <SignUpItem style={{ color: 'white' }}>
                    <Link to="/plan" className='auth-link'>View Plans</Link>
                </SignUpItem>
    
                <SignUpItem style={{ color: 'white' }}>
                    <Link to="/calculate" className='auth-link'>Calculate</Link>
                </SignUpItem>
    
                <SignInItem style={{ color: 'white' }} onClick={handleLogOut}>
                    Log Out
                </SignInItem>
    
                {/* <SignUpItem style={{ color: 'white' }}>
                    <Link to="/track">Track</Link>
                </SignUpItem> */}
            </ListContainer>
        )
    }

    if(loading) {
        return (
            <>
                <h1>Loading</h1>
            </>
        )
    } else {
        return (
            <>
                <NavbarContainer>
                    <DarkLogo />
                    <NavItems />
                </NavbarContainer>
                <PageContainer>
                    <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer>
                    <HorizontalLine />
                    <MainContainer>
                        
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

                        <Title>Choose from a variety of different plans catered to you!{data.data.username}</Title>
                    
                        <TrackContainer>
                            {data.data.history?.map((track) => {
                                if(track === null) {
                                    return (
                                        <Title style={{ fontSize: '16px' }}>Your tracking history is empty, enter your first workout to see your history!</Title>
                                    )
                                } else {
                                    return (
                                        <TrackCard key={track._id} track={track} />
                                    )
                                }
                            })} 
                        </TrackContainer>

                    </MainContainer>
                </PageContainer>
            </>
        )
    }
}