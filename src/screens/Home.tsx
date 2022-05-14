import React from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { Center } from '../components/layout/Center';
import SharkLogo from '../assets/images/SharkLogo.png'
import { useHistory } from "react-router";

export const Home: React.FC = (props) => {
    const history = useHistory();

    const goToCreateGame = () => {
        history.push({ pathname: "/villains-clock/create-game", })
    }

    return <div className='px-5 pt-3'>
        <Center><img src={SharkLogo} /></Center>
        <Center><h1 className='text-center' style={{ color: 'white' }}>Villain Clock</h1></Center>
        <Center><p className='text-center' style={{ color: 'white' }}>Enter a name, join a room and enjoy an exicing game with your friends!</p></Center>
        <Center><Button onClick={goToCreateGame} className='mt-5' variant="primary">Create Game!</Button></Center>
    </div >

}