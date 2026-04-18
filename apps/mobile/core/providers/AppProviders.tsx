import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DevModeProvider } from "@/core/dev/DevModeContext";
import { DevToolbar } from "@/core/dev/DevToolbar";

// Add QueryClientProvider here once @tanstack/react-query is installed.
// Add AuthProvider here once auth feature is wired up.

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SafeAreaProvider>
      <DevModeProvider>
        {children}
        {__DEV__ ? <DevToolbar /> : null}
      </DevModeProvider>
    </SafeAreaProvider>
  );
}
