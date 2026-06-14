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
import Login from "./pages/Login";
import logo from "./images/logo-barbell.png"
import "./App.css"
import { useContext } from "react";
import RequireAuth from "./components/RequireAuth";

function Layout() {
    const { token, setToken } = useContext(WorkoutContext);

    function logout() {
      setToken(null)
    }

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
              <Nav className="ms-auto">
                {!token ? (<Nav.Link href="/login">Login</Nav.Link>)
                : (<Nav.Link onClick={logout}>Logout</Nav.Link>
                ) }
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
  const [token, setToken] = useLocalStorage("token",null);

  return (
    <WorkoutContext.Provider value={{workouts, setWorkouts, token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<RequireAuth><Home/></RequireAuth>}/>
            {/* <Route index element={<Home/>}/> */}
            <Route path="add" element={<RequireAuth><AddWorkout/></RequireAuth>}/>
            <Route path="timer" element={<Timer/>}/>
            <Route path="*" element={<ErrorPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="workout/:id" element={<RequireAuth><EditWorkout/></RequireAuth>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </WorkoutContext.Provider>
  )
}