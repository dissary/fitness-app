import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Navbar, Nav } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AddWorkout from "./pages/AddWorkout";
import { useLocalStorage } from "usehooks-ts";
import { WorkoutContext } from "./contexts/WorkoutContext";
import EditWorkout from "./pages/EditWorkout";
import Timer from "./pages/Timer";
import logo from "./images/logo-barbell.png"
import "./App.css"

function Layout() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="fs-2 "><img 
          width="50" 
          height="50" 
          src={logo}
          className="d-inline-block align-top"/> Gym Hood</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/add">Add Workout</Nav.Link>
            <Nav.Link href="/timer">Timer</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </>
  )
}

export default function App() {
  const [workouts, setWorkouts] = useLocalStorage("workouts", []);
  return (
    <WorkoutContext.Provider value={{workouts, setWorkouts}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="add" element={<AddWorkout/>}/>
            <Route path="timer" element={<Timer/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="workout/:id" element={<EditWorkout/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </WorkoutContext.Provider>
  )
}