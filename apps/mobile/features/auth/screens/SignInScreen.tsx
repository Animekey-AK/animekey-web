import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  getAuthErrorMessage,
  signInWithPassword,
} from "@/features/auth/api/auth";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthScaffold } from "@/features/auth/components/AuthScaffold";
import { authSession } from "@/features/auth/lib/auth-session";
import { useDevMode } from "@/core/dev/DevModeContext";
import { mockSignInWithPassword } from "@/core/dev/mock-auth";

export default function SignInScreen() {
  const { mockApi } = useDevMode();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setError(null);

    if (!emailOrPhone.trim()) {
      setError("Enter your email or phone number.");
      return;
    }

    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }

    try {
      setIsPending(true);
      const response = mockApi
        ? await mockSignInWithPassword()
        : await signInWithPassword(emailOrPhone, password);
      const { authToken, refreshToken, isGuest = false, nextStep } =
        response.result;

      if (!authToken || !refreshToken) {
        if (nextStep === "90") {
          setError("This account has reached its device limit. Remove a device and try again.");
          return;
        }

        setError("Your account needs one more backend step before mobile can finish sign-in.");
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
    } catch (signInError) {
      setError(
        getAuthErrorMessage(
          signInError,
          "Couldn't sign you in right now.",
        ),
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AuthScaffold
      eyebrow="Sign in"
      title="Welcome back"
      description="Pick up where you left off."
      footer={
        <Text className="text-center text-[14px] leading-6 text-white/70">
          Don't have an account yet?{" "}
          <Text
            className="font-semibold text-brand"
            onPress={() => router.push("/(auth)/sign-up")}
          >
            Create one
          </Text>
        </Text>
      }
    >
      {error ? (
        <View className="rounded-[22px] border border-red-400/40 bg-[#391216] px-4 py-3">
          <Text className="text-[13px] leading-5 text-red-100">{error}</Text>
        </View>
      ) : null}

      <AuthField
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        label="Email or phone"
        onChangeText={setEmailOrPhone}
        placeholder="Enter email or phone number"
        value={emailOrPhone}
      />

      <AuthField
        autoComplete="current-password"
        label="Password"
        onChangeText={setPassword}
        placeholder="Password"
        revealable
        secureTextEntry
        value={password}
      />

      <Pressable
        className="self-end"
        onPress={() => setError("Password reset is not wired up yet.")}
      >
        <Text className="text-[13px] font-medium text-brand">
          Forgot password?
        </Text>
      </Pressable>

      <AuthButton label="Login" loading={isPending} onPress={handleSignIn} />

      <View className="my-1 flex-row items-center gap-3">
        <View className="h-px flex-1 bg-white/10" />
        <Text className="text-[13px] text-white/50">
          Or continue with
        </Text>
        <View className="h-px flex-1 bg-white/10" />
      </View>

      <AuthButton
        accessory={
          <View className="h-8 w-8 items-center justify-center rounded-full bg-black/10">
            <Text className="text-[13px] font-black text-black">G</Text>
          </View>
        }
        label="Continue with Google"
        onPress={() => setError("Google sign-in is not wired up yet.")}
        variant="light"
      />

      <AuthButton
        accessory={
          <View className="h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.06]">
            <Text className="text-[12px] font-black text-white">A</Text>
          </View>
        }
        label="Continue with Apple"
        onPress={() => setError("Apple sign-in is not wired up yet.")}
        variant="secondary"
      />
    </AuthScaffold>
  );
}
