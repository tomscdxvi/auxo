import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

const BaseButton = styled.button`
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
        m-3
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

    const { theme, text } = props;

    if(theme === "filled") {
        return <FilledButton>{text}</FilledButton>
    } else {
        return <OutlinedButton>{text}</OutlinedButton>
    }
}