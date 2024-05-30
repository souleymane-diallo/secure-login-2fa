import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import hacker from "../assets/hacker.png";

export default function NavBar() {
  /* Local */
  const { logout } = useAuth();
  const navigate = useNavigate();

  /* Methods */
  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="text-white p-4 shadow-md fixed top-0 left-0 right-0">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={500}
      />
      <div className="container max-auto flex justify-between items-center">
        <div className="flex items-center">
          <img  src={hacker} alt="logo" className="block h-12 w-12 rounded-full ring-2 ring-white" />
          <span className="text-white text-lg ml-2">Authenticator</span>
        </div>
        <motion.button 
          type="button" 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="bg-blue-700 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleLogout}
        >
          Déconnexion
        </motion.button>
      </div>
    </nav>
  )
}
