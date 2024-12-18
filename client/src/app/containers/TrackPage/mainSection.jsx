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

import { FormInputDark } from '../../components/form';
import { DarkLogo } from '../../components/logo';
import { Button }   from '../../components/button';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/track-illustration.png';
import PlusIcon from '../../../assets/images/plus-icon.png';
import '../../styles/authenticatedhome/main.css';
import '../../styles/font.css'
import TrackForm from 'src/app/components/track';

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

const MobileListContainer = styled.ul`
    ${tw`
        mt-6
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

    useEffect(() => {
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/");
            } else {
                const { data } = await axios.post(
                    "http://localhost:5000/track", 
                    {}, 
                    {withCredentials: true}
                );
            }
        };
        verifyUser();
    }, [cookies, navigate, removeCookie]);

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

    const NavItems = () => {
        return (
            <ListContainer>

                <Link to="/home" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white' }}>
                        Home
                    </SignUpItem>
                </Link>


                <Link to="/track" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} className='bg-button'>
                        Track Workout
                    </SignUpItem>
                </Link>

    
                <Link to="/plan" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
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

    const MobileNavItems = () => {
        return (
            <MobileListContainer>
                <Link to="/home" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white' }}>
                        Home
                    </MobileSignUpItem>
                </Link>

                <Link to="/track" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}  className='bg-button'>
                        Track Workout
                    </MobileSignUpItem>
                </Link>

                <Link to="/plan" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }}>
                        View Plans
                    </MobileSignUpItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }}>
                        Calculate
                    </MobileSignUpItem>
                </Link>
    
                <MobileSignUpItem style={{ color: 'bg-button', borderBottom: '2px solid white', marginTop: '24px' }} onClick={handleLogOutModal}>
                    Log Out
                </MobileSignUpItem>

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
            </MobileListContainer>
        )
    }

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

    if (isMobile) {
        return (
            <>
                <NavbarContainer>  
                    <Title         
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        className='bm-burger-button'
                    >
                        =
                    </Title>

                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <MobileNavItems />
                    </Menu>

                    {/* <Menu>
                        <DarkLogo />
                        <MobileNavItems />
                    </Menu> */}
                </NavbarContainer>
                <PageContainer>
                    <NavbarContainer>
                        <DarkLogo />
                        <NavItems />
                    </NavbarContainer>
                    <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer>
                    {/* <HorizontalLine /> */}
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
    
                        {/*
                        <Form onSubmit={handleSubmit}> 
                            <TabPanel tabValue={value} index={0}>
                                <Title>Date/Time</Title>    
                                <FormContainer>
                                    {inputs1.map((input) => (
                                        <FormInputDark key={input.id} {...input} value={track[input.name]} onChange={onChangeHandler1} />
                                    ))}
                                </FormContainer>
                            </TabPanel>
                        
                            <TabPanel tabValue={value} index={1}>
                                <Title>Workout Details</Title>
                                <FormContainer>
                                    {inputs2.map((input) => (
                                        <FormInputDark key={input.id} {...input} value={workout[input.name]} onChange={onChangeHandler2} />
                                    ))}
                                </FormContainer>
                                <button className="text-white text-xl">
                                    +
                                </button>
                            </TabPanel> 
    
                            <ButtonsContainer>
                                <Link to="/">
                                    <Button theme="outline" text="Cancel" />
                                </Link>
    
                                <Button theme="filled" text="Submit" /> 
                            </ButtonsContainer>
                        </Form>  */}
                    </MainContainer>
                </PageContainer>
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
                    <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer>
                    {/* <HorizontalLine /> */}
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
    
                        {/*
                        <Form onSubmit={handleSubmit}> 
                            <TabPanel tabValue={value} index={0}>
                                <Title>Date/Time</Title>    
                                <FormContainer>
                                    {inputs1.map((input) => (
                                        <FormInputDark key={input.id} {...input} value={track[input.name]} onChange={onChangeHandler1} />
                                    ))}
                                </FormContainer>
                            </TabPanel>
                        
                            <TabPanel tabValue={value} index={1}>
                                <Title>Workout Details</Title>
                                <FormContainer>
                                    {inputs2.map((input) => (
                                        <FormInputDark key={input.id} {...input} value={workout[input.name]} onChange={onChangeHandler2} />
                                    ))}
                                </FormContainer>
                                <button className="text-white text-xl">
                                    +
                                </button>
                            </TabPanel> 
    
                            <ButtonsContainer>
                                <Link to="/">
                                    <Button theme="outline" text="Cancel" />
                                </Link>
    
                                <Button theme="filled" text="Submit" /> 
                            </ButtonsContainer>
                        </Form>  */}
                    </MainContainer>
                </PageContainer>
            </>
        )
    }
}