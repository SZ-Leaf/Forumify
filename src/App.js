import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/user/Homepage';
import SubjectPage from './pages/user/SubjectPage';
import SportsPage from './pages/subjects/sports/SportsPage';
import MoviesPage from './pages/subjects/movies/MoviesPage';
import DashboardPage from './pages/admin/DashboardPage';
import ThreadDetailsPage from './pages/subjects/threadsDetails/ThreadDetails';
import GamesPage from './pages/subjects/gaming/GamingPage';
import CreateThread from './pages/subjects/threadsDetails/CreateThread';
import EditThread from './pages/subjects/threadsDetails/EditThread';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/subjects' element={<SubjectPage/>} />
        <Route path='/sports' element={<SportsPage/>} />
        <Route path='/movies' element={<MoviesPage/>} />
        <Route path='/gaming' element={<GamesPage/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path='/thread/details/:id' element={<ThreadDetailsPage />} />
        <Route path='/thread/create' element={<CreateThread />} />
        <Route path='/thread/edit' element={<EditThread />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
