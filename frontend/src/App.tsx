import './App.css'
import LoginForm from './components/LoginForm'
import Logo from './components/Logo'

function App() {
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center">
      <Logo />
      <div className="mt-20">
        <LoginForm />
      </div>
    </div>
  )
}

export default App
