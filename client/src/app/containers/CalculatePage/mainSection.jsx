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
import { FormInputDark } from '../../components/form';
import { Button }   from '../../components/button';
import { DarkLogo } from '../../components/logo';
import { SCREENS } from '../../components/responsive';
import SignUpIllustration from '../../../assets/images/calculate-illustration.png'
import '../../styles/authenticatedhome/main.css';
import '../../styles/font.css'

const PageContainer = styled.div`
    ${tw`
        flex
        flex-col
        items-center
        justify-center
        w-full
        large:pl-12
        large:pr-12
        overflow-hidden
    `}
`;

const MainContainer = styled.div`
    width: 502px;
    margin-top: 2%;
    margin-bottom: 5.4%;
    ${tw`
        flex
        flex-col
    `}
`;

const NavbarContainer = styled.div`
    min-height:68px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    ${tw`
        w-full
        min-w-full
        max-w-screen-2xlarge
        flex
        flex-row
        items-center
        pb-8
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
    width: 30%;
    position: absolute;
    top: 71.5%;
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
    height: 28em;
    left: 10em;
    top: 18em;
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

    const handleLogOut = () => {
        removeCookie("jwt");
        localStorage.removeItem('@storage_user');
        
        navigate("/login");
    };

    const onChangeHandlerWeight = (e) => {
        setWeight(e.target.value)
    }; 

    const onChangeHandlerRep = (e) => {
        setRep(e.target.value)
    }

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
                    View Plans
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

    const OneRepMaxCalculation = (e) => {

        var step1 = 0.0278 * rep;
        var step2 = 1.0278 - step1;
        var calculate = weight / step2;

        console.log(calculate);
        console.log("Lift:" + weight);
        console.log("Rep:" + rep);

        return calculate.toFixed(0);

    }

    console.log(data);
    console.log(cookies.jwt);
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
                <NavbarContainer>
                    <DarkLogo />
                    <NavItems />
                </NavbarContainer>
                <PageContainer>
                <Title style={{ fontSize: 30, marginTop: '6%' }}>Calculate your one rep max (1RM) for any lift!</Title>
                <Title style={{ fontSize: 28 }}>Formula from NFPT (Brzycki Equation)</Title>
                <Title style={{ marginTop: "2%" }}>1RM is your max weight that you can lift for a single rep for any exercise.</Title>
                    <ImageContainer>
                        <img src={SignUpIllustration} alt="" />
                    </ImageContainer> 
                    <HorizontalLine /> 
                    <MainContainer>
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

                        <FormContainer>
                            <FormInputDark key={1} name="weight" type="number" placeholder="Enter the weight for the lift" label="Weight" required={true} onChange={onChangeHandlerWeight} />
                            <FormInputDark key={2} name="rep" type="number" placeholder="Enter the number of reps" label="Repetitions" required={true} onChange={onChangeHandlerRep} />
                        </FormContainer>
                        <ButtonsContainer>
                            <Button theme="filled" text="Calculate" onClick={OneRepMaxCalculation} /> 
                        </ButtonsContainer>
                    </MainContainer>
                </PageContainer>
            </>
        )
    }
}