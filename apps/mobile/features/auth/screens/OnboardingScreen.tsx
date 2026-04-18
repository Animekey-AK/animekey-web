import { useState } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  createGuestSession,
  getAuthErrorMessage,
} from "@/features/auth/api/auth";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { authSession } from "@/features/auth/lib/auth-session";
import { useDevMode } from "@/core/dev/DevModeContext";
import { mockCreateGuestSession } from "@/core/dev/mock-auth";

export default function OnboardingScreen() {
  const { mockApi } = useDevMode();
  const [isGuestPending, setIsGuestPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinueAsGuest = async () => {
    try {
      setError(null);
      setIsGuestPending(true);

      const response = mockApi
        ? await mockCreateGuestSession()
        : await createGuestSession();
      const { authToken, refreshToken, isGuest = true, nextStep } =
        response.result;

      if (!authToken || !refreshToken) {
        setError("Guest access is available, but the session response is incomplete.");
        return;
      }

      authSession.clearPendingSignup();
      authSession.setSession({
        authToken,
        refreshToken,
        isGuest,
        nextStep,
      });

      router.replace("/(tabs)/home");
    } catch (guestError) {
      setError(
        getAuthErrorMessage(
          guestError,
          "Couldn't start guest access right now.",
        ),
      );
    } finally {
      setIsGuestPending(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#050505]" edges={["top", "bottom"]}>
      <ImageBackground
        className="absolute inset-0"
        resizeMode="cover"
        source={require("@/assets/images/background-1.png")}
      />
      <View className="absolute inset-0 bg-black/60" />
      <View className="absolute inset-0 bg-black/30" />
      <View className="absolute -right-36 top-32 h-64 w-64 rounded-full bg-brand/10" />
      <View className="absolute -left-40 bottom-28 h-52 w-52 rounded-full bg-black/50" />

      <View className="flex-1 px-5 pb-8 pt-2">
        <Image
          source={require("@/assets/images/logo/logo.png")}
          className="h-10 w-32"
          resizeMode="contain"
        />

        <View className="flex-1 justify-center">
          <View className="max-w-[250px] gap-3">
            <Text className="text-[13px] font-medium text-white/60">
              AnimeKey access
            </Text>
            <Text className="text-[30px] font-bold leading-[34px] text-white">
              Your anime, all in one place.
            </Text>
            <Text className="text-[15px] leading-7 text-white/70">
              Stream, save shows, and move between phone and TV without losing your place.
            </Text>
          </View>
        </View>

        <View className="gap-3">
          {error ? (
            <View className="rounded-[22px] border border-red-400/40 bg-[#391216] px-4 py-3">
              <Text className="text-[13px] leading-5 text-red-100">{error}</Text>
            </View>
          ) : null}

          <AuthButton
            label="Create Account"
            onPress={() => router.push("/(auth)/sign-up")}
          />
          <AuthButton
            label="Sign In"
            onPress={() => router.push("/(auth)/sign-in")}
            variant="secondary"
          />
          <AuthButton
            label="Continue as Guest"
            loading={isGuestPending}
            onPress={handleContinueAsGuest}
            variant="ghost"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
