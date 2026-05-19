import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const ResetPasswordScreen = ({ route, navigation }) => {
  const token = route?.params?.token;

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    if (!token) {
      Alert.alert('Error', 'Invalid or missing reset token');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Enter new password');
      return;
    }

    try {
      await axios.put(
        `http://192.168.1.33:5000/api/auth/reset-password/${token}`,
        { password },
      );

      Alert.alert('Success', 'Password reset successful', [
        {
          text: 'Login',
          onPress: () => navigation.replace('Login'),
        },
      ]);
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={{ color: '#fff' }}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeText: {
    color: '#555',
    fontWeight: '600',
  },
});
