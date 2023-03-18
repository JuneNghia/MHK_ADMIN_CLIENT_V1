import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(''),
  email: Yup.string().email('Invalid email').required('Email is required'),
  id: Yup.string().required('Password is required'),
});