import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FooterDark } from '../../../components/footer';
import { FormInput, FormInputDark } from '../../../components/form';
import { Button }   from '../../../components/button';
import { DarkLogo } from '../../../components/logo';
import { SCREENS } from '../../../components/responsive';
import SignUpIllustration from '../../../../assets/images/calculate-illustration.png'
import '../../../styles/authenticatedhome/main.css';
import '../../../styles/font.css'
import DefaultToolTip from 'src/app/components/tooltip';
import { Box, Modal, Typography } from '@mui/material';
import Loading from 'src/app/components/loading';
import Sidebar from 'src/app/components/chatbot';

// TODO: Save calculations in user DB for persistance

const PageContainer = styled.div`
    min-height: 100vh;
    ${tw`
        flex
        relative
    `}
`;

const MainContainer = styled.div`
    width: 1000px;
    ${tw`
        flex
        flex-col
        mt-12
    `}
`;

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        flex
        justify-center
        items-center
        text-paragraph
        mb-4
        tracking-wider
        font-semibold
        xlarge:text-xl 
        xlarge:leading-relaxed
    `}
`;

const CalculationContainer = styled.div`
    ${tw`
        flex
    `}
`

const FormContainer = styled.div`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    z-index: 100;
    ${tw`
        bg-gray-background
    `}
`;

const ButtonsContainer = styled.div`
    ${tw`
        flex
        justify-start
        items-center
        mt-6
    `}
`;

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

    const getUserData = async () => {
        try {
            setLoading(true);
    
            // Fetch user data and workouts (no need to decode JWT on frontend)
            const response = await axios.get("http://localhost:5000/user/data", { withCredentials: true });
            
            if (response.data) {
                setData(response.data.userDetails);
            }
    
            setTimeout(() => {
                setLoading(false);
            }, 1250);
    
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    

    console.log(data);

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

    return (
        <>
            <PageContainer>
                <MainContainer>
                    <Title style={{ fontSize: 30, marginTop: '6%' }}>Calculate your one rep max (1RM) for any lift!</Title>
                    <div className="flex justify-center items-center">
                        <DefaultToolTip
                            content=" RM is your max weight that you can lift for a single rep for any exercise. The formula is from NFPT (Brzycki Equation)."
                            text="Learn more"
                            placement="right"
                            tooltipClass="medium:w-[290px] xlarge:w-[300px] cursor-default text-paragraph"
                            buttonClass="text-white font-semibold rounded-full bg-gray-800 outline-black !cursor-default w-[130px] mt-6 mb-4"
                        />
                    </div>
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
                    
                    <div className="flex justify-center items-center">
                        <div>
                            <CalculationContainer>
                                <FormContainer>
                                    <FormInput
                                        key={1} 
                                        name="weight" 
                                        type="number" 
                                        placeholder="Enter the weight for the lift" 
                                        label="Weight" 
                                        required={true} 
                                        min="0" 
                                        onChange={onChangeHandlerWeight} 
                                        onKeyPress={(event) => { // Prevent negative values from being entered at the start(If the key is not 1-9, do not allow it) !Need to fix
                                            if (!/[0-9]/.test(event.key)) { 
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
                                        min="0" 
                                        required={true} 
                                        onChange={onChangeHandlerRep} 
                                        onKeyPress={(event) => { // Prevent negative values from being entered (If the key is not 1-9, do not allow it)
                                            if (!/[0-9]/.test(event.key)) {
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
                            </CalculationContainer>
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
                    </div>
                </MainContainer>
                <Sidebar />
            </PageContainer>
        </>
    )
}