import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import FloorMap from "./pages/FloorMap";
import ClassRoom from "./pages/ClassRoom";
import HomePlaceholder from "./pages/HomePlaceholder";
import GameWindowWrapper from "./layouts/GameWindowWrapper";

function App() {
	const audioRef = useRef(null);
	const [isMuted, setIsMuted] = useState(() => {
		return localStorage.getItem("music_muted") === "true";
	});

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.3; // Set volume to 30%
			audioRef.current.muted = isMuted;

			// Try to play the audio
			audioRef.current.play().catch((error) => {
				console.log("Autoplay prevented:", error);
			});
		}
	}, [isMuted]);

	const toggleMute = () => {
		const newMutedState = !isMuted;
		setIsMuted(newMutedState);
		localStorage.setItem("music_muted", newMutedState.toString());

		if (audioRef.current) {
			audioRef.current.muted = newMutedState;
			if (!newMutedState) {
				audioRef.current.play().catch((error) => {
					console.log("Play prevented:", error);
				});
			}
		}
	};

	return (
		<>
			<audio ref={audioRef} loop>
				<source src='/music.mp3' type='audio/mpeg' />
				Your browser does not support the audio element.
			</audio>

			<button
				onClick={toggleMute}
				className='fixed top-4 right-4 z-50 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer'
				title={isMuted ? "Unmute music" : "Mute music"}
			>
				{isMuted ? (
					<svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				) : (
					<svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
						<path
							fillRule='evenodd'
							d='M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z'
							clipRule='evenodd'
						/>
					</svg>
				)}
			</button>

			<GameWindowWrapper>
				<Routes>
					<Route path='/' element={<HomePlaceholder />} />
					<Route path='/classroom' element={<ClassRoom />} />
					<Route path='/floormap' element={<FloorMap />} />
				</Routes>
			</GameWindowWrapper>
		</>
	);
}

export default App;
