import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEventPage from './pages/CreateEventPage';
import HomePage from './pages/HomePage';
import AllEventsPage from './pages/AllEventsPage';
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
          <Route path="/signup" element={<div className="container"><h2>Signup Page</h2></div>} />
          <Route path="/signin" element={<div className="container"><h2>Signin Page</h2></div>} />
        </Routes>
      </div>
    </Router>
  );
}
