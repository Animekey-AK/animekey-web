import { Pressable, Text } from "react-native";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  label: string;
  variant?: Variant;
  disabled?: boolean;
  onPress?: () => void;
}

const base = "flex-row items-center justify-center rounded-xl px-6 py-3.5 active:opacity-75";

const styles: Record<Variant, string> = {
  primary:   "bg-brand",
  secondary: "bg-surface-raised border border-white/15",
  ghost:     "bg-transparent",
};

const textStyles: Record<Variant, string> = {
  primary:   "text-black font-semibold text-base",
  secondary: "text-white font-medium text-base",
  ghost:     "text-white/70 font-medium text-base",
};

export function Button({
  label,
  variant = "primary",
  disabled = false,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      className={`${base} ${styles[variant]} ${disabled ? "opacity-40" : ""}`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className={textStyles[variant]}>{label}</Text>
    </Pressable>
  );
}
