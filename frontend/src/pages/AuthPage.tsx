import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import TwoFactorForm from '../components/TwoFactorForm';
import { Step, IUser, IAuthFormValues, ITwoFactorFormValues } from '../types';
import apiConfigUrl from '../apiConfig'
import { delay } from '../utils/delay';


export default function AuthPage() {
  /* Local */
  const [step, setStep] = useState<Step>(1); 
  const [user, setUser] = useState<IUser>();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  /* Methods */
  async function onHandleLoginSubmit(initialValues: IAuthFormValues) {
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await axios.post(`${apiConfigUrl.apiBaseUrl}/login`, initialValues);

      if (response?.data?.user) {
        setUser(response.data.user);
      }

      if (response?.data?.qrCodeUrl) {
        setQrCodeUrl(response?.data?.qrCodeUrl);
      }
      setStep(2);
      setStatus('');
      toast.success("Connexion réussie! veuillez compléter l'Authentification double facteur.");

    } catch (error) {
      setStatus('Email ou mot de passe invalide');
      toast.error('Echec de la connexion; Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }

  }

  async function onHandle2FASubmit(inputValues: ITwoFactorFormValues) {
    setIsSubmitting(true);
    setStatus('');
    
    try {
      const response = await axios.post(`${apiConfigUrl.apiBaseUrl}/verify-2fa`, { ...inputValues, userId: user?.id },);

      
      if (response.data) {
        toast.success('Vérification réussie! Redirection en cours...');
        await delay(2000);
        const tokenStr = response.data.token;
        const result = await axios.get(`${apiConfigUrl.apiBaseUrl}/user/${user?.id}`, { headers: { Authorization: `Bearer ${tokenStr}`}});
        console.log("user", result.data);
        if (result) {
          navigate('/welcome', { state: { userEmail: user?.email } });
        }
      }

    } catch (error: any) {
      setStatus('Code code authentification invalide');
      toast.error('Échec de la vérification du code. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-40"
    >
      {step === 1 && (
        <LoginForm
          onSubmit={onHandleLoginSubmit}
          status={status}
          isSubmitting={isSubmitting}
        />
      )}
      {step === 2 && user && (
        <TwoFactorForm 
          onSubmit={onHandle2FASubmit}
          status={status}
          isSubmitting={isSubmitting}
          userEmail={user?.email}
          qrCodeUrl={qrCodeUrl}
        />
      )}
    </motion.div>
  );
}
