import Image from 'next/image'

import logo from '../../public/logo.jpeg'
import styles from './page.module.css'
import { socket } from '../socket';
import { useEffect, useState } from "react";

export default function Home() {

    const [display, setDisplay] = useState(null);
    const [user, setUser] = useState("");

    useEffect(() => {

        setUser(Math.random().toString(36).substring(2,10));

        function onHide() {
            setDisplay(null);
        }

        function onShow(question) {
            setDisplay(question);
        }

        socket.on('NODE HIDE', onHide);
        socket.on('NODE SHOW', onShow);

        return () => {
            socket.off('NODE HIDE', onHide);
            socket.off('NODE SHOW', onShow);
        }

    }, []);

    return (
        <>
            <div className={styles.hero}>
                <h1> Rust Café </h1>
            </div>
            <div className={styles.sub}>
                <h4> Welcome
                    <span style={{"color": "lightgreen"}}>
                        <b> {user}</b>
                    </span>!
                </h4>
            </div>
            { display === null ? <Hide/> : <Show user={user} questionData={display}/> }
        </>
    )
}

function Hide() {
    return <div className={styles.hero}>
        <Image
            src={logo}
            alt={"Coffee cup with rust logo on it"} />
    </div>
}

function Show({ user, questionData }) {

    const {id, question, options} = questionData;

    function handle(event) {
        const chosenAns = event.currentTarget.innerHTML;
        socket.emit('AUD', {
            user,
            questionNumber: id,
            answer: chosenAns
        });
    }

    return <div className={styles.show}>
        <h2> ❓❓ { question } ❓❓ </h2>
        <div className={styles.options}>
            {
                options.map((option, idx) => (
                    <button key={idx} onClick={event => handle(event)}>
                        {option}
                    </button>
                ))
            }
        </div>
    </div>
}