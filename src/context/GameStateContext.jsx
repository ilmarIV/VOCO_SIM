import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

//main file to share global statuses and navigation triggers in app. keep in mind that specific years courses data is stored in CurrentYearsCoursesContext
const GameStateContext = createContext()
export const useGameState = () => useContext(GameStateContext)

export const GameStateProvider = ({ children }) => {
    const [field, setField] = useState(null);
    const [currentYear, setCurrentYear] = useState(1)
    const [currentRoute, setCurrentRoute] = useState("/");
    const navigate = useNavigate();

    //allows field selection at the start of the game
    const selectField = (fieldName) => setField(fieldName);

    //helper function to change routes
    const goToRoute = (route) => {
        setCurrentRoute(route);
        navigate(route);
    };

    //method to load classroom route when selecting classroom on room plan
    const startCourse = (courseName) => {
        goToRoute("/") // should be replaced with classroom route
    }

    //method to load floor map once course is completed in classroom
    const finishCourse = (courseName) => {
        goToRoute("/") // should be replaced with floorplan route
    }

    //method to increase year
    const finishYear = () => {
        setCurrentYear((prev) => prev + 1)
    }

    return (
        <GameStateContext.Provider
            value={{
                currentYear,
                currentRoute,
                field,
                selectField,
                goToRoute,
                startCourse,
                finishCourse,
                finishYear,
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}