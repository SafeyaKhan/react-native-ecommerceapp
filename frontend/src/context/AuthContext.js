import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const API =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:5000/api/auth'
      : 'http://localhost:5000/api/auth';

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
      // optionally fetch user profile
    }

    setLoading(false);
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API}/register`, {
        name,
        email,
        password,
      });

      console.log('BACKEND RESPONSE:', res.data);

      return { success: true, data: res.data };
    } catch (error) {
      console.log('REGISTER ERROR:', error.response?.data || error.message);

      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}/login`, {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);

      await AsyncStorage.setItem('token', res.data.token);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed',
      };
    }
  };

  // LOGOUT
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
