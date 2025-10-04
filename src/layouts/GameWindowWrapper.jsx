import { CurrentYearsCoursesProvider } from '../context/CurrentYearsCoursesContext'
import ProgressMenu from '../components/ProgressMenu';

//This is a wrapper component meant to set game window size, and pass props between routes if needed.
function GameWindowWrapper({ children }) {
	return (
		<CurrentYearsCoursesProvider>
			<div className="w-screen h-screen flex justify-center items-center bg-gray-900 overflow-x-hidden relative">
				<div className="w-full aspect-video bg-gray-700 flex mx-[4px] max-w-[1280px] max-h-[720px] relative">
					<ProgressMenu />
					{children}
				</div>
			</div>
		</CurrentYearsCoursesProvider>
	)
}

export default GameWindowWrapper;