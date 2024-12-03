import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    if (loaded) {
      setIsSplashReady(true);
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!isSplashReady) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable header globally for this Stack
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(root)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
