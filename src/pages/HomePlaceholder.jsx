//placeholder for / route, remove once actual content is added

import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import subjectData from "../assets/subjects.json";
import { useState, useEffect, useRef } from "react";

function HomePlaceholder() {
	const navigate = useNavigate();
	const videoRef = useRef(null);
	const [showIntro, setShowIntro] = useState(
		localStorage.getItem("show_outro") ? false : true
	);
	const [showOutro, setShowOutro] = useState(false);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	useEffect(() => {
		//const hasSeenIntro = localStorage.getItem("has_seen_intro");
		const shouldShowOutro = localStorage.getItem("show_outro");
		console.log(shouldShowOutro);
		if (shouldShowOutro === "true") {
			setShowOutro(true);
			localStorage.removeItem("show_outro");
			/* } else if (!hasSeenIntro) {
			localStorage.setItem("has_seen_intro", "true");
			setShowIntro(true); */
		}
	}, []);

	useEffect(() => {
		if ((showIntro || showOutro) && videoRef.current) {
			videoRef.current.play().catch((error) => {
				console.error("Video autoplay failed:", error);
			});
		}
	}, [showIntro, showOutro]);

	const handleSkipVideo = () => {
		if (showIntro) {
			localStorage.setItem("has_seen_intro", "true");
			setShowIntro(false);
		}
		if (showOutro) {
			setShowOutro(false);
		}
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	const handleVideoEnd = () => {
		if (showIntro) {
			localStorage.setItem("has_seen_intro", "true");
			setShowIntro(false);
		}
		if (showOutro) {
			setShowOutro(false);
		}
	};
	const handleSubjectClick = (subjectId, subjectDescription) => {
		navigate("/classroom", {
			state: {
				subjectData: { id: subjectId, description: subjectDescription },
			},
		});
	};

	const [subjects] = useState(() => {
		return Object.entries(subjectData).map(([id, data]) => ({
			id,
			isCompleted: localStorage.getItem(`${id}_completed`) === "true",
			...data,
		}));
	});

	if (showIntro) {
		return (
			<div className='w-full h-full flex items-center justify-center bg-black relative'>
				{!isVideoLoaded && (
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}
				<video
					ref={videoRef}
					className='w-full h-full object-contain'
					autoPlay
					muted
					playsInline
					onEnded={handleVideoEnd}
					onLoadedData={() => setIsVideoLoaded(true)}
					onError={(e) => console.error("Video error:", e)}
				>
					<source src='/intro.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				<button
					onClick={handleSkipVideo}
					className='absolute bottom-8 right-8 px-6 py-3 bg-white/90 hover:bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer'
				>
					Ei jaksa..
				</button>
			</div>
		);
	}

	if (showOutro) {
		return (
			<div className='w-full h-full flex items-center justify-center bg-black relative'>
				{!isVideoLoaded && (
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
					</div>
				)}
				<video
					ref={videoRef}
					className='w-full h-full object-contain'
					autoPlay
					muted
					playsInline
					onEnded={handleVideoEnd}
					onLoadedData={() => setIsVideoLoaded(true)}
					onError={(e) => console.error("Video error:", e)}
				>
					<source src='/outro.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				<button
					onClick={handleSkipVideo}
					className='absolute bottom-8 right-8 px-6 py-3 bg-white/90 hover:bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer'
				>
					Aitäh!
				</button>
			</div>
		);
	}

	return (
		<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
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
							disabled={subject.isCompleted}
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
		</div>
	);
}

export default HomePlaceholder;
