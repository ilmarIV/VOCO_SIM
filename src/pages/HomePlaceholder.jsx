//placeholder for / route, remove once actual content is added

import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import subjectData from "../assets/subjects.json";
import { useState, useEffect, useRef } from "react";

function VideoLoader() {
	return (
		<div className='w-full h-full flex items-center justify-center bg-black'>
			<div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
		</div>
	);
}

function VideoPlayer({ src, onEnded, onLoadedData, isIntro }) {
	const videoRef = useRef(null);

	const handleSkip = () => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
		onEnded();
	};

	return (
		<>
			<video
				ref={videoRef}
				className='w-full h-full object-contain'
				autoPlay
				muted
				playsInline
				onEnded={onEnded}
				onLoadedData={onLoadedData}
				onError={(e) => console.error("Video error:", e)}
			>
				<source src={src} type='video/mp4' />
				Your browser does not support the video tag.
			</video>

			<button
				onClick={handleSkip}
				className='absolute bottom-8 right-8 px-6 py-3 bg-white/90 hover:bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer'
			>
				{isIntro ? "Edasi" : "Tagasi Algusesse"}
			</button>
		</>
	);
}

function HomePlaceholder() {
	const navigate = useNavigate();
	const [showIntro, setShowIntro] = useState(
		localStorage.getItem("show_outro") !== "true"
	);
	const [showOutro, setShowOutro] = useState(false);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	useEffect(() => {
		const shouldShowOutro = localStorage.getItem("show_outro");
		if (shouldShowOutro === "true") {
			setShowOutro(true);
			setShowIntro(false);
			localStorage.removeItem("show_outro");
		}
	}, []);

	const handleVideoEnd = () => {
		if (showIntro) {
			setShowIntro(false);
		}
		if (showOutro) {
			setShowOutro(false);
		}
		setIsVideoLoaded(false);
	};

	const handleSubjectClick = (subjectId, subjectDescription) => {
		navigate("/classroom", {
			state: {
				subjectData: { id: subjectId, description: subjectDescription },
			},
		});
	};

	const handleResetProgress = () => {
		if (
			window.confirm("Kas oled kindel, et soovid kõik edusammud lähtestada?")
		) {
			localStorage.clear();
			window.location.reload();
		}
	};

	const [subjects] = useState(() => {
		return Object.entries(subjectData).map(([id, data]) => ({
			id,
			isCompleted: localStorage.getItem(`${id}_completed`) === "true",
			...data,
		}));
	});

	if (showIntro || showOutro) {
		const videoSrc = showIntro ? "/intro.mp4" : "/outro.mp4";

		return (
			<div className='w-full h-full flex items-center justify-center bg-black relative'>
				{!isVideoLoaded && <VideoLoader />}
				<VideoPlayer
					src={videoSrc}
					onEnded={handleVideoEnd}
					onLoadedData={() => setIsVideoLoaded(true)}
					isIntro={showIntro}
				/>
			</div>
		);
	}

	return (
		<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 relative'>
			<div className='max-w-2xl w-full p-8'>
				<h1 className='text-4xl font-bold text-white text-center mb-8'>
					Erialad
				</h1>

				<p className='text-lg text-gray-300 text-center mb-8'>
					Vali endale sobiv eriala, et alustada õpingutega.
				</p>

				<div className='grid grid-cols-1 gap-6'>
					{subjects.map((subject) => (
						<button
							key={subject.id}
							disabled={subject.isCompleted || subject.disabled}
							className='bg-white hover:bg-gray-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left group cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed'
							onClick={() =>
								handleSubjectClick(subject.id, subject.description)
							}
						>
							<div className='flex items-center justify-between'>
								<div className='flex-1'>
									<h2 className='text-2xl font-bold text-gray-800 mb-2'>
										{subject.name}
									</h2>
									{/* <p className='text-gray-600 mb-2'>{subject.description}</p> */}
									<p className='text-sm text-gray-500'>
										Kestus: {subject.years} aastat
									</p>
								</div>
								<FaChevronRight className='text-green-500 text-2xl ml-4 group-hover:translate-x-2 transition-transform' />
							</div>
						</button>
					))}
				</div>
			</div>

			<button
				onClick={handleResetProgress}
				className='absolute bottom-8 right-8 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer'
				title='Lähtesta edusammud'
			>
				Lähtesta
			</button>
		</div>
	);
}

export default HomePlaceholder;
