import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Add QueryClientProvider here once @tanstack/react-query is installed.
// Add AuthProvider here once auth feature is wired up.

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}
