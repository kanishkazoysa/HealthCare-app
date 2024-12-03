import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image, 
  ScrollView, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

import images from '@/constants/images'; 

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });

  const handleLogin = () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in both fields.");
    } else {
      // Handle login logic here
      console.log("Email:", form.email);
      console.log("Password:", form.password);
      Alert.alert("Logged In", "Welcome to the app!");
    }
  };

  const renderInputField = (
    placeholder, 
    value, 
    onChangeText, 
    isPassword = false, 
    keyboardType = "default",
    iconName
  ) => {
    const inputType = isPassword ? "password" : "email";
    
    return (
      <View style={[
        styles.inputContainer, 
        isFocused[inputType] && styles.inputContainerFocused
      ]}>
        <Feather 
          name={iconName} 
          size={20} 
          color={isFocused[inputType] ? "#0BA787" : "#888"} 
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize="none"
          secureTextEntry={isPassword && !isPasswordVisible}
          onFocus={() => setIsFocused({...isFocused, [inputType]: true})}
          onBlur={() => setIsFocused({...isFocused, [inputType]: false})}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIconContainer}
          >
            <Feather 
              name={isPasswordVisible ? "eye-off" : "eye"} 
              size={20} 
              color="#888"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content" 
      />

      {/* Full Screen Cover Image */}
      <View style={styles.coverImageContainer}>
        <Image 
          source={images.cover} 
          style={styles.coverImage} 
          resizeMode="cover"
        />
        <Text style={styles.welcomeText}>LOGIN </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form container */}
        <View style={styles.formContainer}>
          {renderInputField(
            "Enter your email",
            form.email,
            (value) => setForm({ ...form, email: value }),
            false,
            "email-address",
            "mail"
          )}

          {renderInputField(
            "Enter your password",
            form.password,
            (value) => setForm({ ...form, password: value }),
            true,
            "default",
            "lock"
          )}

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLinkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.45,
    position: "relative",
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  welcomeText: {
    position: "absolute",
    top: "87%",
    bottom: 20,
    left: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#205B9E",
    zIndex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  inputContainerFocused: {
    borderColor: "#0BA787",
    shadowColor: "#0BA787",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 5,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#0BA787",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#0BA787",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: "#666",
  },
  signupLinkText: {
    color: "#0BA787",
    fontWeight: "bold",
  },
});

export default Login;