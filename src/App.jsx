import { Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import ClassRoom from "./pages/ClassRoom";
import HomePlaceholder from "./pages/HomePlaceholder";
import GameWindowWrapper from "./layouts/GameWindowWrapper";
import MapView from "./pages/MapView";

function App() {
	return (
		<GameWindowWrapper>
			<Routes>
				<Route path='/' element={<HomePlaceholder />} />
				<Route path='/testpage' element={<TestPage />} />{" "}
				{/* comment out this line in final build */}
				<Route path='/testpage2' element={<TestPage2 />} />{" "}
				{/* comment out this line in final build */}
				<Route path='/classroom/:moduleId/:teacherId' element={<ClassRoom />} />
				<Route path="/map" element={<MapView />} />
			</Routes>
		</GameWindowWrapper>
	);
}

export default App;
