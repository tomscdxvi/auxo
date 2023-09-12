import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import '../../styles/font.css'

const BaseButton = styled.button`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        pl-12
        pr-12
        pt-2
        pb-2 
        outline-none
        rounded-md
        text-white
        text-base
        border-solid
        border-transparent
        border-2 
        focus:outline-none 
        transition-all
        duration-200
        ease-in-out
        tracking-wider
    `}
`;

const FilledButton = styled(BaseButton)`
    ${tw`
        text-white
        bg-button
        hover:bg-white
        hover:text-button
        hover:border-button
        hover:transition-all
        hover:duration-300
    `}
`;

const OutlinedButton = styled(BaseButton)`
    ${tw`
        text-button
        border-button
        hover:bg-button
        hover:text-white
        hover:transition-all
        hover:duration-300
    `}
`;

export function Button(props) {

    const { theme, text, type, className, onClick } = props;

    if(theme === "filled") {
        return <FilledButton className={className} onClick={onClick} type={type}>{text}</FilledButton>
    } else {
        return <OutlinedButton onClick={onClick} type={type}>{text}</OutlinedButton>
    }
}