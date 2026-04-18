import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Add QueryClientProvider here once @tanstack/react-query is installed.
// Add AuthProvider here once auth feature is wired up.

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  if (__DEV__) {
    const { DevModeProvider } = require("@/core/dev/DevModeContext");
    const { DevToolbar } = require("@/core/dev/DevToolbar");
    return (
      <SafeAreaProvider>
        <DevModeProvider>
          {children}
          <DevToolbar />
        </DevModeProvider>
      </SafeAreaProvider>
    );
  }

  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
