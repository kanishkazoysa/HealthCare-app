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
  Platform,
} from "react-native";
import { StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import images from "@/constants/images";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const { email, password } = form;
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (email === "") {
      newErrors.email = "Email/username is required.";
      valid = false;
    }
    if (password === "") {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        if (userDetails !== null) {
          const storedUser = JSON.parse(userDetails);
          
          // More secure comparison 
          const isValidUser = 
            (email === storedUser.email || email === storedUser.username) && 
            password === storedUser.password;

          if (isValidUser) {
            router.replace({
              pathname: "/(root)/(tabs)/home",
              params: { userIdentifier: email }
            });
          } else {
            Alert.alert("Login Failed", "Invalid email or password.");
          }
        } else {
          Alert.alert("Error", "No user found. Please register first.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred during login.");
        console.error(error);
      }
    }
  };
  

  const handleSignUpPress = () => {
    router.replace("/register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Full Screen Cover Image */}
      <View style={styles.coverImageContainer}>
        <Image
          source={images.cover}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <Text style={styles.welcomeText}>SIGN IN</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Enter your email/username"
              placeholderTextColor="#aaa"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
              <MaterialIcons name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="#707171" />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text onPress={handleSignUpPress} style={styles.linkText}>
                Sign Up
              </Text>
            </Text>
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
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  welcomeText: {
    position: "absolute",
    top: "87%",
    left: 20,
    fontSize: 29,
    fontWeight: "bold",
    color: "#205B9E",
    zIndex: 1,
    textAlign: "center",
    width: "90%",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  inputIcon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    height: 50,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
  },
  loginButton: {
    backgroundColor: "#0BA787",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  linkText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
  },
});

export default Login;