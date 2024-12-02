import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Applying the animated view */}
      <Text style={styles.text}>This is the loading page</Text>
      <Animated.View style={[styles.imageContainer, { transform: [{ scale: bounceAnim }] }]}>
        <Image source={images.logo} style={styles.image} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optional: change background color
  },
  imageContainer: {
    marginBottom: 20, // Optional: space between the image and the text
  },
  image: {
    width: 150, // Image width
    height: 150, // Image height
    resizeMode: 'contain', // Ensures the image fits within the container
  },
  text: {
    fontSize: 18,
    marginBottom: 50, // Optional: space between the text and the image
    color: '#333', // Text color
    fontWeight: 'bold', // Optional: bold text
  },
});
