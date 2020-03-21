import React from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from 'axios';
import { BASE_URL } from '../App';

// history and setIsLoggedIn are used in the axios call
const Register = ({ history, setIsLoggedIn, errors, touched }) => {

    return (
        <div className='login-user'>
            <h2>Signup</h2>
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

const axioscall = async (values, props) => {
    try {
        // attempt to register user
        await Axios.post(`${BASE_URL}api/register`, {
            username: values.username,
            password: values.password
        })
        // if registration is successful, log them in
        const res = await Axios.post(`${BASE_URL}api/login`, {
            username: values.username,
            password: values.password
        })
        // set items to local storage for later retrieval
        sessionStorage.setItem('id', res.data.id);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('registerUser', values.username);
        
        // go to success page if registration is successful
        props.history.push('/Success')
    } catch (error) {
        alert("Registration unsuccessful.")
        console.log('Registration unsuccessful.', error)
    }
}

const FormikRegister = withFormik({
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
        axioscall(values, props);
        props.setIsLoggedIn(true);

    }
})(Register, axioscall);

export default FormikRegister;



// import React, { useState } from 'react';
// import Axios from 'axios';
// import { BASE_URL } from '../App';

// // not currently being used in the app
// // meant to prompt a user to register
// const Register = (props) => {

//     const [registerUser, setRegisterUser] = useState({
//         username: '',
//         password: ''
//     })

//     const handleChange = (e) => {
//         setRegisterUser({ ...registerUser, [e.target.name]: e.target.value })
//     }

//     const registration = async () => {
//         try {
//             // attempt to register user
//             await Axios.post(`${BASE_URL}api/register`, {
//                 username: registerUser.username,
//                 password: registerUser.password
//             })
//             // if registration is successful, log them in
//             const res = await Axios.post(`${BASE_URL}api/login`, {
//                 username: registerUser.username,
//                 password: registerUser.password
//             })
//             // set items to local storage for later retrieval
//             sessionStorage.setItem('id', res.data.id);
//             sessionStorage.setItem('token', res.data.token);
//             sessionStorage.setItem('registerUser', registerUser.username);
//             props.setIsLoggedIn(true);
//             // go to success page if registration is successful
//             props.history.push('/Success')
//         } catch (error) {
//             alert("Registration unsuccessful.")
//             console.log('Registration unsuccessful.', error)
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         registration()
//     }

//     return (
//         <div className='register-user'>
//             <h2>Signup</h2>
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <label htmlFor='username'>
//                    Username<br />
//                     <input
//                     placeholder='Enter a username'
//                     value={registerUser.username}
//                     name='username'
//                     type='username'
//                     onChange={handleChange}
//                     maxLength="20"
//                     />
//                 </label>
//                 <label htmlFor='password'>
//                     Password <span className="small-type">(4-20 characters)</span><br />
//                 <input
//                     type='password'
//                     placeholder='Enter a password'
//                     value={registerUser.password}
//                     name='password'
//                     onChange={handleChange}
//                     maxLength="20"
//                     minLength="4"
//                 />
//                 </label>
//                 <button className="button" type={'submit'}>Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Register;