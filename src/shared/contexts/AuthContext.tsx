import React, { createContext, useContext, useState } from 'react';

interface IAuthContextProps {
  email: string | undefined;
  accessToken: string | undefined;

  login(email: string, password: string): void;
  logout(): void;
}
const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [email, setEmail] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const login = (email: string, password: string) => {
    // chamar o backend para conseguir m token de autenticação
    setEmail(email);
    setAccessToken(crypto.randomUUID());
  };

  const logout = () => {
    setEmail(undefined);
    setAccessToken(undefined);
  };
  return (
    <AuthContext.Provider value={{ login, logout, accessToken, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const useIsAuthenticated = () => {
  const { accessToken } = useAuthContext();

  return !!accessToken;
};
