import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useLocation } from 'react-router-dom';
import Logo from '../components/Logo';

interface LocationState {
  userEmail: string;
}

export default function WelcomePage() {
  const location = useLocation();
  const state = location.state as LocationState;
  return (
    <>
      <Logo />
      <div className="flex flex-col items-center justify-center  text-white">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
        />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Bienvenue dans votre espace personnel</h1>
          <p className="text-2xl mb-6">Bonjour, {state.userEmail}!</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-blue-600 font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Commencer
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
