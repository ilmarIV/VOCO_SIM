import {useCourses } from '../context/CurrentYearsCoursesContext'
import { useGameState } from '../context/GameStateContext';

// testing ground for ilmar(and others)
function TestPage () {
    const { completeCourse } = useCourses();
    const { selectField, finishYear, currentYear } = useGameState();
    
    return (
        <div className='p-4 space-x-4'>

            {/* Display current year */}
            <p className="text-lg font-bold text-white">Current Year: {currentYear}</p>

            {/* Button to select IT Person field */}
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => selectField("it person")}
            >
                Select IT Person Field
            </button>

            {/* Button to complete Maths course */}
            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => completeCourse("maths")}
            >
                Complete maths
            </button>

            {/* Button to complete programming course */}
            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => completeCourse("programming")}
            >
                Complete programming
            </button>

            {/* Button to complete english course */}
            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => completeCourse("english")}
            >
                Complete english
            </button>

            {/* Button to complete Databases course */}
            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => completeCourse("databases")}
            >
                Complete databases
            </button>

            {/* finish current year in school */}
            <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={finishYear}
            >
                Finish Year
            </button>

        </div>
    );
}

export default TestPage;