import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import { useCurrentYearsCourses } from "../context/CurrentYearsCoursesContext";
import ModulesData from "../assets/moodulid-game.json";

const TeacherDisplay = ({ teacherId, mood }) => (
  <div className='flex flex-col justify-end'>
    <img
      src={`/teachers/teacher_${teacherId}_${mood}.png`}
      alt='Teacher'
      className='h-100 object-contain'
      onError={(e) => {
        // kui "sad" pilti pole, fallback "happy"
        if (mood !== "happy") e.currentTarget.src = `/teachers/teacher_${teacherId}_happy.png`;
      }}
    />
  </div>
);

const ModuleInfo = ({ name, ekap }) => {
  const buttonClass =
    "px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors";

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
  const { moduleId: moduleIdParam, teacherId: teacherIdParam } = useParams();
  const moduleId = Number(moduleIdParam);
  const teacherId = Number(teacherIdParam);

  const navigate = useNavigate();
  const { completeCourse } = useCurrentYearsCourses();

  const moduleData = useMemo(
    () => ModulesData.modules.find((m) => m.id === moduleId),
    [moduleId]
  );

  const [hasStarted, setHasStarted] = useState(false);
  const [teacherMood, setTeacherMood] = useState("happy");
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerWrong, setIsAnswerWrong] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalQuestions = moduleData?.quiz.questions.length || 0;
  const percentage =
    totalQuestions === 0 ? 0 : (answeredQuestions / totalQuestions) * 100;
  const currentQuestion = moduleData?.quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const validateAnswer = useCallback(
    (userAnswer) => {
      if (!currentQuestion || isTransitioning) return;

      setSelectedAnswer(userAnswer);
      const isCorrect = currentQuestion.answer === userAnswer;

      if (isCorrect) {
        setAnsweredQuestions((prev) => prev + 1);
        setTeacherMood("happy");
        setIsAnswerWrong(false);
        setIsTransitioning(true);

        setTimeout(() => {
          if (isLastQuestion) {
            // märgi õpetaja külastatuks
			const raw = localStorage.getItem("completedTeachers");
			const prev = raw ? JSON.parse(raw) : [];
			if (!prev.includes(teacherId)) {
			localStorage.setItem("completedTeachers", JSON.stringify([...prev, teacherId]));
			}

            // optionally: complete course
            if (moduleData?.name) completeCourse(moduleData.name);

            // tagasi kaardile
            navigate("/map", { replace: true });
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
      currentQuestion,
      isTransitioning,
      isLastQuestion,
      completeCourse,
      moduleData?.name,
      teacherId,
      navigate,
    ]
  );

  if (!hasStarted) {
    return (
      <div className='w-full h-full flex justify-between p-8 pb-0 relative'>
        <TeacherDisplay teacherId={teacherId} mood={teacherMood} />

        <div className='flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl'>
          <div className='bg-white rounded-3xl rounded-bl-none p-6 shadow-lg w-full'>
            <p className='text-gray-800 text-lg'>
              {moduleData?.description || "Kirjeldus"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setHasStarted(true)}
          className='absolute bottom-5 right-10 mb-4 ml-4 px-6 py-3 bg-white font-bold text-black rounded-full hover:bg-gray-400 transition-colors shadow-md cursor-pointer flex items-center gap-2'
        >
          Alusta
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
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

      <TeacherDisplay teacherId={teacherId} mood={teacherMood} />

      <div className='flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl'>
        <div className='bg-white rounded-3xl rounded-bl-none p-6 shadow-lg w-full'>
          <p className='text-gray-800 text-lg'>
            {currentQuestion?.q || "Küsimus"}
          </p>
        </div>

        <div className='grid grid-cols-2 gap-4 w-full'>
          {currentQuestion?.options.map((questionText, index) => (
            <AnswerButton
              key={index}
              text={questionText}
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
