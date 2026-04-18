import { Pressable, Text, View } from "react-native";
import { cn } from "@/shared/lib/cn";

interface AuthSelectFieldProps {
  label: string;
  value?: string;
  placeholder: string;
  onPress: () => void;
  containerClassName?: string;
  error?: string | null;
}

export function AuthSelectField({
  label,
  value,
  placeholder,
  onPress,
  containerClassName,
  error,
}: AuthSelectFieldProps) {
  return (
    <View className={cn("gap-2", containerClassName)}>
      <Text className="text-[13px] font-medium text-white/70">{label}</Text>

      <Pressable
        className={cn(
          "h-14 flex-row items-center justify-between rounded-[18px] border px-4",
          error
            ? "border-red-400/80 bg-black/75"
            : "border-white/20 bg-black/70",
        )}
        onPress={onPress}
      >
        <Text
          className={cn(
            "text-[16px] font-medium",
            value ? "text-white" : "text-white/50",
          )}
        >
          {value ?? placeholder}
        </Text>
        <Text className="text-[16px] text-white/50">v</Text>
      </Pressable>

      {error ? (
        <Text className="text-[12px] leading-5 text-red-400">{error}</Text>
      ) : null}
    </View>
  );
}
