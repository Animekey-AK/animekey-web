import { ActivityIndicator, Pressable, Text, View } from "react-native";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type AuthButtonVariant = "primary" | "secondary" | "ghost" | "light";

interface AuthButtonProps {
  label: string;
  variant?: AuthButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  accessory?: ReactNode;
  onPress?: () => void;
}

const containerStyles: Record<AuthButtonVariant, string> = {
  primary:
    "border border-brand bg-brand shadow-lg shadow-brand/20",
  secondary:
    "border border-white/20 bg-black/70",
  ghost:
    "border border-white/10 bg-black/30",
  light:
    "border border-white/20 bg-white",
};

const labelStyles: Record<AuthButtonVariant, string> = {
  primary: "text-black",
  secondary: "text-white",
  ghost: "text-white/80",
  light: "text-black",
};

export function AuthButton({
  label,
  variant = "primary",
  disabled = false,
  loading = false,
  accessory,
  onPress,
}: AuthButtonProps) {
  return (
    <Pressable
      className={cn(
        "h-14 flex-row items-center justify-center rounded-full px-6",
        containerStyles[variant],
        disabled && "opacity-45",
      )}
      disabled={disabled || loading}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-center gap-3">
        {loading ? (
          <ActivityIndicator color={variant === "light" ? "#050505" : "#FFFFFF"} />
        ) : (
          <>
            {accessory ? accessory : null}
            <Text
              className={cn(
                "text-[16px] font-semibold",
                labelStyles[variant],
              )}
            >
              {label}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}
