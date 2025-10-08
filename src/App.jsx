import { Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";
import TestPage2 from "./pages/TestPage2";
import FloorMap from "./pages/FloorMap";
import ClassRoom from "./pages/ClassRoom";
import HomePlaceholder from "./pages/HomePlaceholder";
import GameWindowWrapper from "./layouts/GameWindowWrapper";

function App() {
	return (
		<GameWindowWrapper>
			<Routes>
				<Route path='/' element={<HomePlaceholder />} />
				<Route path='/testpage' element={<TestPage />} />{" "}
				{/* comment out this line in final build */}
				<Route path='/testpage2' element={<TestPage2 />} />{" "}
				{/* comment out this line in final build */}
				<Route path='/classroom' element={<ClassRoom />} />
				<Route path='/floormap' element={<FloorMap />} />
			</Routes>
		</GameWindowWrapper>
	);
}

export default App;
