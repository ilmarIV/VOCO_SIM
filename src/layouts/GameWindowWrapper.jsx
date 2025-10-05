import { CurrentYearsCoursesProvider } from '../context/CurrentYearsCoursesContext'
import ProgressMenu from '../components/ProgressMenu';
import { useLocation } from 'react-router-dom';

//This is a wrapper component meant to set game window size, and pass props between routes if needed.
function GameWindowWrapper({ children }) {
	const location = useLocation();

	const hiddenMenuRoutes = ["/"]; // add all routes, where menu overlay should be hidden to this list
	const hideMenu = hiddenMenuRoutes.includes(location.pathname);

	return (
		<CurrentYearsCoursesProvider>
			<div className="w-screen h-screen flex justify-center items-center bg-gray-900 overflow-x-hidden relative">
				<div className="w-full aspect-video bg-gray-700 flex mx-[4px] max-w-[1280px] max-h-[720px] relative">
					{!hideMenu && <ProgressMenu />}
					{children}
				</div>
			</div>
		</CurrentYearsCoursesProvider>
	)
}

export default GameWindowWrapper;