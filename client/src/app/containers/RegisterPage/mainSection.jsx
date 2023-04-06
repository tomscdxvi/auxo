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
import SignUpIllustration from '../../../assets/images/signupillustration.png'
import '../../styles/register/main.css'

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
    margin-bottom: 3%;
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
    width: 30%;
    position: absolute;
    top: 77%;
    right: 70%;
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
    left: 21em;
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
        email: "",
        password: "",
        confirm_password: ""
    });

    const inputs = [ // Disabled error message due to image (Fix in a later update)
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: `Username`,
            pattern: "^[_A-z0-9]*((-|\s)*[_A-z0-9])*$",
            // error: "Please refrain from using symbols and spaces around your username, please try again.",
            label: "Username",
            required: true
        },
        {
            id: 2,
            name: "email",
            type: "text",
            placeholder: `Email Address`,
            pattern: "^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+[.])+[a-z]{2,5}$",
            error: "Sorry, this email is not valid. Please try again.",
            label: "Email Address",
            required: true
        },
        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: `Create Password`,
            pattern: "[A-Za-z0-9]{8,}$",
            error: "Password should only contain letters, numbers, and must have atleast 8 characters.",
            label: "Password",
            required: true
        },
        {
            id: 4,
            name: "confirm_password",
            type: "password",
            placeholder: `Re-type Password`,
            pattern: user.password,
            error: "Sorry, this password does not match.",
            label: "Confirm Password",
            required: true
        }
    ];

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    };

    const options = {
        url: "http://localhost:5000/register",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
            confirm_password: user.confirm_password
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios(options).then(res => {
            console.log(user.username)
            if (user.username !== "" && user.email !== "" && user.password !== "" && user.confirm_password !== "") {
                toast.success(user.username + " has been created.", {
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
        }).catch((error) => {
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
        });

        console.log(user);
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

    // console.log(user);

    return (
        <PageContainer>
            <ImageContainer>
                <img src={SignUpIllustration} alt="" />
            </ImageContainer>
            <HorizontalLine />
            <MainContainer>
                <Title>Create User Account</Title>

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

                        <Button theme="filled" text="Submit" /> 
                    </ButtonsContainer>
                </Form>
            </MainContainer>
        </PageContainer>
    )
}