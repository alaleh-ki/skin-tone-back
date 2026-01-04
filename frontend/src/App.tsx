import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  return (
    <BrowserRouter>
      <nav className="flex justify-between gap-4 items-center p-4 max-w-7xl mx-auto">
        <div className="text-3xl font-bold">Skin Tone Analysis</div>
        <ThemeToggle />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

