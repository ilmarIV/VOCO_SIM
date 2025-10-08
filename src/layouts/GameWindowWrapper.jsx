import { CurrentYearsCoursesProvider } from "../context/CurrentYearsCoursesContext";
import ProgressMenu from "../components/ProgressMenu";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

//This is a wrapper component meant to set game window size, and pass props between routes if needed.
function GameWindowWrapper({ children }) {
	const location = useLocation();

	const hiddenMenuRoutes = ["/", "/classroom"]; // add all routes, where menu overlay should be hidden to this list
	const hideMenu = hiddenMenuRoutes.includes(location.pathname);

	const [backgroundImage, setBackgroundImage] = useState(null);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Preload image function
	const preloadImage = useCallback((src) => {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(src);
			img.onerror = reject;
			img.src = src;
		});
	}, []);

	useEffect(() => {
		const loadBackground = async () => {
			let imageSrc = null;

			switch (location.pathname) {
				case "/":
					setBackgroundImage(null);
					setIsImageLoaded(true);
					return;
				case "/classroom": {
					const randomNum = Math.floor(Math.random() * 4) + 1;
					imageSrc = `/classrooms/classroom_bg_${randomNum}.png`;
					break;
				}
				case "/floormap":
					imageSrc = `/map.png`;
					break;
				default:
					setBackgroundImage(null);
					setIsImageLoaded(true);
					return;
			}

			if (imageSrc) {
				setIsLoading(true);
				setIsImageLoaded(false);
				try {
					await preloadImage(imageSrc);
					setBackgroundImage(`url('${imageSrc}')`);
					setIsImageLoaded(true);
				} catch (error) {
					console.error("Failed to load background image:", error);
					setBackgroundImage(null);
					setIsImageLoaded(true);
				} finally {
					setIsLoading(false);
				}
			}
		};

		loadBackground();
	}, [location.pathname, preloadImage]);

	return (
		<CurrentYearsCoursesProvider>
			<div className='w-screen h-screen flex justify-center items-center bg-gray-900 overflow-x-hidden relative'>
				<div
					className='w-full aspect-video bg-gray-700 flex mx-[4px] max-w-[1280px] max-h-[720px] relative rounded-md transition-opacity duration-300'
					style={
						backgroundImage && isImageLoaded
							? {
									backgroundImage: `${backgroundImage}`,
									backgroundSize: "cover",
									backgroundPosition: "center",
									opacity: 1,
							  }
							: { opacity: isLoading ? 0.7 : 1 }
					}
				>
					{/* Loading indicator */}
					{isLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-md'>
							<div className='w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
						</div>
					)}
					{!hideMenu && <ProgressMenu />}
					{children}
				</div>
			</div>
		</CurrentYearsCoursesProvider>
	);
}

export default GameWindowWrapper;
