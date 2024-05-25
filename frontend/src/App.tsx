import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Logo from './components/Logo';

function App() {
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center">
      <Logo />
      <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/welcome" element={<div>Welcome Page</div>} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
