import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

interface props {
    theme: "filled" | "outline";
    text: string;
}

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
        m-1 
        tracking-wider
    `}
`;

const BaseButtonLink = styled.button`
    ${tw`
        outline-none
        text-white
        text-lg
        font-semibold
        border-solid
        border-transparent
        border-2 
        focus:outline-none 
        transition-all
        duration-200
        ease-in-out
    `}
`;

const FilledButton = styled(BaseButton)`
    ${tw`
        bg-button
        text-button-text
    `}
`;

const OutlinedButton = styled(BaseButtonLink)`
    ${tw`
        text-headline
        hover:underline
    `}
`; 

export function Button(props: props) {

    const { theme, text} = props;

    if(theme === "filled") {
        return <FilledButton>{text}</FilledButton>
    } else {
        return <OutlinedButton>{text}</OutlinedButton>
    }
}