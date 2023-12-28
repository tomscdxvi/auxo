import { React, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import "../../styles/form.css";
import "../../styles/font.css";
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';


const FormContainer = styled.div`
    ${tw`
        p-6
    `}
`;

const MobileFormContainer = styled.div`
    ${tw`
        p-0
    `}
`;

const MobileLabel = styled.h1`
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 16px;
    ${tw`
        mt-6
        text-headline
        font-bold
    `}
`

const Label = styled.h1`
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 24px;
    ${tw`
        text-headline
        tracking-wider
        font-bold
    `}
`

const MobileSpan = styled.span`
    color: #DA1E28;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
    ${tw`
        items-center
        hidden
    `}
`

const Span = styled.span`
    color: #DA1E28;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
    ${tw`
        items-center
        hidden
    `}
`

export function FormInput(props) {

    const [focus, setFocus] = useState(false);

    const { label, onChange, onClick, id, error, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocus(true);
    };

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        return (
            <MobileFormContainer>
                <MobileLabel>{label}</MobileLabel>
                <input 
                    className="input-form !w-[250px] mt-1 mb-2" 
                    onChange={onChange} 
                    onBlur={handleFocus} 
                    focus={focus.toString()} 
                    {...inputProps} 
                /> 
                <MobileSpan>{error}</MobileSpan>
            </MobileFormContainer>
        )
    }

    return (
        <FormContainer>
            <Label>{label}</Label>
            <input 
                className="input-form" 
                onChange={onChange} 
                onBlur={handleFocus} 
                focus={focus.toString()} 
                {...inputProps} 
            /> 
            <Span>{error}</Span>
        </FormContainer>
    )
}

export function FormInputDark(props) {
    const [focus, setFocus] = useState(false);

    const { label, onChange, id, error, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocus(true);
    };

    return (
        <FormContainer>
            <Label style={{ color: 'white' }}>{label}</Label>
            <input 
                className="input-form" 
                onChange={onChange} 
                onBlur={handleFocus} 
                focus={focus.toString()} 
                {...inputProps} 
            /> 
            <Span style={{ color: 'white' }}>{error}</Span>
        </FormContainer>
    )
}

export function FormInputCalculate(props) {
    const [focus, setFocus] = useState(false);

    const { label, onChange, id, error, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocus(true);
    };

    return (
        <FormContainer>
            <Label style={{ color: 'white' }}>{label}</Label>
            <input 
                className="input-form" 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                focus={focus.toString()} 
            /> 
            <Span style={{ color: 'white' }}>{error}</Span>
        </FormContainer>
    )
}