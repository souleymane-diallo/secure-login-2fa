import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  /* Local */
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  /* Methods */
  function login (token: string) {
    const expiryTime = new Date().getTime() + (3600 * 1000);
    localStorage.setItem('tokenAuth', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    setAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('tokenAuth');
    localStorage.removeItem('tokenExpiry');
    setAuthenticated(false);
  }

  useEffect(() => {
    const token = localStorage.getItem('tokenAuth');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (token && tokenExpiry && new Date().getTime() < Number(tokenExpiry)) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within a AuthProvider")
  }
  return context;
} 
  