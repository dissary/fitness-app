import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { WorkoutContext } from "../contexts/WorkoutContext";

export default function RequireAuth({ children }) {
    const token = useContext(WorkoutContext).token;

    if(!token) {
        return <Navigate to="/login" replace />
    }
    return children;
}