import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    required: 'Ce champ est obligatoire',
  },
  string: {
    email: "L'adresse email est invalide",
  },
});

const inputValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const inputFactorValidationSchema = Yup.object({
  token: Yup.string().required('Ce champ est obligatoire'),
});

export { inputValidationSchema, inputFactorValidationSchema };

