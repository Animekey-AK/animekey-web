import { createContext, useContext, useState, type ReactNode } from "react";

interface DevModeState {
  mockApi: boolean;
  toggleMockApi: () => void;
}

const DevModeContext = createContext<DevModeState>({
  mockApi: false,
  toggleMockApi: () => {},
});

export function useDevMode(): DevModeState {
  return useContext(DevModeContext);
}

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [mockApi, setMockApi] = useState(false);

  const toggleMockApi = () => setMockApi((prev) => !prev);

  return (
    <DevModeContext.Provider value={{ mockApi, toggleMockApi }}>
      {children}
    </DevModeContext.Provider>
  );
}
