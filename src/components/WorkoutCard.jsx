import { Card,Badge, Col, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";

export default function WorkoutCard({workout}) {
        const completed = workout.completed;
        const bg = completed ? "success" : "danger";
        const setWorkouts = useContext(WorkoutContext).setWorkouts;

        const deleteWorkout = () => {
            setWorkouts((prevWorkout) =>
            prevWorkout.filter((prevWorkout) => prevWorkout.id !== workout.id)
        )
        }

        return (
                <Card border={bg} className="my-3 shadow border-2">
                    <Card.Header className="fw-bold fs-4 d-flex justify-content-between align-items-center">
                        {workout.title}
                        <Badge bg={bg}>
                            {completed ? "Completed" : "Not Completed"}
                        </Badge>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="fw-bold d-flex justify-content-between">
                        {workout.day}
                        </Card.Title>
                        <Card.Text style={{ whiteSpace: "pre-line" }}>{workout.description}</Card.Text>
                        <Button variant="dark" href={`workout/${workout.id}`}>
                            <i class="bi bi-pencil"></i>
                        </Button>
                        <Button variant="danger" onClick={deleteWorkout} className="ms-2">
                            <i class="bi bi-trash3"></i>
                        </Button>
                    </Card.Body>
                </Card>
        )
}