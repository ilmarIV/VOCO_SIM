import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useGameState } from "./GameStateContext";
import gameData from '../assets/mock.json'


// context to keep track of current years courses and their completion status, contains logic to increase school year when all subjects are completed
// has implementable method to complete course
const CurrentYearsCoursesContext = createContext();
export const useCurrentYearsCourses = () => useContext(CurrentYearsCoursesContext);


export function CurrentYearsCoursesProvider ({ children }) {
    const { field, currentYear,finishCourse, finishYear } = useGameState();
    const [courses, setCourses] = useState([]);


    const coursesYearRef = useRef(currentYear);


    //set courses completed status to true
    const completeCourse = (courseName) => {
        setCourses((prev) =>
            prev.map((c) =>
                c.name === courseName ? { ...c, completed: true} : c
            )
        );
        finishCourse();
    };


    //load current years courses data, is triggered on field selection and curretYear change
    useEffect(() => {
        if (!field) return;

        const fieldObj = gameData.fields.find((f) => f.name === field);
        if (!fieldObj) return;

        const fieldsCurrentYearsCourses = fieldObj.courses.filter(
            (c) => Number(c.year) === Number(currentYear)
        );

        const detailedCourses = fieldsCurrentYearsCourses.map(c => {
            const courseData = gameData.courses.find(cd => cd.name === c.name);
            return {
                ...courseData,
                completed: false,
            };
        });

        setCourses(detailedCourses)
        coursesYearRef.current = currentYear;
        
    }, [field, currentYear]);


    // transition to next year when all courses are completed on currentYear, check triggers every time courses array has changes 
    useEffect(() => {
        if (courses.length === 0) return;
        if (coursesYearRef.current !== currentYear) return;

        if (courses.every(c => c.completed)) {
            finishYear();
            coursesYearRef.current = null;
        };

    }, [courses,]);


    return (
        <CurrentYearsCoursesContext.Provider value={{courses, completeCourse}}>
            {children}
        </CurrentYearsCoursesContext.Provider>
    )

}


export function  useCourses() {
    return useContext(CurrentYearsCoursesContext)
}