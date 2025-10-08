import { useState } from "react";
import { useCurrentYearsCourses } from "../context/CurrentYearsCoursesContext";
import ProgressBar from "./ProgressBar";
import CurrentYearsCoursesModal from "./CurrentYearsCoursesModal";
import { FaScroll } from "react-icons/fa";

// Menu on top right corner that contains progress bar and button to open current years courses modal
function ProgressMenu() {
	const [coursesModalIsOpen, setCoursesModalIsOpen] = useState(false);
	const { courses } = useCurrentYearsCourses();

	const completedQuestsCount = courses.filter(
		(course) => course.isCompleted
	).length;
	const completedQuestPercentage =
		courses.length > 0
			? Math.round((completedQuestsCount / courses.length) * 100)
			: 0;

	return (
		<div className='absolute top-50 right-5 flex flex-col items-end space-y-2'>
			{/* Percentage bar of completed courses */}
			<ProgressBar percentage={completedQuestPercentage} />

			{/* Button to open courses modal */}
			<button
				onClick={() => setCoursesModalIsOpen(true)}
				className='p-2 rounded bg-green-400 hover:bg-green-600 text-white shadow cursor-pointer z-2'
			>
				<FaScroll />
			</button>

			{/* Courses modal component */}
			{coursesModalIsOpen && (
				<CurrentYearsCoursesModal
					courses={courses}
					onClose={() => setCoursesModalIsOpen(false)}
				/>
			)}
		</div>
	);
}

export default ProgressMenu;
