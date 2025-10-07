import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//main file to share global statuses and navigation triggers in app. keep in mind that specific years courses data is stored in CurrentYearsCoursesContext
const GameStateContext = createContext();
export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider = ({ children }) => {
	const [program, setProgram] = useState(null);
	const [currentYear, setCurrentYear] = useState(1);
	const [currentRoute, setCurrentRoute] = useState("/");
	const navigate = useNavigate();

	const selectProgram = (programName) => setProgram(programName); // should be used for field(program) selection at the start of the game

	const goToRoute = (route) => {
		// should be used when route change is neccessary, is already implemented in course completion logic in CurrentYearsCoursesContext
		setCurrentRoute(route);
		navigate(route);
	};

	const finishYear = () => {
		// method to increase year, is used in CurrentYearsCoursesContext after all courses are completed
		setCurrentYear((prev) => prev + 1);
	};

	return (
		<GameStateContext.Provider
			value={{
				currentYear,
				currentRoute,
				program,
				selectProgram,
				goToRoute,
				finishYear,
			}}
		>
			{children}
		</GameStateContext.Provider>
	);
};
