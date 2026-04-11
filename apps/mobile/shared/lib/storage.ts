// Thin wrapper around expo-secure-store.
// Add expo-secure-store to package.json before using.
// import * as SecureStore from "expo-secure-store";

export const storage = {
  get: async (key: string): Promise<string | null> => {
    // return SecureStore.getItemAsync(key);
    return null;
  },
  set: async (key: string, value: string): Promise<void> => {
    // return SecureStore.setItemAsync(key, value);
  },
  remove: async (key: string): Promise<void> => {
    // return SecureStore.deleteItemAsync(key);
  },
};
