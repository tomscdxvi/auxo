import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import '../../styles/font.css'
import DeleteIcon from '../../../assets/images/remove_icon.png';


const ImageContainer = styled.div`
    img {
        position: absolute;
        left: auto;
        right: 20px;
        top: 25px;
        width: 25px;
        height: 25px;
    }

`;

export function DeleteButton(props) {

    const { onClick } = props;

    return (
        <button onClick={onClick}>
            <ImageContainer>
                <img src={DeleteIcon} alt="" />
            </ImageContainer>
        </button>
    )

}