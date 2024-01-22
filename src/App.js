import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/user/Homepage';
import SubjectPage from './pages/user/SubjectPage';
import SportsPage from './pages/subjects/sports/PvE';
import MoviesPage from './pages/subjects/movies/Raid';
import DashboardPage from './pages/admin/DashboardPage';
import ThreadDetailsPage from './pages/subjects/threadsDetails/ThreadDetails';
import GamesPage from './pages/subjects/gaming/PvP';
import CreateThread from './pages/subjects/threadsDetails/CreateThread';
import EditThread from './pages/subjects/threadsDetails/EditThread';
import UsersPanel from './pages/admin/UsersPanel';
import ProfilePage from './pages/user/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/subjects' element={<SubjectPage/>} />
        <Route path='/PvE' element={<SportsPage/>} />
        <Route path='/Raid' element={<MoviesPage/>} />
        <Route path='/PvP' element={<GamesPage/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path='/thread/details/:id' element={<ThreadDetailsPage />} />
        <Route path='/thread/create' element={<CreateThread />} />
        <Route path='/thread/edit/:id' element={<EditThread />} />
        <Route path='/admin/users-panel' element={<UsersPanel />} />
        <Route path='/users/profile' element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
