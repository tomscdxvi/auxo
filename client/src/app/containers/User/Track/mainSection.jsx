import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Typography, Box, FormControl, InputLabel, Menu, MenuItem, Select, TextField, } from '@mui/material';

import { FormInputDark } from '../../../components/form';
import { DarkLogo } from '../../../components/logo';
import { Button }   from '../../../components/button';
import { SCREENS } from '../../../components/responsive';
import SignUpIllustration from '../../../../assets/images/track-illustration.png';
import PlusIcon from '../../../../assets/images/plus-icon.png';
import '../../../styles/authenticatedhome/main.css';
import '../../../styles/font.css'
import TrackForm from 'src/app/components/track';
import { NavItemsLoggedIn } from 'src/app/components/navbar/navitems';
import Sidebar from 'src/app/components/chatbot';

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
        p-12
        mx-auto
    `}
`;

const NavbarContainer = styled.div`
    ${tw`
        pt-10
        flex
        flex-col
        items-center
        fixed
        left-0
        top-0
        h-full
        bg-white
        z-10
        p-4
    `}
`;

// Sidebar stays on the right side of the screen, fixed
const SidebarContainer = styled.div`
    ${tw`
        fixed
        right-0
        top-0
        h-full
        bg-gray-800
        text-white
        p-6
    `}
`;

const MobileListContainer = styled.ul`
    ${tw`
        mt-6
        list-none
    `}
`;

const MobileSignUpItem = styled.li`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        text-lg
        medium:text-xl
        text-paragraph
        font-medium
        mr-8
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
        medium:invisible
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
    const [cookies, setCookies, removeCookie] = useCookies([]);
    const [track, setTrack] = useState({
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        workout: []
    }); 

    const [workout, setWorkout] = useState({
        name: "",
        sets: "",
        reps: "",
        weight: "",
    });

    // Form Steps
    const steps = [
        {
            label: "Workout Date/Time"
        },
        {
            label: "Workout Details"
        }
    ]

    // Forms State 
    const state = {
        index: 0,
        steps: {
            dateTime: {
                valid: false,
                strict: false,
                value: {
                    title: "",
                    date: "",
                    start_time: "",
                    end_time: ""
                },
            },
            workoutDetails: {
                valid: false,
                strict: false,
                name: "",
                sets: "",
                reps: "",
                weight: ""
            }
        }
    }

    const [form, setForm] = useState(state);

    const [workouts, setWorkouts] = useState([]);

    const [ logOutModalOpen, setLogOutModalOpen ] = useState(false);
    const handleLogOutModal = (e) => {

        e.preventDefault();

        setLogOutModalOpen(true);
    }
        
    const handleLogOutModalClose = (e) => {

        e.preventDefault();

        setLogOutModalOpen(false);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('@storage_user');

        try {
            const { data } = await axios.post(`http://localhost:5000/user/${userId}/track`, {...track}, {withCredentials: true})

            if(data) {
                if(data.errors) {
                    const { title  } = data.errors;

                    if(title) initializeError(title);
                } else {
                    if (track.title!== "") {
                        toast.success(track.title + " has been tracked. You will be redirected to your home page shortly.", {
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
                            navigate("/home");
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

    const handleLogOut = () => {
        removeCookie("jwt");
        
        navigate("/");
    };

    const inputs1 = [ // Disabled error message due to image (Fix in a later update)
        {
            id: 1,
            name: "title",
            type: "text",
            placeholder: `Title`,
            // error: "Please refrain from using symbols and spaces around your username, please try again.",
            label: "Title",
            required: true
        },
        {
            id: 2,
            name: "date",
            type: "date",
            label: "Date",
            required: true
        },
        {
            id: 3,
            name: "start_time",
            type: "time",
            label: "Start Time",
            required: true
        },
        {
            id: 4,
            name: "end_time",
            type: "time",
            label: "End Time",
            required: true
        },
    ];

    const inputs2 = [ // Disabled error message due to image (Fix in a later update)
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: `Name`,
        // error: "Please refrain from using symbols and spaces around your username, please try again.",
        label: "Name",
        required: true
    },
    {
        id: 2,
        name: "sets",
        type: "number",
        label: "Sets",
        required: true
    },
    {
        id: 3,
        name: "reps",
        type: "number",
        label: "Reps",
        required: true
    },
    {
        id: 4,
        name: "weight",
        type: "number",
        label: "Weight",
        required: true
    }
    ];

    const inputs3 = [ // Disabled error message due to image (Fix in a later update)
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: `Name`,
        // error: "Please refrain from using symbols and spaces around your username, please try again.",
        label: "Name",
        required: true
    },
    {
        id: 2,
        name: "body_part",
        type: "text",
        label: "Body Part",
        required: true
    },
    {
        id: 3,
        name: "description",
        type: "textarea",
        label: "Description",
        required: true
    },
    {
        id: 4,
        name: "level",
        type: "text",
        label: "Weight",
        required: true
    }
    ];

    const onChangeHandler1 = (e) => {
        setTrack({...track, [e.target.name]: e.target.value})
    }; 

    const onChangeHandler2 = (e) => {
        setWorkout({...workout, [e.target.name]: e.target.value})
    }; 

    const TabPanel = (props) => {
        const { children, tabValue, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={tabValue !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
          >
            {tabValue === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
    }

    const handleAddMore = () => {

    }
      
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }; 

    console.log(track);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    return (
        <>
            <PageContainer>
                <MainContainer>
                    
                    {/* 
                    <Box sx={{ width: '50%', bgcolor: 'background.paper' }} className="rounded-md">
                        <Tabs value={value} onChange={handleTabChange} centered>
                            <Tab label="One" />
                            <Tab label="Two" />
                        </Tabs>
                    </Box> */}

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

                    <TrackForm />
                </MainContainer>

                <Sidebar />
            </PageContainer>
        </>
    )
}