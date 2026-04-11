import { useState } from "react";
import { Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import {
  getAuthErrorMessage,
  resendSignUpOtp,
  signUpWithPassword,
  verifySignUpOtp,
} from "@/features/auth/api/auth";
import { AuthButton } from "@/features/auth/components/AuthButton";
import { AuthField } from "@/features/auth/components/AuthField";
import { AuthOtpModal } from "@/features/auth/components/AuthOtpModal";
import { AuthScaffold } from "@/features/auth/components/AuthScaffold";
import { AuthSelectField } from "@/features/auth/components/AuthSelectField";
import { authSession } from "@/features/auth/lib/auth-session";

const TERMS_AND_CONDITIONS_URL = "https://animekey.tv/static-content/terms-and-conditions";
const MONTH_OPTIONS = [
  { value: "01", label: "January", shortLabel: "Jan" },
  { value: "02", label: "February", shortLabel: "Feb" },
  { value: "03", label: "March", shortLabel: "Mar" },
  { value: "04", label: "April", shortLabel: "Apr" },
  { value: "05", label: "May", shortLabel: "May" },
  { value: "06", label: "June", shortLabel: "Jun" },
  { value: "07", label: "July", shortLabel: "Jul" },
  { value: "08", label: "August", shortLabel: "Aug" },
  { value: "09", label: "September", shortLabel: "Sep" },
  { value: "10", label: "October", shortLabel: "Oct" },
  { value: "11", label: "November", shortLabel: "Nov" },
  { value: "12", label: "December", shortLabel: "Dec" },
] as const;
const MINIMUM_AGE = 18;
const TODAY = new Date();
const LATEST_ALLOWED_BIRTH_DATE = new Date(
  TODAY.getFullYear() - MINIMUM_AGE,
  TODAY.getMonth(),
  TODAY.getDate(),
);
const MAX_ALLOWED_YEAR = LATEST_ALLOWED_BIRTH_DATE.getFullYear();
const MAX_ALLOWED_MONTH = LATEST_ALLOWED_BIRTH_DATE.getMonth() + 1;
const MAX_ALLOWED_DAY = LATEST_ALLOWED_BIRTH_DATE.getDate();
const YEAR_OPTIONS = Array.from({ length: 100 }, (_, index) => {
  const value = String(MAX_ALLOWED_YEAR - index);

  return { value, label: value };
});

type DobField = "day" | "month" | "year";
type DobOption = {
  value: string;
  label: string;
  shortLabel?: string;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function buildDayOptions(limit: number) {
  return Array.from({ length: limit }, (_, index) => {
    const value = String(index + 1).padStart(2, "0");

    return { value, label: value };
  });
}

function sanitizeDobSelection(day: string, month: string, year: string) {
  if (!year) {
    return { day, month, year };
  }

  const numericYear = Number(year);
  let nextMonth = month;
  let nextDay = day;

  if (numericYear === MAX_ALLOWED_YEAR && nextMonth && Number(nextMonth) > MAX_ALLOWED_MONTH) {
    nextMonth = "";
    nextDay = "";
  }

  if (nextMonth) {
    const numericMonth = Number(nextMonth);
    const daysInMonth = getDaysInMonth(numericYear, numericMonth);
    const maxDay =
      numericYear === MAX_ALLOWED_YEAR && numericMonth === MAX_ALLOWED_MONTH
        ? Math.min(daysInMonth, MAX_ALLOWED_DAY)
        : daysInMonth;

    if (nextDay && Number(nextDay) > maxDay) {
      nextDay = "";
    }
  }

  return { day: nextDay, month: nextMonth, year };
}

function isAtLeastMinimumAge(day: string, month: string, year: string) {
  const numericDay = Number(day);
  const numericMonth = Number(month);
  const numericYear = Number(year);

  if (!numericDay || !numericMonth || !numericYear) {
    return false;
  }

  const enteredDate = new Date(numericYear, numericMonth - 1, numericDay);
  const isValidDate =
    enteredDate.getFullYear() === numericYear &&
    enteredDate.getMonth() === numericMonth - 1 &&
    enteredDate.getDate() === numericDay;

  if (!isValidDate) {
    return false;
  }

  return enteredDate <= LATEST_ALLOWED_BIRTH_DATE;
}

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeDobField, setActiveDobField] = useState<DobField | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [isOtpPending, setIsOtpPending] = useState(false);

  const numericBirthYear = birthYear ? Number(birthYear) : null;
  const numericBirthMonth = birthMonth ? Number(birthMonth) : null;
  const monthOptions: DobOption[] = MONTH_OPTIONS.filter((option) => {
    if (numericBirthYear !== MAX_ALLOWED_YEAR) {
      return true;
    }

    return Number(option.value) <= MAX_ALLOWED_MONTH;
  }).map(({ value, label, shortLabel }) => ({ value, label, shortLabel }));
  const maxSelectableDay =
    numericBirthYear && numericBirthMonth
      ? numericBirthYear === MAX_ALLOWED_YEAR && numericBirthMonth === MAX_ALLOWED_MONTH
        ? Math.min(getDaysInMonth(numericBirthYear, numericBirthMonth), MAX_ALLOWED_DAY)
        : getDaysInMonth(numericBirthYear, numericBirthMonth)
      : 31;
  const dayOptions = buildDayOptions(maxSelectableDay);
  const dobOptions: Record<DobField, DobOption[]> = {
    day: dayOptions,
    month: monthOptions,
    year: YEAR_OPTIONS,
  };

  const dobTitle: Record<DobField, string> = {
    day: "Select day",
    month: "Select month",
    year: "Select year",
  };

  const dobValue: Record<DobField, string> = {
    day: birthDay,
    month: birthMonth,
    year: birthYear,
  };

  const selectedDobOptions: Record<DobField, DobOption | undefined> = {
    day: dayOptions.find((option) => option.value === birthDay),
    month: MONTH_OPTIONS.find((option) => option.value === birthMonth),
    year: YEAR_OPTIONS.find((option) => option.value === birthYear),
  };

  const pendingSignup = authSession.getPendingSignup();

  const handleOpenTerms = async () => {
    try {
      const canOpenTerms = await Linking.canOpenURL(TERMS_AND_CONDITIONS_URL);

      if (!canOpenTerms) {
        setError("Couldn't open the terms and conditions link.");
        return;
      }

      await Linking.openURL(TERMS_AND_CONDITIONS_URL);
    } catch {
      setError("Couldn't open the terms and conditions link.");
    }
  };

  const handleCreateAccount = async () => {
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Add your first and last name.");
      return;
    }

    if (!emailOrPhone.trim()) {
      setError("Enter your email or phone number.");
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setError("Create and confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!birthDay.trim() || !birthMonth.trim() || !birthYear.trim()) {
      setError("Enter your date of birth.");
      return;
    }

    if (!isAtLeastMinimumAge(birthDay, birthMonth, birthYear)) {
      setError("You must be 18 years or older to create an account.");
      return;
    }

    if (!acceptedTerms) {
      setError("Accept the terms to create your account.");
      return;
    }

    try {
      setIsPending(true);
      const response = await signUpWithPassword({
        firstName,
        lastName,
        emailOrPhone,
        password,
        birthDay,
        birthMonth,
        birthYear,
      });

      if (!response.result) {
        setError("We couldn't start verification for this account.");
        return;
      }

      authSession.setPendingSignup({
        temporaryToken: response.result,
        destination: emailOrPhone.trim(),
      });
      setOtpCode("");
      setOtpError(null);
      setIsOtpVisible(true);
    } catch (signUpError) {
      setError(
        getAuthErrorMessage(
          signUpError,
          "Couldn't create your account right now.",
        ),
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleSelectDob = (field: DobField, value: string) => {
    const nextDob = sanitizeDobSelection(
      field === "day" ? value : birthDay,
      field === "month" ? value : birthMonth,
      field === "year" ? value : birthYear,
    );

    setBirthDay(nextDob.day);
    setBirthMonth(nextDob.month);
    setBirthYear(nextDob.year);
    setActiveDobField(null);
  };

  const handleCloseOtp = () => {
    authSession.clearPendingSignup();
    setOtpCode("");
    setOtpError(null);
    setIsOtpVisible(false);
  };

  const handleVerifyOtp = async () => {
    setOtpError(null);

    if (!otpCode.trim()) {
      setOtpError("Enter the 4-digit code.");
      return;
    }

    if (!pendingSignup) {
      setOtpError("Start signup again to request a new code.");
      return;
    }

    try {
      setIsOtpPending(true);
      const response = await verifySignUpOtp(
        otpCode.trim(),
        pendingSignup.temporaryToken,
      );
      const { authToken, refreshToken } = response.result;

      if (!authToken || !refreshToken) {
        setOtpError("Verification worked, but the session response was incomplete.");
        return;
      }

      authSession.clearPendingSignup();
      authSession.setSession({
        authToken,
        refreshToken,
        isGuest: false,
      });
      router.replace("/(tabs)/home");
    } catch (verifyError) {
      setOtpError(
        getAuthErrorMessage(
          verifyError,
          "Couldn't verify your code.",
        ),
      );
    } finally {
      setIsOtpPending(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError(null);

    if (!pendingSignup) {
      setOtpError("Start signup again to request a new code.");
      return;
    }

    try {
      setIsOtpPending(true);
      await resendSignUpOtp(pendingSignup.temporaryToken);
    } catch (resendError) {
      setOtpError(
        getAuthErrorMessage(
          resendError,
          "Couldn't resend the code right now.",
        ),
      );
    } finally {
      setIsOtpPending(false);
    }
  };

  return (
    <>
      <AuthScaffold
        eyebrow="Create account"
        title="Create your account"
        description="Save shows, build your watchlist, and keep your profile in sync."
        footer={
          <Text className="text-center text-[14px] leading-6 text-white/70">
            Already have an account?{" "}
            <Text
              className="font-semibold text-brand"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              Sign in
            </Text>
          </Text>
        }
        panelClassName="pb-10"
      >
        {error ? (
          <View className="rounded-[18px] border border-red-400/40 bg-[#391216] px-4 py-3">
            <Text className="text-[13px] leading-5 text-red-100">{error}</Text>
          </View>
        ) : null}

        <View className="flex-row gap-3">
          <AuthField
            autoComplete="given-name"
            containerClassName="flex-1"
            label="First name"
            onChangeText={setFirstName}
            placeholder="First name"
            value={firstName}
          />
          <AuthField
            autoComplete="family-name"
            containerClassName="flex-1"
            label="Last name"
            onChangeText={setLastName}
            placeholder="Last name"
            value={lastName}
          />
        </View>

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
          autoComplete="new-password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Create password"
          revealable
          secureTextEntry
          value={password}
        />

        <AuthField
          autoComplete="new-password"
          label="Confirm password"
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          revealable
          secureTextEntry
          value={confirmPassword}
        />

        <View className="gap-3">
          <Text className="text-[13px] font-medium text-white/70">Date of birth</Text>
          <View className="flex-row gap-3">
            <AuthSelectField
              containerClassName="flex-1"
              label="Day"
              onPress={() => setActiveDobField("day")}
              placeholder="Day"
              value={selectedDobOptions.day?.label}
            />
            <AuthSelectField
              containerClassName="flex-1"
              label="Month"
              onPress={() => setActiveDobField("month")}
              placeholder="Month"
              value={selectedDobOptions.month?.shortLabel}
            />
            <AuthSelectField
              containerClassName="flex-1"
              label="Year"
              onPress={() => setActiveDobField("year")}
              placeholder="Year"
              value={selectedDobOptions.year?.label}
            />
          </View>
        </View>

        <View className="flex-row items-start gap-3 rounded-[18px] border border-white/10 bg-black/60 px-4 py-4">
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acceptedTerms }}
            className="mt-0.5"
            onPress={() => setAcceptedTerms((current) => !current)}
          >
            <View
              className={
                acceptedTerms
                  ? "h-5 w-5 items-center justify-center rounded-md border border-brand bg-brand"
                  : "h-5 w-5 items-center justify-center rounded-md border border-white/20 bg-transparent"
              }
            >
              {acceptedTerms ? (
                <Text className="text-[10px] font-black text-black">X</Text>
              ) : null}
            </View>
          </Pressable>

          <Text className="flex-1 text-[14px] leading-6 text-white/80">
            I agree to the{" "}
            <Text className="font-semibold text-brand" onPress={handleOpenTerms}>
              terms and conditions
            </Text>
            .
          </Text>
        </View>

        <AuthButton
          label="Create account"
          loading={isPending}
          onPress={handleCreateAccount}
        />

        <View className="my-1 flex-row items-center gap-3">
          <View className="h-px flex-1 bg-white/10" />
          <Text className="text-[13px] text-white/50">Or continue with</Text>
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

      <Modal
        animationType="slide"
        onRequestClose={() => setActiveDobField(null)}
        transparent
        visible={activeDobField !== null}
      >
        <View className="flex-1 justify-end bg-black/70">
          <Pressable className="absolute inset-0" onPress={() => setActiveDobField(null)} />

          {activeDobField ? (
            <View className="max-h-[60%] rounded-t-[28px] border-t border-white/10 bg-[#0b0d0c] px-5 pb-8 pt-5">
              <View className="mb-4 h-1.5 w-12 self-center rounded-full bg-white/20" />
              <Text className="text-[18px] font-semibold text-white">{dobTitle[activeDobField]}</Text>

              <ScrollView
                className="mt-5"
                contentContainerStyle={{ paddingBottom: 12 }}
                showsVerticalScrollIndicator={false}
              >
                {dobOptions[activeDobField].map((option) => {
                  const isSelected = dobValue[activeDobField] === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      className={
                        isSelected
                          ? "mb-2 rounded-[18px] border border-brand bg-brand/20 px-4 py-4"
                          : "mb-2 rounded-[18px] border border-white/10 bg-black/50 px-4 py-4"
                      }
                      onPress={() => handleSelectDob(activeDobField, option.value)}
                    >
                      <Text className={isSelected ? "text-[16px] font-medium text-white" : "text-[16px] text-white/80"}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </Modal>

      <AuthOtpModal
        code={otpCode}
        destination={pendingSignup?.destination ?? emailOrPhone.trim()}
        error={otpError}
        loading={isOtpPending}
        onChangeCode={setOtpCode}
        onClose={handleCloseOtp}
        onResend={handleResendOtp}
        onSubmit={handleVerifyOtp}
        visible={isOtpVisible}
      />
    </>
  );
}
