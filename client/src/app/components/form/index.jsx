import { React, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import "../../styles/form.css";


const FormContainer = styled.div`
    ${tw`
        p-6
    `}
`;

const Label = styled.h1`
    font-size: 16px;
    letter-spacing: 0.15px;
    line-height: 24px;
    ${tw`
        text-headline
        font-bold
    `}
`

const Span = styled.span`
    color: #DA1E28;
    font-size: 12px;
    letter-spacing: 0.02em;
    ${tw`
        items-center
        hidden
    `}
`

export default function FormInput(props) {

    const [focus, setFocus] = useState(false);

    const { label, onChange, id, error, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocus(true);
    };

    return (
        <FormContainer>
            <Label>{label}</Label>
            <input 
                className="input-form" 
                {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                focus={focus.toString()} 
            /> 
            <Span>{error}</Span>
        </FormContainer>
    )
}