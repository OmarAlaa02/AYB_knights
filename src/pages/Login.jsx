import supabase from "../utils/supabase";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import toast function
// import './login.css';

import styles from '/public/styles/login.module.css'


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    console.log('rendered');
    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null); 
  
      try {
        // Call Supabase API to log in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
  
        if (error) throw error; 
        toast.success('Login successful!');
        navigate('/home');
      } catch (error) {
        setError(error.message); 
      }
    };

    return (
        <div className={styles.login_container}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.input_group}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_group}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submit_btn}>
            Login
          </button>
        </form>
        {error && <p className={styles.error_message}>{error}</p>}
        
      </div>
      );
}  
export default Login;