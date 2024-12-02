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
      </Stack>
    </>
  );
};

export default AuthLayout;