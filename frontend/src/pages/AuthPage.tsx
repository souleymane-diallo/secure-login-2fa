import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import TwoFactorForm from '../components/TwoFactorForm';
import { Step, User, AuthFormValues, TwoFactorFormValues } from '../types';
import config from '../config'
import { delay } from '../utils/delay';


export default function AuthPage() {
  const [step, setStep] = useState<Step>(1); 
  const [user, setUser] = useState<User>();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (inputValues: AuthFormValues) => {
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await axios.post(`${config.apiBaseUrl}/login`, inputValues);
      
      if (response?.data?.user) {
        setUser(response.data.user);
      } 

      if (response?.data?.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
      }
      
      setStep(2); 
      setStatus('');
      toast.success('Connexion réussie ! Veuillez compléter la 2FA.');

    } catch (error: any) {
      console.error('Login failed', error.response.data);
      setStatus('Email ou mot de passe invalide');
      toast.error('Échec de la connexion. Veuillez réessayer.');

    } finally {
      setIsSubmitting(false);
    }
  };

  const handle2FASubmit = async (values: TwoFactorFormValues) => {
    setIsSubmitting(true);
    setStatus('');
    
    try {
      const response = await axios.post(`${config.apiBaseUrl}/verify-2fa`, { ...values, userId: user?.id });
      
      if (response.data) {
        toast.success('Vérification 2FA réussie ! Redirection en cours...');
        await delay(2000);
        navigate('/welcome', { state: { userEmail: user?.email } });
      }

    } catch (error: any) {
      console.error('2FA verification failed', error.response.data);
      setStatus('Code 2FA invalide');
      toast.error('Échec de la vérification 2FA. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-40">
      {step === 1 && (
        <LoginForm
          onSubmit={handleLoginSubmit}
          status={status}
          isSubmitting={isSubmitting}
        />
      )}
      {step === 2 && user && (
        <TwoFactorForm
          onSubmit={handle2FASubmit}
          status={status}
          isSubmitting={isSubmitting}
          userEmail={user.email}
          qrCodeUrl={qrCodeUrl}
        />
      )}
    </motion.div>
  );
}
