import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { cn } from "@/shared/lib/cn";

interface AuthFieldProps extends TextInputProps {
  label: string;
  error?: string | null;
  helperText?: string;
  revealable?: boolean;
  containerClassName?: string;
}

export function AuthField({
  label,
  error,
  helperText,
  revealable = false,
  containerClassName,
  secureTextEntry,
  onFocus,
  onBlur,
  ...inputProps
}: AuthFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(revealable || Boolean(secureTextEntry));

  return (
    <View className={cn("gap-2", containerClassName)}>
      <Text className="text-[13px] font-medium text-white/70">
        {label}
      </Text>

      <View
        className={cn(
          "h-14 flex-row items-center gap-3 rounded-[18px] border px-4",
          isFocused ? "border-brand/80 bg-black/80" : "border-white/20 bg-black/70",
          error ? "border-red-400/80" : null,
        )}
      >
        <TextInput
          className="flex-1 py-4 text-[15px] font-medium text-white"
          placeholderTextColor="rgba(255,255,255,0.58)"
          secureTextEntry={revealable ? isHidden : secureTextEntry}
          selectionColor="#71C704"
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          {...inputProps}
        />

        {revealable ? (
          <Pressable
            className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5"
            onPress={() => setIsHidden((current) => !current)}
          >
            <Text className="text-[12px] font-semibold text-white/90">
              {isHidden ? "Show" : "Hide"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text className="text-[12px] leading-5 text-red-300">{error}</Text>
      ) : helperText ? (
        <Text className="text-[12px] leading-5 text-white/50">{helperText}</Text>
      ) : null}
    </View>
  );
}
