import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import WelcomePage from './pages/WelcomePage';
import RegisterForm from './components/RegisterForm';

export default function App() {
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/welcome" element={
              <PrivateRoute>
                <WelcomePage />
              </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  );
}
