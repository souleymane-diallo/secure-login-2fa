import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TailSpin } from 'react-loader-spinner';
import { motion } from 'framer-motion';
import { twoFactorValidationSchema } from '../utils/validationSchema';

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

	return (
		<Formik
			initialValues={{ token: '' }}
			validationSchema={twoFactorValidationSchema}
			onSubmit={onSubmit}
		>
			{() => (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					{userEmail && <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Vérification {userEmail}</h2>}
					<Form>
						<div className="mb-4">
							{qrCodeUrl && (
								<div className="mb-4">
									<p className="text-gray-700">Scannez le code QR avec Google Authentifcator</p>
									<img src={qrCodeUrl} alt="QR Code for 2FA" />
								</div>
							)}
						</div>
						<div className="flex flex-col gap-2 mb-4">
							<label htmlFor="token" className="block text-sm font-medium text-gray-700">Code 2FA</label>
							<div>
								<Field type="text" name="token" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" />
								<ErrorMessage name="token" component="div" className="text-red-500 text-sm mt-1" />
							</div>
						</div>
						{status && <div className="text-red-500 text-sm mb-4">{status}</div>}
						<div className="mt-5">
						<motion.button 
							type="submit" 
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
								className="w-full bg-blue-600 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50" disabled={isSubmitting}
							>
								{isSubmitting ? <TailSpin height="24" width="24" color="white" /> : 'Vérifier 2FA'}
							</motion.button>
						</div>
					</Form>
				</motion.div>
			)}
		</Formik>
	);
}
