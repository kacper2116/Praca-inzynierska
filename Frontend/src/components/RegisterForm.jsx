import React, { useState } from 'react';
import styles from '../styles/Form.module.css'
import axios from 'axios';
import { publicRequest } from "../requestMethods"
import { MdKeyboardReturn } from "react-icons/md";
import { Link } from 'react-router-dom'


const RegisterForm = () => {


  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length > 0) {

      return; // Zakończ, jeśli są błędy
    }

 
    try {

      const res = await publicRequest.post('/auth/register', formData)

      if (res.status >= 200 && res.status < 300) {

        setServerError('');
        setSuccess(true)
      } else {


        setServerError('An error occurred during registration');

      }

    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;

        // Sprawdź konkretny błąd i ustaw odpowiedni komunikat
        if (errorData.message.includes('email')) {
          setServerError('This email is already registered');
        } else if (errorData.message.includes('login')) {
          setServerError('This login is already registered');
        } else {
          setServerError(errorData.message || 'An error occurred during registration');
        }
      } else {
        console.error(error);
        setServerError('A network error occurred during registration');
      }
    }
  }



  const validateForm = (data) => {
    const errors = {};

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'The passwords are not the same';
    }

    return errors;

  };


  return (
    <div className={styles.Container}>

      <Link to={'/'}>
        <div className={styles.Return_Button}>
          <MdKeyboardReturn size={'2rem'} />
        </div>
      </Link>

      <div className={styles.FormHeader}>
        <h1>Create Account</h1>
        <span style={{ fontSize: '1.1rem',color:'var(--color2)' }}>Already have an account?
        <Link to={'/login'}>
         <span className={styles.Form_Link}>Login</span>
         </Link>
         </span>
      </div>

      <form onSubmit={handleSubmit}>

        <div className={styles.FormField}>
          <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} required></input>

        </div>

        <div className={styles.FormField}>
          <input name='username' type='text' placeholder='Username' value={formData.username} onChange={handleChange} required></input>
        </div>

        <div className={styles.FormField}>
          <input name='password' type='text' placeholder='Password' value={formData.password} onChange={handleChange} required></input>
        </div>

        <div className={styles.FormField}>
          <input name='confirmPassword' type='text' placeholder='Repeat password' value={formData.confirmPassword} onChange={handleChange} required></input>
          {errors.confirmPassword && <span className={styles.Error}>{errors.confirmPassword}</span>}

        </div>

        <div className={styles.FormField}>
          <div className={styles.DataAgreement}>
            <input name='agreement' type='checkbox' checked={formData.agreement} onChange={handleChange} required></input><label for='checbkox' >I consent to the processing of my personal data</label>
          </div>
        </div>

        <div className={styles.FormField}>
          <button type='submit'>Sign up</button>
        </div>


        {serverError && <span className = {styles.Error}>{serverError}</span>}

        {success && <span className = {styles.Success}>Succesfully registered</span>}



      </form>



    </div>
  )
}

export default RegisterForm