import { CurrentYearsCoursesProvider } from "../context/CurrentYearsCoursesContext";
import ProgressMenu from "../components/ProgressMenu";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

//This is a wrapper component meant to set game window size, and pass props between routes if needed.
function GameWindowWrapper({ children }) {
	const location = useLocation();

	const hiddenMenuRoutes = ["/", "/classroom"]; // add all routes, where menu overlay should be hidden to this list
	const hideMenu = hiddenMenuRoutes.includes(location.pathname);

	const [backgroundImage, setBackgroundImage] = useState(null);

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setBackgroundImage(null);
				break;
			case "/classroom": {
				let newRandom = Math.floor(Math.random() * 3) + 1;
				setBackgroundImage(
					`url('../classrooms/classroom_bg_${newRandom}.png')`
				);
				break;
			}
			case "/floormap":
				setBackgroundImage(`url('../misc/floor_map.png')`);
				break;
			default:
				setBackgroundImage(null);
		}
	}, [location.pathname]);

	return (
		<CurrentYearsCoursesProvider>
			<div className='w-screen h-screen flex justify-center items-center bg-gray-900 overflow-x-hidden relative'>
				<div
					className='w-full aspect-video bg-gray-700 flex mx-[4px] max-w-[1280px] max-h-[720px] relative rounded-md'
					style={
						backgroundImage
							? {
									backgroundImage: `${backgroundImage}`,
									backgroundSize: "cover",
									backgroundPosition: "center",
							  }
							: {}
					}
				>
					{!hideMenu && <ProgressMenu />}
					{children}
				</div>
			</div>
		</CurrentYearsCoursesProvider>
	);
}

export default GameWindowWrapper;
