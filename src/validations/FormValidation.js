import * as Yup from 'yup';

export const FormValidations = Yup.object().shape({
    email: Yup.string().email('Enter a valid email address.').required('E-mail address cannot be left blank.'),
    password: Yup.string().min(6, 'Password must be at least 6 characters.').required('Password cannot be left blank.'),
});
