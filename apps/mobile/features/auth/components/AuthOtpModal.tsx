import { Modal, Pressable, Text, View } from "react-native";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { AuthField } from "@/features/auth/components/AuthField";

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
                <Text className="text-[13px] leading-5 text-red-100">{error}</Text>
              </View>
            ) : null}

            <AuthField
              autoFocus
              keyboardType="number-pad"
              label="Verification code"
              maxLength={4}
              onChangeText={onChangeCode}
              placeholder="0000"
              value={code}
            />

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
