import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { WorkoutContext } from "../contexts/WorkoutContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EditWorkout() {
    const setWorkouts = useContext(WorkoutContext).setWorkouts;
    const workouts = useContext(WorkoutContext).workouts;
    const navigate = useNavigate();
    const id = parseInt(useParams().id);
    const currentWorkout = workouts.filter((workout) => workout.id === id)[0];
    const [day, setDay] = useState(currentWorkout.day)
    const [title, setTitle] = useState(currentWorkout.title);
    const [description, setDescription] = useState(currentWorkout.description);
    const [completed, setCompleted] = useState(currentWorkout.completed);

    function updateWorkout(event) {
        event.preventDefault();
        const updatedWorkout = workouts.map((workout) => {
            if(workout.id === id) {
                return {id, day, title, description, completed};
            }
            return workout;
        });
        setWorkouts(updatedWorkout);
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Edit Workout</h1>
            <Form onSubmit={updateWorkout}>
                <Form.Group className="mb-3" controlId="day">
                    <Form.Label className="fw-bold">Workout Day</Form.Label>
                    <Form.Select 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                        className="shadow border-dark"
                        required>
                        <option value="">Choose Your Workout Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label className="fw-bold">Workout Title</Form.Label>
                    <Form.Control
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Push / Pull / Leg Day"
                    className="shadow border-dark"
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="fw-bold">Workout Description</Form.Label>
                    <Form.Control
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    row={3}
                    placeholder="Control the weights, don't rush your reps."
                    className="shadow border-dark"
                    required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Finish your workout?"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}