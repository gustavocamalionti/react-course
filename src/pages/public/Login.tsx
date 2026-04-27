import { useState } from 'react';
import { useAuthContext } from '../../shared/contexts/AuthContext';

export const Login = () => {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-slate-300/60">
      <form
        onSubmit={handleLogin}
        className="card w-full max-w-sm flex flex-col gap-4 p-7 rounded-xl"
      >
        <h1 className="text-xl font-semibold text-center">Login</h1>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="label" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            className="input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-1.5">
          <label className="label" htmlFor="password">
            Senha
          </label>

          <input
            id="password"
            className="input"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn mt-2" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};
