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

import { FormInputDark } from '../../../components/form';
import { DarkLogo } from '../../../components/logo';
import { Button }   from '../../../components/button';
import { SCREENS } from '../../../components/responsive';
import SignUpIllustration from '../../../../assets/images/track-illustration.png';
import PlusIcon from '../../../../assets/images/plus-icon.png';
import '../../../styles/authenticatedhome/main.css';
import '../../../styles/font.css'
import TrackCard from './Card';
import { Modal, Pagination, Stack, Typography } from '@mui/material';
import { NavItemsLoggedIn } from 'src/app/components/navbar/navitems';
import Sidebar from 'src/app/components/chatbot';
import { WorkInProgress } from 'src/app/components/wip';

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
        relative
    `}
`;

const MainContainer = styled.div`
    width: 1400px;
    ${tw`
        flex
        flex-col
        mx-auto
    `}
`;

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-headline
        mb-4
        tracking-wider
        font-bold
        xlarge:text-3xl 
        xlarge:leading-relaxed
    `}
`;

const TrackContainer = styled.div`
    z-index: 100;
    width: 1004px;
    ${tw`
        grid
        grid-cols-3
        gap-6
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

const LinkContainer = styled.div`
    ${tw`
        cursor-pointer
        transition
        duration-200
        ease-in-out
        p-2
        mr-1
        medium:mr-12
        hover:transition
        hover:duration-200
        hover:ease-in-out
        hover:bg-gray-background
        hover:no-underline
        hover:text-white
    `}
`;

const NavItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-bold
        p-2
        rounded-md
        list-none
    `}
`;

// Set the styles and classes for MUI inputs
const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffffff"
        },
        "& .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ffffff"
        },
        "& .MuiSvgIcon-root": { 
            color: "#ffffff" 
        }
    },
    select: {
        "& .MuiOutlinedInput-input": {
            color: "#ffffff"
        },  
        "&.MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#ffffff"
            },
            "&:hover fieldset": {
                borderColor: "#ffffff"
            },
            "&.Mui-focused fieldset": {
                borderColor: "#ffffff"
            }
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "&:hover .MuiInputLabel-outlined": {
            color: "#ffffff"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#ffffff"
        }
    }
});

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
    const [loading, setLoading] = useState(false);   

    // Data state to store response data from the api
    const [ data, setData ] = useState([]);

    const [ activePage, setActivePage ] = useState(1);
    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(data.length / itemsPerPage)

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

            });
        } catch(error) {
            console.log(error);
        }
    }
    
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

    {/*
    return (
        <>
            <PageContainer>
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

                    <div className="flex items-center justify-between mt-16">
                        <Title>Choose from a variety of different programs!</Title>
                        <LinkContainer>
                            <Link to="/create-program" className='auth-link'>
                                <NavItem>
                                    New
                                </NavItem>
                            </Link>
                        </LinkContainer>
                    </div>
                
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
                            count={numberOfPages} 
                            page={activePage} 
                            onChange={(event, newPage) => {
                                setActivePage(newPage)
                            }}
                            variant="outlined"
                            shape="rounded" 
                            color="primary"
                        />
                    </Stack>    
                </MainContainer>
                <Sidebar />
            </PageContainer>
        </>
    )
    */}

    return (
        <WorkInProgress />
    )
}