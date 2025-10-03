import { Routes, Route } from 'react-router-dom'
import TestPage from './pages/TestPage'
import HomePlaceholder from './pages/HomePlaceholder'
import GameWindowWrapper from './layouts/GameWindowWrapper'

function App() {
  return (
    <GameWindowWrapper>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
        <Route path="/testpage" element={<TestPage />} /> {/* comment out this line in final build */}
      </Routes>
    </GameWindowWrapper>
  )
}

export default App;
