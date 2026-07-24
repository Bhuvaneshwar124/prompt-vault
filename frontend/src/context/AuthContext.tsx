import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';
import { User, LoginRequest, RegisterRequest, ApiResponse, JwtAuthResponse } from '../types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await api.get<ApiResponse<User>>('/auth/me');
          if (response.data.success) {
            setUser(response.data.data);
            localStorage.setItem('user', JSON.stringify(response.data.data));
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  const login = async (credentials: LoginRequest) => {
    const response = await api.post<ApiResponse<JwtAuthResponse>>('/auth/login', credentials);
    if (response.data.success) {
      const authData = response.data.data;
      const userObj: User = {
        id: authData.id,
        username: authData.username,
        email: authData.email,
        firstName: authData.firstName,
        lastName: authData.lastName,
        roles: authData.roles,
      };

      setToken(authData.accessToken);
      setUser(userObj);
      localStorage.setItem('token', authData.accessToken);
      localStorage.setItem('user', JSON.stringify(userObj));
    }
  };

  const register = async (data: RegisterRequest) => {
    await api.post<ApiResponse<User>>('/auth/register', data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
