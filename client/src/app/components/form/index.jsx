import { React, useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro';
import "../../styles/form.css";
import "../../styles/font.css";
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';
import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

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
        text-white
        font-bold
    `}
`;

const Label = styled.h1`
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.15px;
    line-height: 24px;
    ${tw`
        text-white
        tracking-wider
        font-bold
    `}
`;

const MobileSpan = styled.span`
    color: #DA1E28;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
    ${tw`
        items-center
        hidden
    `}
`;

const Span = styled.span`
    color: #DA1E28;
    font-size: 12px;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
    ${tw`
        items-center
        hidden
    `}
`;

export function FormInput(props) {
    const [focus, setFocus] = useState(false);
    const { label, onChange, onClick, id, error, type, options, ...inputProps } = props;
    const handleFocus = (e) => setFocus(true);

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small });

    if (isMobile) {
        if (type === 'select') {
            return (
                <MobileFormContainer>
                    <MobileLabel>{label}</MobileLabel>
                    <FormControl fullWidth>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            onChange={onChange}
                            value={inputProps.value}
                            onBlur={handleFocus}
                            {...inputProps}
                            label={label}
                        >
                            {options?.map((option, idx) => (
                                <MenuItem key={idx} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <MobileSpan>{error}</MobileSpan>
                </MobileFormContainer>
            );
        } else {
            return (
                <MobileFormContainer>
                    <MobileLabel>{label}</MobileLabel>
                    <TextField
                        fullWidth
                        onChange={onChange}
                        onBlur={handleFocus}
                        value={inputProps.value}
                        {...inputProps}
                        error={!!error}
                        helperText={error}
                    />
                </MobileFormContainer>
            );
        }
    }

    // For larger screens
    if (type === 'select') {
        return (
            <FormContainer>
                <Label>{label}</Label>
                <FormControl fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        onChange={onChange}
                        value={inputProps.value}
                        onBlur={handleFocus}
                        {...inputProps}
                        label={label}
                    >
                        {options?.map((option, idx) => (
                            <MenuItem key={idx} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Span>{error}</Span>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            <Label>{label}</Label>
            <TextField
                fullWidth
                onChange={onChange}
                onBlur={handleFocus}
                value={inputProps.value}
                {...inputProps}
                error={!!error}
                helperText={error}
            />
            <Span>{error}</Span>
        </FormContainer>
    );
}

export function FormInputDark(props) {
    const [focus, setFocus] = useState(false);
    const { label, onChange, id, error, type, options, ...inputProps } = props;
    const handleFocus = (e) => setFocus(true);

    return (
        <FormContainer>
            <Label style={{ color: 'white' }}>{label}</Label>
            {type === 'select' ? (
                <FormControl fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        onChange={onChange}
                        value={inputProps.value}
                        onBlur={handleFocus}
                        {...inputProps}
                        label={label}
                    >
                        {options?.map((option, idx) => (
                            <MenuItem key={idx} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                <TextField
                    fullWidth
                    onChange={onChange}
                    onBlur={handleFocus}
                    value={inputProps.value}
                    {...inputProps}
                    error={!!error}
                    helperText={error}
                />
            )}
            <Span style={{ color: 'white' }}>{error}</Span>
        </FormContainer>
    );
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