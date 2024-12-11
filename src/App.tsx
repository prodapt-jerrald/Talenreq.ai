import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import LoginForm from './components/auth/LoginForm';
import MainPage from './pages/MainPage';
import ProfileSelection from './pages/ProfileSelection';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          {/* <Route path="/jobs" element={<MainPage />} /> */}
          

          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs/:jobId/talents" 
            element={
              <ProtectedRoute>
                <ProfileSelection/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;