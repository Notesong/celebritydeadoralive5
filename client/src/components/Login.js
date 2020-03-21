import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { BASE_URL } from '../App';

// history and setIsLoggedIn are used in the axios call
const Login = ({ history, setIsLoggedIn, errors, touched }) => {

    return (
        <div className='login-user'>
            <h2>Login</h2>
            <Form>
                {touched.username && errors.username && <p className="errors">{errors.username}</p>}
                <Field 
                    type='text' 
                    name='username' 
                    placeholder='Enter a username'
                />
                {touched.password && errors.password && <p className='errors'>{errors.password}</p>}
                <Field 
                    type='password' 
                    name='password' 
                    placeholder='Enter a password'
                />
                <button className="button" type='submit'>Submit</button>
            </Form>
        </div>
    );
}

const FormikLogin = withFormik({
    mapPropsToValues({ username, password}) {
        return {
            username: username || "",
            password: password || "",
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .min(2, 'Must at least 2 characters.')
            .max(20, 'Must be 20 characters or less.')
            .required('User name is required.'),
        password: Yup.string()
            .min(4, 'Must at least 4 characters.')
            .max(20, 'Must be 20 characters or less.')
            .required('Password is required.'),
    }),
    handleSubmit(values, {props}) {
        Axios
            .post(`${BASE_URL}api/login`, {
                username: values.username,
                password: values.password
            })
            .then(res => {
                sessionStorage.setItem('id', res.data.id);
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('registerUser', values.username);
                props.setIsLoggedIn(true);
                // go to success page if registration is successful
                props.history.push('/Success');
            })
            .catch(error => {
                alert("Unable to login.")
                console.log('Unable to login.', error)
            });
    }
})(Login);

export default FormikLogin;