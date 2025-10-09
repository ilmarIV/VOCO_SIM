import { useState, useCallback, useMemo } from "react";
import ProgressBar from "../components/ProgressBar";
import { useCurrentYearsCourses } from "../context/CurrentYearsCoursesContext";
import { FaChevronRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useGameState } from "../context/GameStateContext";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

const TeacherDisplay = ({ teacherId, mood }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const imageSrc = `/teachers/teacher_${teacherId}_${mood}.png`;

	return (
		<div className='flex flex-col justify-end'>
			<img
				src={imageSrc}
				alt='Teacher'
				className={`h-100 object-contain transition-opacity duration-300 ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
				onLoad={() => setIsLoaded(true)}
				loading='lazy'
			/>
		</div>
	);
};

const ModuleInfo = ({ name, ekap }) => {
	const buttonClass =
		"px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-medium ";

	return (
		<div className='absolute top-4 right-4 flex gap-3'>
			<button className={buttonClass}>{name || "Õppeaine nimetus nt"}</button>
			<button className={buttonClass}>{ekap || ""} EKAP</button>
		</div>
	);
};

const AnswerButton = ({
	text,
	index,
	isSelected,
	isWrong,
	isTransitioning,
	onClick,
}) => {
	const showAsWrong = isSelected && isWrong;
	const showAsCorrect = isSelected && !isWrong && isTransitioning;

	return (
		<button
			onClick={() => onClick(index)}
			disabled={isTransitioning}
			className={`py-3 px-6 rounded-full font-medium transition-all duration-300 shadow-md ${
				showAsWrong
					? "bg-red-500 text-white"
					: showAsCorrect
					? "bg-green-500 text-white scale-105"
					: "bg-white text-gray-800 hover:bg-gray-200"
			} ${
				isTransitioning ? "cursor-not-allowed opacity-75" : "cursor-pointer"
			}`}
		>
			{text}
		</button>
	);
};

function ClassRoom() {
	const location = useLocation();
	const { quizData, moduleData, subjectData } = location.state || {};

	let hasQuiz = !!quizData;

	const { completeCourse } = useCurrentYearsCourses();
	const { selectProgram } = useGameState();

	const [hasStarted, setHasStarted] = useState(false);
	const [teacherMood, setTeacherMood] = useState("happy");
	const [randomTeacher] = useState(() => Math.floor(Math.random() * 4) + 1);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isAnswerWrong, setIsAnswerWrong] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const totalQuestions = quizData?.questions.length || 0;
	const percentage =
		totalQuestions === 0 ? 0 : (answeredQuestions / totalQuestions) * 100;
	const currentQuestion = quizData?.questions[currentQuestionIndex];
	const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

	// Shuffle options and track the correct answer's new position
	const shuffledQuestion = useMemo(() => {
		if (!currentQuestion) return null;

		const optionsWithIndex = currentQuestion.options.map((option, index) => ({
			text: option,
			originalIndex: index,
		}));

		const shuffled = shuffleArray(optionsWithIndex);
		const newCorrectIndex = shuffled.findIndex(
			(item) => item.originalIndex === currentQuestion.answer
		);

		return {
			...currentQuestion,
			shuffledOptions: shuffled,
			correctAnswerIndex: newCorrectIndex,
		};
	}, [currentQuestion]);

	const handleStartWithoutQuiz = (subjectId) => {
		selectProgram(subjectId);
	};

	const validateAnswer = useCallback(
		(userAnswer) => {
			if (!shuffledQuestion || isTransitioning) return;

			setSelectedAnswer(userAnswer);
			const isCorrect = shuffledQuestion.correctAnswerIndex === userAnswer;

			if (isCorrect) {
				setAnsweredQuestions((prev) => prev + 1);
				setTeacherMood("happy");
				setIsAnswerWrong(false);
				setIsTransitioning(true);

				setTimeout(() => {
					if (isLastQuestion) {
						console.log("Quiz completed!");
						completeCourse(moduleData.name);
						setIsTransitioning(false);
						return;
					}

					setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
					setSelectedAnswer(null);
					setIsAnswerWrong(false);
					setIsTransitioning(false);
				}, 1000);
			} else {
				setTeacherMood("sad");
				setIsAnswerWrong(true);
			}
		},
		[
			shuffledQuestion,
			isTransitioning,
			isLastQuestion,
			completeCourse,
			moduleData?.name,
		]
	);

	if (!hasStarted || !hasQuiz) {
		return (
			<div className='w-full h-full flex justify-between p-8 pb-0 relative'>
				<TeacherDisplay teacherId={randomTeacher} mood={teacherMood} />

				<div className='flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl'>
					<div className='bg-white rounded-3xl rounded-bl-none p-6 shadow-lg w-full'>
						<p className='text-gray-800 text-lg'>
							{!hasQuiz
								? subjectData?.description ||
								  "Sellel erialal ei ole veel kursusi."
								: moduleData?.description || "Kirjeldus"}
						</p>
					</div>
				</div>

				<button
					onClick={() => {
						if (hasQuiz) {
							setHasStarted(true);
						} else {
							handleStartWithoutQuiz(subjectData?.id);
						}
					}}
					className='absolute bottom-5 right-10 mb-4 ml-4 px-6 py-3 bg-white font-bold text-black rounded-full hover:bg-gray-400 transition-colors shadow-md cursor-pointer flex items-center gap-2'
				>
					Alusta
					<FaChevronRight />
				</button>
			</div>
		);
	}

	return (
		<div className='w-full h-full flex justify-between p-8 pb-0 relative'>
			<ModuleInfo name={moduleData?.name} ekap={moduleData?.ekap} />

			<div className='flex justify-center flex-col'>
				<ProgressBar percentage={percentage} huge={true} />
			</div>

			<TeacherDisplay teacherId={randomTeacher} mood={teacherMood} />

			<div className='flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl'>
				<div className='bg-white rounded-3xl rounded-bl-none p-6 shadow-lg w-full'>
					<p className='text-gray-800 text-lg'>
						{shuffledQuestion?.q || "Küsimus"}
					</p>
				</div>

				<div className='grid grid-cols-2 gap-4 w-full'>
					{shuffledQuestion?.shuffledOptions.map((option, index) => (
						<AnswerButton
							key={index}
							text={option.text}
							index={index}
							isSelected={selectedAnswer === index}
							isWrong={isAnswerWrong}
							isTransitioning={isTransitioning}
							onClick={validateAnswer}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default ClassRoom;
