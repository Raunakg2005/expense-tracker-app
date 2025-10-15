import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import LoginOTP from './pages/LoginOTP';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Help from './pages/Help';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Landing Page (Public) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />

        {/* Auth Routes (Public) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login-otp"
          element={
            <PublicRoute>
              <LoginOTP />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Dashboard />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Expenses />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Budgets />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Reports />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div className="min-h-screen bg-gray-50">
                <Navbar />
                <Profile />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
