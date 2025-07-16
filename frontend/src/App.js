import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import CreateEventPage from './pages/CreateEventPage';
import AllEventsPage from './pages/AllEventsPage';
import MyEventsPage from './pages/MyEventsPage';
import RSVPAdminDashboard from './pages/RSVPAdminDashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '100px' }} className="main-content">
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <AllEventsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/myevents"
            element={
              <ProtectedRoute>
                <MyEventsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/rsvp-summary"
            element={
              <ProtectedRoute>
                <RSVPAdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
