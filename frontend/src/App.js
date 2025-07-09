import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import CreateEventPage from './pages/CreateEventPage';
import AllEventsPage from './pages/AllEventsPage';
import MyEventsPage from './pages/MyEventsPage';
import RSVPAdminDashboard from './pages/RSVPAdminDashboard';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '100px' }} className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/events" element={<AllEventsPage />} />
          <Route path="/myevents" element={<MyEventsPage />} />
          <Route path="/admin/rsvp-summary" element={<RSVPAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
