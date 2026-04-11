import "../global.css";

import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { AppProviders } from "@/core/providers/AppProviders";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts, check auth state, prefetch config, etc. here
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!ready) return null;

  return (
    <AppProviders>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#070707" },
          animation: "fade",
        }}
      />
    </AppProviders>
  );
}
