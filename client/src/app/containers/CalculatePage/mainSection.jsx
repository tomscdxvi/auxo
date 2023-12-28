import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FooterDark } from '../../components/footer';
import { FormInput, FormInputDark } from '../../components/form';
import { Button }   from '../../components/button';
import { DarkLogo } from '../../components/logo';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/calculate-illustration.png'
import '../../styles/authenticatedhome/main.css';
import '../../styles/font.css'
import DefaultToolTip from 'src/app/components/tooltip';
import { Box, Modal, Typography } from '@mui/material';

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
        bg-white
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        mt-6
    `}
`;

const HorizontalLine = styled.hr`
    width: 30%;
    position: absolute;
    top: 70.3%;
    right: 70%;
    z-index: 1;
    visibility: hidden;
    ${tw`
        text-white
        xlarge:visible
    `}
`

const ImageContainer = styled.div`
    width: auto;
    height: 23em;
    left: 23em;
    top: 21em;
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

    // Navigate between pages
    const navigate = useNavigate();

    // Cookies for JWT authorization
    const [ cookies, setCookies, removeCookie ] = useCookies([]);

    // Loading state to check for API call before rendering page.
    const [loading, setLoading] = useState(true);   

    // Data state to store response data from the api
    const [data, setData] = useState([]);

    const [weight, setWeight] = useState(0);

    const [rep, setRep] = useState(0);

    const [ calculation, setCalculation ] = useState({
        weight: 0,
        rep: 0,
        orm: 0
    })

    const [ listOfCalculations, setListOfCalculations ] = useState([]);

    const [ logOutModalOpen, setLogOutModalOpen ] = useState(false);
    const handleLogOutModal = (e) => {

        e.preventDefault();

        setLogOutModalOpen(true);
    }
        
    const handleLogOutModalClose = (e) => {

        e.preventDefault();

        setLogOutModalOpen(false);
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
                // console.log(res);

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

    // Verify User on page load
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

    // Get User data on page load
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

    const handleLogOut = () => {
        removeCookie("jwt");
        
        navigate("/");
    };

    const onChangeHandlerWeight = (e) => {
        setWeight(e.target.value)
        setCalculation((prevState) => {
            return({
                ...prevState, 
                weight: e.target.value
            })
        });
    }; 

    const onChangeHandlerRep = (e) => {
        setRep(e.target.value)
        setCalculation((prevState) => {
            return({
                ...prevState, 
                rep: e.target.value
            })
        });
    }

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
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                        View Plans
                    </SignUpItem>
                </Link>
    
                <Link to="/calculate" className='auth-link'>
                    <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} className='bg-button'>
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

    // Calculates One Rep Max using Brzycki Equation (Formula taken from NFPT)
    const OneRepMaxCalculation = (e) => {

        var step1 = 0.0278 * rep;
        var step2 = 1.0278 - step1;
        var calculate = weight / step2;

        // console.log(listOfCalculations);

        return calculate.toFixed(0);
    }

    // console.log(listOfCalculations)

    // console.log(data);
    // console.log(cookies.jwt);
    // console.log(getCookie("jwt"));

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
                    {/*<ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer> 
                    <HorizontalLine /> */}
                    <MainContainer>
                        <Title style={{ fontSize: 30, marginTop: '6%' }}>Calculate your one rep max (1RM) for any lift!</Title>
                        <Title style={{ fontSize: 28 }}>Formula from NFPT (Brzycki Equation)</Title>
                        <DefaultToolTip
                            content=" RM is your max weight that you can lift for a single rep for any exercise. (Please calculate before saving)"
                            text="Learn more"
                            placement="right"
                            tooltipClass="medium:w-[290px] xlarge:w-[280px] cursor-default"
                            buttonClass="text-white font-normal rounded-full bg-gray-800 outline-black !cursor-default w-[130px] mt-6 mb-4"
                        />
                        <Title>{OneRepMaxCalculation() == 0 ? "_" : OneRepMaxCalculation() + "lbs for 1 Rep"}</Title>
    
                        <ToastContainer
                            position="top-right"
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                        <div>
                            <div className="flex">
                                <FormContainer>
                                    <FormInput
                                        key={1} 
                                        name="weight" 
                                        type="number" 
                                        placeholder="Enter the weight for the lift" 
                                        label="Weight" 
                                        required={true} 
                                        min="1" 
                                        onChange={onChangeHandlerWeight} 
                                        onKeyPress={(event) => { // Prevent negative values from being entered at the start(If the key is not 1-9, do not allow it) !Need to fix
                                            if (!/[1-9]/.test(event.key)) { 
                                                event.preventDefault();
                                            }
                                        }}
                                    />

                                    <FormInput
                                        key={2} 
                                        name="rep" 
                                        type="number"
                                        placeholder="Enter the number of reps" 
                                        label="Repetitions"
                                        min="1" 
                                        required={true} 
                                        onChange={onChangeHandlerRep} 
                                        onKeyPress={(event) => { // Prevent negative values from being entered (If the key is not 1-9, do not allow it)
                                            if (!/[1-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </FormContainer>
                                <div style={{ marginLeft: 40 }}>
                                    <Title style={{ textDecoration: 'underline' }}>History</Title>
                                    {listOfCalculations.map((item, index) => {
                                        if(listOfCalculations === null) {
                                            return (
                                                <Title>There are currently 0 calculations saved.</Title>
                                            )
                                        } else {
                                            return (
                                                <Title key={index}>Rep: {item.rep} | Weight: {item.weight} = {item.orm} for 1 Rep</Title>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div>
                                <ButtonsContainer>
                                    <Button 
                                        theme="filled" 
                                        text="Calculate"
                                        className="mr-[150px]"
                                        onClick={(e) => {
                                            e.preventDefault();

                                            console.log(calculation.orm);
                                            console.log(calculation.weight);
                                            console.log(calculation.rep);

                                            setCalculation((prevState) => {
                                                return({
                                                    ...prevState, 
                                                    orm: OneRepMaxCalculation()
                                                })
                                            });
                                        }} 
                                    /> 
                                    {calculation.orm === 0 ? 
                                        <Button theme="disabled-filled" text="Save" />
                                        :   <Button theme="filled" text="Save"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    {/* Push object into the start of the array*/}
                                                    {/* setListOfCalculations(prevState => [calculation, ...prevState]) */}

                                                    {/* Push object into the end of the array */}

                                                    setListOfCalculations(prevState => [...prevState, calculation])

                                                    setCalculation((prevState) => {
                                                        return({
                                                            ...prevState, 
                                                            orm: 0
                                                        })
                                                    }) 
                                                }} 
                                            /> 
                                    } 
                                </ButtonsContainer>
                            </div>
                        </div>
                    </MainContainer>
                </PageContainer>
            </>
        )
    }
}