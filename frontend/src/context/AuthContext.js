import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { API } from '../config/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 SAVE FCM TOKEN AFTER LOGIN
  useEffect(() => {
    const syncFcmToken = async () => {
      try {
        if (!user?._id) return;

        const fcmToken = await messaging().getToken();

        console.log('🔥 FCM Token:', fcmToken);

        await fetch(`${API}/notifications/save-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user._id,
            fcmToken,
          }),
        });

        console.log('✅ FCM token synced to backend');
      } catch (error) {
        console.log('❌ FCM sync error:', error);
      }
    };

    syncFcmToken();
  }, [user]);

  // LOAD TOKEN ON APP START
  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
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

      return { success: true, data: res.data };
    } catch (error) {
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

      const normalizedUser = {
        ...res.data.user,
        _id: res.data.user.id || res.data.user._id,
      };

      setUser(normalizedUser);
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
