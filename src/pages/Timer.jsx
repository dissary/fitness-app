import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Timer() {
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    const startTimer = () => {
        if(timerInterval === null) {
            const intervalID = setInterval(() => {
                setTimer((prevTimer) => prevTimer + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    }

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    }

    const resetTimer = () => {
        clearInterval(timerInterval)
        setTimerInterval(null);
        setTimer(0)
    }

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
    <Container className="d-flex flex-column align-items-center">
        <h1 className="rounded bg-dark text-white my-3 p-2 text-center w-100">
            Timer
        </h1>
        <h2 className="text-center fs-1 mt-3">
            {timer} seconds
        </h2>
        <div className="d-flex gap-2 mt-3">
            <Button className="btn-lg" variant="dark" onClick={startTimer}>
                <i className="bi bi-play"></i>
                Start
            </Button>
            <Button className="btn-lg" variant="dark" onClick={pauseTimer}>
                <i className="bi bi-pause-fill"></i>
                Pause
            </Button>
            <Button className="btn-lg" variant="dark" onClick={resetTimer}>
                <i class="bi bi-arrow-clockwise"></i>
                Reset
            </Button>
        </div>

    </Container>
    )
}