import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEventPage from './pages/CreateEventPage';
import HomePage from './pages/HomePage';
import AllEventsPage from './pages/AllEventsPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import MyEventsPage from './pages/MyEventsPage';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/events" element={<AllEventsPage />} />
          <Route path="/myevents" element={<MyEventsPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </div>
    </Router>
  );
}
