import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import '../../styles/font.css'
import { useMediaQuery } from 'react-responsive';
import { SCREENS } from '../responsive';

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
        text-black
        bg-white
        font-bold
        hover:bg-button
        hover:text-button
        hover:border-button
        hover:transition-all
        hover:duration-300
    `}
`;

const DisabledButton = styled(BaseButton)`
    ${tw`
        text-white
        bg-[#808080]
        opacity-80
        font-bold
    `}
`;

const OutlinedButton = styled(BaseButton)`
    ${tw`
        text-black
        bg-white
        font-bold
        hover:bg-button
        hover:text-white
        hover:transition-all
        hover:duration-300
    `}
`;

const OutlinedWhiteButton = styled(BaseButton)`
    ${tw`
        text-button
        border-button
        font-bold
        bg-white
        hover:bg-button
        hover:text-white
        hover:transition-all
        hover:duration-300
    `}
`;

const MobileBaseButton = styled.button`
    font-family: 'Montserrat', sans-serif;
    ${tw`
        pl-5
        pr-5
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

const MobileFilledButton = styled(MobileBaseButton)`
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

const MobileOutlinedButton = styled(MobileBaseButton)`
    ${tw`
        text-button
        border-button
        hover:bg-button
        hover:text-white
        hover:transition-all
        hover:duration-300
    `}
`;

const TextButton = styled(BaseButton)`
    ${tw`
        text-white
        font-bold
    `}
`;


export function Button(props) {

    const { theme, text, type, className, onClick } = props;

    const isMobile = useMediaQuery({ maxWidth: SCREENS.small});

    if(isMobile) {
        if(theme === "filled") {
            return <MobileFilledButton className={className} onClick={onClick} type={type}>{text}</MobileFilledButton>
        } else {
            return <MobileOutlinedButton onClick={onClick} className={className} type={type}>{text}</MobileOutlinedButton>
        }
    }

    if(theme === "filled") {
        return <FilledButton className={className} onClick={onClick} type={type}>{text}</FilledButton>
    } else if (theme == "outline-white") {
        return <OutlinedWhiteButton onClick={onClick} className={className} type={type}>{text}</OutlinedWhiteButton>
    } else if (theme == "disabled-filled") {
        return <DisabledButton className={className} onClick={onClick} type={type} disabled>{text}</DisabledButton>
    } else if (theme == "text") {
        return <TextButton className={className} onClick={onClick} type={type}>{text}</TextButton>
    } else {
        return <OutlinedButton onClick={onClick} className={className} type={type}>{text}</OutlinedButton>
    }
}