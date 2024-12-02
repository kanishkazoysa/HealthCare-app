import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images'; // Assuming you have an images constant

const Login = () => {
  const [bounceAnim] = useState(new Animated.Value(0)); // Initial value for BounceIn animation

  useEffect(() => {
    // Apply BounceIn animation
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 2, // Full bounce effect
        duration: 1000, // Duration for animation
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Login button pressed');
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log('Register button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: bounceAnim }] }]}>
        <Image source={images.logo} style={styles.image} />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    marginTop: '30%',
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '70%',
    marginTop: '30%',
  },
  button: {
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButton: {
    backgroundColor: '#0BA787',
  },
  registerButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
