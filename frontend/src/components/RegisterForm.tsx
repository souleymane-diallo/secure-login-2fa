import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IAuthFormValues } from '../types'
import { inputValidationSchema } from '../utils/validationSchema';
import { delay } from '../utils/delay';
import config from '../apiConfig'

export default function RegisterForm() {
  /* Local */
  const navigate = useNavigate();

  const initialValues: IAuthFormValues = {
    email: '',
    password: '',
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Methods */
  async function onHandleSubmit(inputValues: IAuthFormValues, { setSubmitting, setStatus }: FormikHelpers<IAuthFormValues>) {
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await axios.post(`${config.apiBaseUrl}/register`, inputValues);
      
      if (response.data) {
        toast.success('Enregistrement réussi! Redirection vers la connexion...');
        await delay(1000);
        setTimeout(() => navigate('/'), 2000);
      }

    } catch (error: any) {
      setStatus('Registration failed. Please try again.');
      toast.error("Echec de création d'un utilisateur! Veillez réessayer.");

    } finally {
      setSubmitting(false);
    }
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
        validationSchema={inputValidationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ status }) => (
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
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50" disabled={isSubmitting}
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
