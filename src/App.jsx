import { Routes, Route } from "react-router-dom";

import FloorMap from "./pages/FloorMap";
import ClassRoom from "./pages/ClassRoom";
import HomePlaceholder from "./pages/HomePlaceholder";
import GameWindowWrapper from "./layouts/GameWindowWrapper";

function App() {
	return (
		<GameWindowWrapper>
			<Routes>
				<Route path='/' element={<HomePlaceholder />} />
				<Route path='/classroom' element={<ClassRoom />} />
				<Route path='/floormap' element={<FloorMap />} />
			</Routes>
		</GameWindowWrapper>
	);
}

export default App;
