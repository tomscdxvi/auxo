import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Footer } from '../../components/footer';
import { FormInput } from '../../components/form';
import { Button }   from '../../components/button';
import { SCREENS } from '../../components/responsive';
import '../../styles/register/main.css';
import SignInIllustration from '../../../assets/images/signinillustration.png';

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
    width: 502px;
    margin-top: 8%;
    margin-bottom: 16.50%;
    ${tw`
        flex
        flex-col
    `}
`;

const Title = styled.h1`
    ${tw`
        font-bold
        text-headline
        mb-4
        xlarge:text-xl 
        xlarge:leading-relaxed
    `}
`;

const Form = styled.form`
    z-index: 1;
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
    z-index: 1;
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
    width: 44%;
    position: absolute;
    top: 72.9%;
    left: 56%;
    z-index: 1;
    visibility: hidden;
    ${tw`
        text-headline
        xlarge:visible
    `}
`

const ImageContainer = styled.div`
    width: auto;
    height: 28em;
    right: 20em;
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

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    }

    // Cookies for JWT authorization
    const [ cookies, setCookies, removeCookie ] = useCookies([]);

    const [ data, setData ] = useState([]);

    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    
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

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: `Username`,
            label: "Username",
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: `Password`,
            label: "Password",
        },
    ];

    const onChangeHandler = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    };

    const storeUserId = (value) => {
        try {
            localStorage.setItem('@storage_user', value);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:5000/login", {...values}, {withCredentials: true})

            if(data) {
                if(data.errors) {
                    const { username, password } = data.errors;

                    if(username) initializeError(username);
                        else if(password) initializeError(password);
                } else {
                    if (values.username !==  "" && values.password !== "") {
                        toast.success("Welcome back, " + values.username + ". You will be redirected to your user home page shortly.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });

                        storeUserId(data);

                        /* const { user } = await axios.get("http://localhost:5000/user", {withCredentials: true});

                        console.log(user.user._id); */

                        await timeout(2000).then(() => {
                            navigate("/home");
                        })
                    } else {
                        toast.error("An error occured while trying to login to this account.", {
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
            toast.error("An error occured while trying to login to this account.", {
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

        /* 
        axios(options).then(res => {
            console.log(values.username)

            if (values.username !==  "" && values.password !== "") {
                toast.success("Logged in.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            } else {
                toast.error("Error was found when trying to sign in, please double check your username and password.", {
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
        }).catch((error) => {
            toast.error("Error was found when trying to sign in, please double check your username and password.", {
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
        }) */
    }; 

    useEffect(() => {
        const keyDownHandler = (event) => {
          console.log('User pressed: ', event.key);
    
          if (event.key === 'Enter') {

            event.preventDefault(event);
            // 👇️ call submit function here

            handleSubmit();
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);
    
        return () => {
          document.removeEventListener('keydown', keyDownHandler);
        };
      }, []);

    return (
        <PageContainer>
            <ImageContainer>
                <img src={SignInIllustration} alt="" />
            </ImageContainer>
            <HorizontalLine />
            <MainContainer>
                <Title>Sign In</Title>

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

                <Form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.which === 13) { handleSubmit(); }}}> 
                    <FormContainer>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChangeHandler} />
                        ))}
                    </FormContainer>
                    <ButtonsContainer>
                        <Link to="/">
                            <Button theme="outline" text="Cancel" />
                        </Link>

                        <Button theme="filled" text="Sign In" /> 
                    </ButtonsContainer>
                </Form>
            </MainContainer>
            <FooterContainer>
                <Footer />
            </FooterContainer>
        </PageContainer>
    )
}