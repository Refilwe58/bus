import React, { useEffect, useState, createContext, useContext } from 'react';
import { login as apiLogin } from '../api';
interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string;
}
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: async () => false,
  logout: () => {}
});
export const useAuth = () => useContext(AuthContext);
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  // Check for stored user on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiLogin(email, password);
      if (response.data?.success) {
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem("userId", userData.id);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isLoggedIn: !!user,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};