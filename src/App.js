import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/user/Homepage';
import SubjectPage from './pages/user/SubjectPage';
import SportsPage from './pages/subjects/sports/SportsPage';
import MoviesPage from './pages/subjects/movies/MoviesPage';
import DashboardPage from './pages/admin/DashboardPage';
import GamingThreadDetailsPage from './pages/subjects/gaming/GamingThreadDetails';
import GamesPage from './pages/subjects/gaming/GamingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/subjects' element={<SubjectPage/>} />
        <Route path='/sports' element={<SportsPage/>} />
        <Route path='/movies' element={<MoviesPage/>} />
        <Route path='/gaming' element={<GamesPage/>} />
        <Route path="/admin/" element={<DashboardPage />} />
        <Route path='/gaming/details/:id' element={<GamingThreadDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
