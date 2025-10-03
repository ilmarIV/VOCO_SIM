import { Routes, Route } from 'react-router-dom'
import TestPage from './pages/TestPage'
import HomePlaceholder from './pages/HomePlaceholder'
import GameWindowWrapper from './layouts/GameWindowWrapper'

function App() {
  return (
    <GameWindowWrapper>
      <Routes>
        <Route path="/" element={<HomePlaceholder />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </GameWindowWrapper>
  )
}

export default App;
