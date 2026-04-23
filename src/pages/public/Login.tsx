import { useState } from 'react';
import StylesLogin from './Login.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Entrar');
  };

  return (
    <div className={StylesLogin.PageContainer}>
      <form className={StylesLogin.PageCard} onSubmit={handleLogin}>
        <h1 className={StylesLogin.PageTitle}>Login</h1>
        <div className={StylesLogin.PageFormGroup}>
          <label className={StylesLogin.PageLabel} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={StylesLogin.PageInput}
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={StylesLogin.PageFormGroup}>
          <label className={StylesLogin.PageLabel} htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            className={StylesLogin.PageInput}
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={StylesLogin.PageButton} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};
