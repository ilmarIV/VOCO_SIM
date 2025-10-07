import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useGameState } from "./GameStateContext";
import gameData from "../assets/mock.json";

// context to keep track of current years courses and their completion status, contains logic to increase school year when all subjects are completed
// has implementable method to complete course
const CurrentYearsCoursesContext = createContext();
export const useCurrentYearsCourses = () =>
	useContext(CurrentYearsCoursesContext);

export function CurrentYearsCoursesProvider({ children }) {
	const { program, currentYear, goToRoute, finishYear } = useGameState();
	const [courses, setCourses] = useState([]);

	const coursesYearRef = useRef(currentYear);

	//set courses completed status to true and redirects to floor pan
	//use this affter successful quiz completion
	const completeCourse = (courseName) => {
		setCourses((prev) =>
			prev.map((c) => (c.name === courseName ? { ...c, completed: true } : c))
		);
		goToRoute("/testpage2"); // should be replaced with floor map route
	};

	//load current years courses data, is triggered on program selection and curretYear change
	useEffect(() => {
		if (!program) return;

		const programObj = gameData.fields.find((p) => p.name === program);
		if (!programObj) return;

		const programsCurrentYearsCourses = programObj.courses.filter(
			(c) => Number(c.year) === Number(currentYear)
		);

		const detailedCourses = programsCurrentYearsCourses.map((c) => {
			const courseData = gameData.courses.find((cd) => cd.name === c.name);
			return {
				...courseData,
				completed: false,
			};
		});

		setCourses(detailedCourses);
		coursesYearRef.current = currentYear;
	}, [program, currentYear]);

	// transition to next year when all courses are completed on currentYear, check triggers every time courses array has changes
	useEffect(() => {
		if (courses.length === 0) return;
		if (coursesYearRef.current !== currentYear) return;

		if (courses.every((c) => c.completed)) {
			finishYear();
			coursesYearRef.current = null;
		}
	}, [courses]);

	return (
		<CurrentYearsCoursesContext.Provider value={{ courses, completeCourse }}>
			{children}
		</CurrentYearsCoursesContext.Provider>
	);
}
