import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthFormValue } from '../types'
import validationSchema from '../utils/validationSchema';
import config from '../config'

export default function RegisterForm() {
  const navigate = useNavigate();

  const initialValues: AuthFormValue = {
    email: '',
    password: '',
  };

 
  const handleSubmit = async (inputValues: AuthFormValue, { setSubmitting, setStatus }: FormikHelpers<AuthFormValue>) => {
    try {
      await axios.post(`${config.apiBaseUrl}/register`, inputValues);
      setStatus('Enregistrement réussi! Redirection vers la connexion...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error('Registration failed', error.response.data);
      setStatus('Registration failed. Please try again.');
    }
    setSubmitting(false);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-40"
    >
      <h1 className="text-xl font-bold mb-6 text-center text-gray-700">Créer votre compte</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nom d'utilisateur ou courriel</label>
              <div>
                <Field type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <div>
                <Field type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
            {status && <div className="text-red-500 text-sm mb-4">{status}</div>}
            <div className="mt-5 flex justify-center">
              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }} 
                className="w-full bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50" disabled={isSubmitting}
              >
                {isSubmitting ? <TailSpin height="24" width="24" color="white" /> : 'Enregistrer'}
              </motion.button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ? <Link to="/" className="text-blue-600 hover:underline">Connexion</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  )
    
}
