import { Modal, Pressable, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import { OtpInput } from "react-native-otp-entry";
import type { OtpInputRef } from "react-native-otp-entry";
import { AuthButton } from "@/features/auth/components/AuthButton";

interface AuthOtpModalProps {
  visible: boolean;
  destination: string;
  code: string;
  error?: string | null;
  loading?: boolean;
  onChangeCode: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  onResend: () => void;
}

export function AuthOtpModal({
  visible,
  destination,
  code,
  error,
  loading = false,
  onChangeCode,
  onClose,
  onSubmit,
  onResend,
}: AuthOtpModalProps) {
  const otpRef = useRef<OtpInputRef>(null);

  // Sync external code value to the OTP input (e.g. when reset to "")
  useEffect(() => {
    if (!code) {
      otpRef.current?.clear();
    }
  }, [code]);
  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <View className="flex-1 items-center justify-center bg-black/75 px-6">
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View className="w-full max-w-[360px] rounded-[28px] border border-white/10 bg-[#0b0d0c] px-5 py-6">
          <Text className="text-[24px] font-bold text-white">
            Verify your account
          </Text>
          <Text className="mt-2 text-[14px] leading-6 text-white/70">
            Enter the 4-digit code we sent to {destination}.
          </Text>

          <View className="mt-5 gap-4">
            {error ? (
              <View className="rounded-[18px] border border-red-400/40 bg-[#391216] px-4 py-3">
                <Text className="text-[13px] leading-5 text-red-100">
                  {error}
                </Text>
              </View>
            ) : null}

            <View>
              <Text className="mb-2 text-[13px] font-medium text-white/70">
                Verification code
              </Text>
              <OtpInput
                ref={otpRef}
                numberOfDigits={4}
                onTextChange={onChangeCode}
                autoFocus
                type="numeric"
                focusStickBlinkingDuration={500}
                theme={{
                  pinCodeContainerStyle: {
                    width: 56,
                    height: 56,
                    borderRadius: 18,
                    borderWidth: 1,
                    borderColor: error
                      ? "rgba(248, 113, 113, 0.8)"
                      : "rgba(255, 255, 255, 0.2)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                  },
                  focusedPinCodeContainerStyle: {
                    borderColor: error
                      ? "rgba(248, 113, 113, 0.8)"
                      : "rgba(113, 199, 4, 0.8)",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                  },
                  pinCodeTextStyle: {
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#ffffff",
                  },
                  focusStickStyle: {
                    backgroundColor: "#71C704",
                    width: 2,
                    height: 24,
                  },
                }}
              />
            </View>

            <AuthButton
              label="Verify code"
              loading={loading}
              onPress={onSubmit}
            />

            <Pressable disabled={loading} onPress={onResend}>
              <Text className="text-center text-[14px] font-medium text-brand">
                Resend code
              </Text>
            </Pressable>

            <Pressable disabled={loading} onPress={onClose}>
              <Text className="text-center text-[14px] text-white/55">
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
