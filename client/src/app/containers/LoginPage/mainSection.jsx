import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from '../../components/form';
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
    margin-bottom: 18%;
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
    width: 44%;
    position: absolute;
    top: 77%;
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

export function MainSection() {

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

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
        setUser({...user, [e.target.name]: e.target.value})
    };

    const options = {
        url: "http://localhost:5000/login",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            username: user.username,
            password: user.password,
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios(options).then(res => {
            console.log(user.username)
            if (user.username !== "" && user.password !== "") {
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
        })
    };

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <PageContainer>
                    <MainContainer>
                        <Title style={{ marginLeft: '1.5rem', fontSize: '18px' }}>Create User Account</Title>

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

                        <Form onSubmit={handleSubmit}>
                            <FormContainer style={{ }}>
                                {inputs.map((input) => (
                                    <FormInput key={input.id} {...input} value={user[input.name]} onChange={onChangeHandler} style={{ width: 200}} />
                                ))}
                            </FormContainer>
                            <ButtonsContainer>
                                <Button theme="outline" text="Cancel" />
                                <Button theme="filled" text="Submit" /> 
                            </ButtonsContainer>
                        </Form>
                    </MainContainer>
            </PageContainer>
        )
    }

    console.log(user);

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

                <Form onSubmit={handleSubmit}>
                    <FormContainer>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={user[input.name]} onChange={onChangeHandler} />
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
        </PageContainer>
    )
}