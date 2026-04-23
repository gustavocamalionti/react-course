import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface IAuthContextProps {
  email: string | undefined;
  accessToken: string | undefined;
  detailedUser: string | undefined;
  login(email: string, password: string): void;
  logout(): void;
}
const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [email, setEmail] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const login = useCallback((email: string, password: string) => {
    // chamar o backend para conseguir o token de autenticação
    setEmail(email);
    setAccessToken(crypto.randomUUID());
  }, []);

  const logout = useCallback(() => {
    setEmail(undefined);
    setAccessToken(undefined);
  }, []);

  const detailedUser = useMemo(() => {
    return `O email do usuário é ${email}`;
  }, [email]);

  return (
    <AuthContext.Provider value={{ login, logout, accessToken, email, detailedUser }}>
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
