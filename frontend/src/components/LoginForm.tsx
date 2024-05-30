
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { inputValidationSchema } from "../utils/validationSchema";
import profilLogo from "../assets/profile.png";
import { IAuthFormValues } from "../types";

interface LoginFormProps {
    onSubmit: (values: IAuthFormValues, actions: FormikHelpers<IAuthFormValues>) => void;
    status?: string;
    isSubmitting: boolean;
}


export default function LoginForm({ onSubmit, status, isSubmitting }: LoginFormProps) {

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={inputValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex -space-x-1 overflow-hidden justify-center">
						<img src={profilLogo} alt="lock" className="inline-block h-22  w-20 rounded-lg ring-2 ring-white" />
					</div>
        <Form>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nom d'utilisateur ou courriel</label>
            <div>
              <Field 
                id="email"
                type="email" 
                name="email" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <div>
              <Field 
                id="password"
                type="password" 
                name="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" 
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>
          {status && <div className="text-red-500 text-sm mb-4">{status}</div>}
          <div className="mt-5 flex justify-center">
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
							transition={{ duration: 0.5 }}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50" disabled={isSubmitting}
            >
              {isSubmitting ? <TailSpin height="24" width="24" color="white" /> : 'Connexion'}
            </motion.button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Pas de compte ? <Link to="/register" className="text-blue-600 hover:underline">Créer votre compte</Link>
            </p>
          </div>
        </Form>
      </motion.div>
      )}
    </Formik>
  );
}
