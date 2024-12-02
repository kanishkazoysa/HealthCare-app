import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="auth/(login)" />
        <Stack.Screen name="auth/(register)" />
        {/* <Stack.Screen name="auth/(forgot-password)" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
};

export default AuthLayout;