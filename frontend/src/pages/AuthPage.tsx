import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginForm from '../components/LoginForm';
import TwoFactorForm from '../components/TwoFactorForm';

interface LoginFormValues {
  email: string;
  password: string;
}
  
interface TwoFactorFormValues {
  token: string;
}
export default function AuthPage() {
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA
  const [user, setUser] = useState<any>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
      console.log("Login successful:", response.data);
      setUser(response.data.user);
      if (response.data.qrCodeUrl) {
        setQrCodeUrl(response.data.qrCodeUrl);
      }
      setStep(2); // Pass to 2FA step
      toast.success('Login successful! Please complete 2FA.');
    } catch (error: any) {
      console.error('Login failed', error.response.data);
      setStatus('Invalid email or password');
      toast.error('Login failed. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handle2FASubmit = async (values: TwoFactorFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/verify-2fa', { ...values, userId: user.id });
      console.log("2FA verification successful:", response.data);
      toast.success('2FA verification successful! Redirecting...');
      navigate('/welcome', { state: { userEmail: user.email } });
    } catch (error: any) {
      console.error('2FA verification failed', error.response.data);
      setStatus('Invalid 2FA token');
      toast.error('2FA verification failed. Please try again.');
    }
    setIsSubmitting(false);
  };
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-40">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-700">Connectez-vous à votre compte</h1>
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
    </div>
  );
}
