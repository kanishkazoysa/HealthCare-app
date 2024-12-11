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
import { router } from "expo-router";
import images from "@/constants/images";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = async () => {
    const { username, email, password, confirmPassword } = form;
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
      Alert.alert("Error", "Please fill in all fields.");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
    } else {
      await AsyncStorage.setItem('userDetails', JSON.stringify({ username, email, password }));//store user details in async storage
      Alert.alert("Registration Successful", "You have successfully registered!");
      router.replace("/login");
      console.log("User Details: ", { username, email, password });
    }
  };

  const handleLoginPress = () => {
    router.replace("/login");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <View style={styles.coverImageContainer}>
        <Image
          source={images.cover}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <Text style={styles.welcomeText}>REGISTER</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Enter your username"
              placeholderTextColor="#aaa"
              value={form.username}
              onChangeText={(value) => setForm({ ...form, username: value })}
              autoCapitalize="none"
            />
          </View>

       
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Enter your email"
              placeholderTextColor="#aaa"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

         
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

          
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.inputField}
              placeholder="Confirm your password"
              placeholderTextColor="#aaa"
              value={form.confirmPassword}
              onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
              secureTextEntry={!passwordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
              <MaterialIcons name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="#707171" />
            </TouchableOpacity>
          </View>

         
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text onPress={handleLoginPress} style={styles.linkText}>
                Login
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
    top: -30,
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
});

export default Register;
