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
import { makeStyles } from '@mui/styles';

import { FormInputDark } from '../../components/form';
import { DarkLogo } from '../../components/logo';
import { Button }   from '../../components/button';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/track-illustration.png';
import PlusIcon from '../../../assets/images/plus-icon.png';
import '../../styles/authenticatedhome/main.css';
import '../../styles/font.css'
import TrackCard from '../PlanPage/Card';
import { Modal, Pagination, Stack, Typography } from '@mui/material';

// TODO: Fix NavBar padding later

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
    `}
`;

const MainContainer = styled.div`
    width: 1605px;
    ${tw`
        flex
        flex-col
        justify-center
        items-center
    `}
`;

const NavbarContainer = styled.div`
    ${tw`
        pt-10
        max-w-screen-2xlarge
        flex
        flex-col
        items-center
        ml-0
    `}
`;

const ListContainer = styled.ul`
    ${tw`
        mt-32
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
        hover:bg-button
        rounded-md
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
        hover:bg-button
        rounded-md
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
    right: 8em;
    top: 25.5em;
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

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    }
}));

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


export function MainSection() {

    const navigate = useNavigate();

    const [value, setValue] = useState(0);
    const [ count, setCount ] = useState(0);
    const [cookies, setCookies, removeCookie] = useCookies([]);

    const [ plan1, setPlan1 ] = useState({
        title: "1x3 Bench Press Plan",
        description: "Increase your bench press numbers!",
        sets: "3",
        reps: "1",
        weight: "225"
    })

    const [ plan2, setPlan2 ] = useState({
        title: "1x3 Squat Plan",
        description: "Increase your squat numbers!",
        sets: "3",
        reps: "1",
        weight: "225"
    })

    const [ plan3, setPlan3 ] = useState({
        title: "8x3 High Reps Biceps Plan",
        description: "Alternating bicep curls.",
        sets: "3",
        reps: "8",
        weight: "30"
    })

    const [ plans, setPlans ] = useState([
        plan1,
        plan2,
        plan3
    ])

    // Loading state to check for API call before rendering page.
    const [loading, setLoading] = useState(true);   

    // Data state to store response data from the api
    const [ data, setData ] = useState([]);

    const [ activePage, setActivePage ] = useState(1);
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(data.data?.history.length / itemsPerPage)

    const [ logOutModalOpen, setLogOutModalOpen ] = useState(false);
    const handleLogOutModal = (e) => {

        e.preventDefault();

        setLogOutModalOpen(true);
    }
        
    const handleLogOutModalClose = (e) => {

        e.preventDefault();

        setLogOutModalOpen(false);
    }

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
                navigate("/");
            } else {
                const { data } = await axios.post(
                    "http://localhost:5000/plan",
                    {},
                    { withCredentials: true }
                );
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

    
    useEffect(() => {
        try {
            getUserData().then(() => {
                // console.log(`The user's id is: ${userId}`);
                // console.log(data); 
            })
        } catch(error) {
            console.log(error);
        } 
    }, []);

    const classes = useStyles();

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

                <Link to="/home" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white' }}>
                        Home
                    </SignUpItem>
                </Link>


                <Link to="/track" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Track Workout
                    </SignUpItem>
                </Link>

    
                <Link to="/plan" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} className='bg-button'>
                        View Plans
                    </SignUpItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Calculate
                    </SignUpItem>
                </Link>
    
                <SignInItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} onClick={handleLogOutModal}>
                    Log Out
                </SignInItem>

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
                <PageContainer>
                    <NavbarContainer>
                        <DarkLogo />
                        <NavItems />
                    </NavbarContainer>
                    {/* <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer> 
                    <HorizontalLine /> */}
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

                        <Title style={{ marginTop: 80 }}>Choose from a variety of different plans catered to you!</Title>
                    
                        <TrackContainer>
                            {plans.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage).map((track) => {
                                if(track === null) {
                                    return (
                                        <Title style={{ fontSize: '16px' }}>Your tracking history is empty, enter your first workout to see your history!</Title>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <TrackCard key={track._id} track={track} count={count} />
                                        </div>
                                    )
                                }
                            })} 
                        </TrackContainer>
                        <Stack spacing={2}>
                            <Pagination 
                                classes={{ ul: classes.ul }}
                                count={numberOfPages} 
                                shape="rounded" 
                                page={activePage} 
                                onChange={(event, newPage) => {
                                    setActivePage(newPage)
                                }}
                            />
                        </Stack>    
                    </MainContainer>
                </PageContainer>
            </>
        )
    }
}