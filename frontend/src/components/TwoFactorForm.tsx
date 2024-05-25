import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface TwoFactorFormProps {
    onSubmit: (values: TwoFactorFormValues, actions: FormikHelpers<TwoFactorFormValues>) => void;
    status?: string;
    isSubmitting: boolean;
    userEmail: string;
    qrCodeUrl?: string | null;
}

interface TwoFactorFormValues {
token: string;
}

export default function TwoFactorForm({ onSubmit, status, isSubmitting, userEmail, qrCodeUrl }: TwoFactorFormProps) {
    const validationSchema = Yup.object({
        token: Yup.string().required('Required')
    });
    return (
        <Formik
          initialValues={{ token: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                {userEmail && <p className="text-gray-700">Email: {userEmail}</p>}
                {qrCodeUrl && (
                  <div className="mb-4">
                    <p>Scan the QR code with your 2FA app:</p>
                    <img src={qrCodeUrl} alt="QR Code for 2FA" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">2FA Token</label>
                <div>
                  <Field type="text" name="token" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
                  <ErrorMessage name="token" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              {status && <div className="text-red-500 text-sm mb-4">{status}</div>}
              <div className="mt-5">
                <button type="submit" className="w-full bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50" disabled={isSubmitting}>
                  Verify 2FA
                </button>
              </div>
            </Form>
          )}
        </Formik>
      );
}
