import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images'; // Assuming you have an images constant
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [bounceAnim] = useState(new Animated.Value(0)); // Initial value for BounceIn animation
  const [buttonAnim] = useState(new Animated.Value(100)); // Start below screen
  const [buttonOpacity] = useState(new Animated.Value(0)); // Start with 0 opacity (invisible)

  useEffect(() => {
    // Apply BounceIn animation for logo and buttons together
    Animated.parallel([
      // Logo BounceIn animation
      Animated.timing(bounceAnim, {
        toValue: 2, // Full bounce effect
        duration: 1000, // Duration for animation
        useNativeDriver: true,
      }),
      // Buttons coming from the bottom with opacity
      Animated.parallel([
        Animated.timing(buttonAnim, {
          toValue: 0, // Move buttons to their final position (from 100 to 0)
          duration: 1000, // Duration for button animation
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1, // Make buttons fully visible
          duration: 1000, // Button fade-in duration
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []); // The empty dependency array ensures this runs only once when the component mounts

  const handleLogin = () => {
    navigation.navigate('login'); // Navigate to Login screen
  };

  const handleRegister = () => {
    // Handle register logic here
    console.log('Register button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated logo with bounce effect */}
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: bounceAnim }] }]}>
        <Image source={images.logo} style={styles.image} />
      </Animated.View>

      {/* Animated buttons container with translation and opacity */}
      <Animated.View
        style={[styles.buttonContainer, { transform: [{ translateY: buttonAnim }], opacity: buttonOpacity }]}
      >
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </Animated.View>
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
