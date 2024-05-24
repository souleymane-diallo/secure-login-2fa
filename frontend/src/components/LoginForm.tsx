
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios from "axios";
import * as Yup from 'yup';

interface LoginFormValues {
    email: string;
    password: string;
}

export default function LoginForm() {

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = async (values: LoginFormValues, { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', values);
        console.log("Login successful:", response);
    } catch (error: any) {
        console.error('Login failed', error.response.data);
        setStatus('Invalid email or password');
    }
    setSubmitting(false);
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-xl font-bold mb-6 text-center text-gray-700">Connectez-vous à votre compte</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
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
              <button type="submit" className="w-full sm:w-auto bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 block" disabled={isSubmitting}>
                Connexion
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
