import { useState } from "react";
import { useCourses } from '../context/CurrentYearsCoursesContext';
import ProgressBar from './ProgressBar';
import CurrentYearsCoursesModal from './CurrentYearsCoursesModal';
import { FaScroll } from "react-icons/fa";


// Menu on top right corner that contains progress bar and button to open current years courses modal
function ProgressMenu() {
    const [coursesModalIsOpen, setCoursesModalIsOpen] = useState(false);
    const { courses } = useCourses();

    const completedQuestsCount = courses.filter(course => course.completed).length;
    const completedQuestPercentage = courses.length > 0
        ? Math.round((completedQuestsCount / courses.length) * 100)
        : 0;

    return (
        <div className="absolute top-2 right-2 flex flex-col items-end space-y-2">

            {/* Percentage bar of completed courses */}
            <ProgressBar percentage={completedQuestPercentage} />

            {/* Button to open courses modal */}
            <button
                onClick={() => setCoursesModalIsOpen(true)}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white shadow"
            >
                <FaScroll />
            </button>

            {/* Courses modal component */}
            {coursesModalIsOpen && (
                <CurrentYearsCoursesModal courses={courses} onClose={() => setCoursesModalIsOpen(false)} />
            )}
        </div>
    )
}

export default ProgressMenu;