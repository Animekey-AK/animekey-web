import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/shared/lib/cn";

interface AuthScaffoldProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  panelClassName?: string;
  topContent?: ReactNode;
}

export function AuthScaffold({
  eyebrow,
  title,
  description,
  children,
  footer,
  panelClassName,
  topContent,
}: AuthScaffoldProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#050505]" edges={["top", "bottom"]}>
      <ImageBackground
        className="absolute inset-0"
        resizeMode="cover"
        source={require("@/assets/images/background-1.png")}
      />
      <View className="absolute inset-0 bg-black/60" />
      <View className="absolute inset-0" style={styles.backgroundGradient} />
      <View className="absolute -right-32 top-24 h-56 w-56 rounded-full bg-brand/20" />
      <View className="absolute -left-36 bottom-32 h-56 w-56 rounded-full bg-black/60" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View className="px-5 pt-2">
          <Image
            source={require("@/assets/images/logo/logo.png")}
            className="h-10 w-32"
            resizeMode="contain"
          />
        </View>

        <ScrollView
          bounces={false}
          className="flex-1"
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pb-10 pt-6">
            {topContent ? <View className="mb-10 pt-2">{topContent}</View> : null}
            <View className={cn(panelClassName)}>
              <Text className="text-[13px] font-medium text-white/60">
                {eyebrow}
              </Text>
              <Text className="mt-2 text-[28px] font-bold leading-[32px] text-white">
                {title}
              </Text>
              <Text className="mt-2 text-[15px] leading-7 text-white/75">
                {description}
              </Text>

              <View className="mt-8 gap-4">{children}</View>
              {footer ? <View className="mt-6">{footer}</View> : null}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(3, 3, 5, 0.18)",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
