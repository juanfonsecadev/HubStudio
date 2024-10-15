'use client'
import styles from './page.module.css';
import { useState } from 'react';
import next from 'next';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch('#', { //TODO colocar a link pro database
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (


    <main className={styles.MainSection}>


      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.Content}>
          <h1 className={styles.LoginTitle}>Login</h1>
          <p>Faça login para acessar  sua conta</p>

        </div>


        <div className={styles.LoginInputs}>

          {/* <label>Email</label> */}
          <input type="email" className={styles.inputModel} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* <label>Senha</label> */}
          <input type="password" className={styles.inputModel} placeholder='Password'
            value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className={styles.button}>Entrar</button>
        </div>

      </form>
    </main>
  );
};

