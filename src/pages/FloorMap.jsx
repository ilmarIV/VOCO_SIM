import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";
import { useCurrentYearsCourses } from "../context/CurrentYearsCoursesContext";

const CLASSROOM_LOCATIONS = [
	{ top: "6.5%", left: "75.8%", width: "8%", height: "30%" },
	{ top: "28.5%", left: "75.8%", width: "8%", height: "30%" },
	{ top: "46.5%", left: "75.8%", width: "8%", height: "30%" },
	{ top: "67.5%", left: "75.8%", width: "8%", height: "30%" },

	{ top: "2%", left: "15.5%", width: "8%", height: "26%" },
	{ top: "24%", left: "15.5%", width: "8%", height: "26%" },
	{ top: "48%", left: "15.5%", width: "8%", height: "26%" },
	{ top: "70%", left: "15.5%", width: "8%", height: "26%" },

	{ top: "17%", left: "29%", width: "8%", height: "26%" },
	{ top: "17%", left: "38%", width: "8%", height: "26%" },
	{ top: "17%", left: "53.5%", width: "8%", height: "26%" },
	{ top: "17%", left: "62%", width: "8%", height: "26%" },
];

const getShuffledLocations = () => {
	try {
		const stored = localStorage.getItem("classroom_locations");
		if (stored) {
			return JSON.parse(stored);
		}
	} catch (error) {
		console.warn("Failed to load classroom locations:", error);
	}

	const shuffled = [...CLASSROOM_LOCATIONS].sort(() => Math.random() - 0.5);

	try {
		localStorage.setItem("classroom_locations", JSON.stringify(shuffled));
	} catch (error) {
		console.warn("Failed to save classroom locations:", error);
	}

	return shuffled;
};

function FloorMap() {
	const navigate = useNavigate();
	const { courses } = useCurrentYearsCourses();
	const [shuffledLocations] = useState(getShuffledLocations);

	const classrooms = useMemo(() => {
		const selectedLocations = shuffledLocations.slice(0, courses.length);
		return courses
			.map((course, index) => {
				const area = selectedLocations[index];
				if (!area) {
					console.warn(`No location available for course: ${course.name}`);
					return null;
				}
				return {
					id: course.name || `classroom_${index + 1}`,
					moduleData: {
						name: course.name,
						ekap: course.ekap,
						description: course.description,
					},
					quiz: course.quiz || null,
					area,
					isCompleted: course.isCompleted || false,
				};
			})
			.filter(Boolean); // Remove any null entries
	}, [courses, shuffledLocations]); // shuffledLocations is stable but ESLint requires it

	return (
		<div className='relative w-full h-full'>
			{classrooms
				.filter((classroom) => !classroom.isCompleted)
				.map((classroom) => (
					<button
						key={classroom.id}
						className='absolute cursor-pointer flex items-center justify-center'
						style={{
							top: classroom.area.top,
							left: classroom.area.left,
							width: classroom.area.width,
							height: classroom.area.height,
						}}
						onClick={() =>
							navigate(`/classroom`, {
								state: {
									quizData: classroom.quiz,
									moduleData: classroom.moduleData,
								},
							})
						}
					>
						<span className='text-center font-bold text-2xl text-yellow-500 drop-shadow-lg border-2 border-black p-2 rounded-full bg-black/70'>
							<FaExclamation />
						</span>
					</button>
				))}
		</div>
	);
}
export default FloorMap;
