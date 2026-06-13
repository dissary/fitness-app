import { Button, Container, Badge, Col, Row, Card } from "react-bootstrap"
import { useContext, useState } from "react";
import { WorkoutContext } from "../contexts/WorkoutContext";
import WorkoutCard from "../components/WorkoutCard";

export default function Home() {
    const workouts = useContext(WorkoutContext).workouts;

    const [selectedDay, setSelectedDay] = useState("");
    
    const filteredWorkouts =
        selectedDay === "" ? workouts : workouts.filter(
                  (workout) => workout.day === selectedDay
              );

    return (
        <Container>
            <h1 className="rounded bg-dark text-white my-3 p-2 text-center">All Workouts</h1>
            <Col className="d-flex flex-wrap gap-2">
                <Button variant="dark" onClick={() => setSelectedDay("")}>All</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Monday")}>Monday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Tuesday")}>Tuesday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Wednesday")}>Wednesday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Thursday")}>Thursday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Friday")}>Friday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Saturday")}>Saturday</Button>
                <Button variant="dark" onClick={() => setSelectedDay("Sunday")}>Sunday</Button>
            </Col>
            <Row>
                <CardGroup workouts={filteredWorkouts}/>
            </Row>
        </Container>
    )
}

function CardGroup({workouts}) {
    return workouts.map((workout) => {
        return(
            <Col lg={4} key={workout.id}>
                <WorkoutCard workout={workout}/>
            </Col>
        )
    })
}