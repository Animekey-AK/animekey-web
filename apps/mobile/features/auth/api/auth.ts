import { Platform } from "react-native";
import { ApiError, apiClient } from "@/core/api/client";
import { config } from "@/core/config";
import {
  buildCredentialPayload,
  buildDobValue,
  type CredentialPayload,
} from "@/features/auth/api/auth-helpers";

const AUTH_ENDPOINTS = {
  guest: "/media/v1/accounts/guest",
  signIn: "/media/v1/accounts/signin",
  signUp: "/media/v1/accounts/signup",
  verifySignUp: "/media/v1/accounts/signup/verify",
  resendOtp: "/media/v1/accounts/otp/resend",
} as const;

const DEFAULT_LANGUAGE = "EN";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  result: T;
}

export interface SessionAuthResult {
  nextStep: string;
  authToken?: string;
  refreshToken?: string;
  isGuest?: boolean;
  removeDeviceToken?: string;
}

export interface VerifySignUpResult {
  authToken: string;
  refreshToken: string;
}

interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

function getPlatformHeader() {
  if (Platform.OS === "ios") {
    return "1";
  }

  if (Platform.OS === "android") {
    return "2";
  }

  return "3";
}

function getTimezoneHeader() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function getDeviceNameHeader() {
  if (Platform.OS === "ios") {
    return "AnimeKey iPhone";
  }

  if (Platform.OS === "android") {
    return "AnimeKey Android";
  }

  return "AnimeKey Mobile";
}

function buildHeaders(authorization: string) {
  return {
    Authorization: authorization,
    "Accept-Language": DEFAULT_LANGUAGE,
    "Device-Name": getDeviceNameHeader(),
    Platform: getPlatformHeader(),
    Timezone: getTimezoneHeader(),
  };
}

function buildBasicHeaders() {
  return buildHeaders(config.apiBasicAuth);
}

function buildBearerHeaders(token: string) {
  return buildHeaders(`Bearer ${token}`);
}

function buildIdentifierPayload(email: string): CredentialPayload {
  return buildCredentialPayload(email);
}

export function getAuthErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof ApiError && error.message) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

export async function createGuestSession() {
  return apiClient.post<ApiResponse<SessionAuthResult>>(
    AUTH_ENDPOINTS.guest,
    {},
    {
      headers: buildBasicHeaders(),
    },
  );
}

export async function signInWithPassword(identifier: string, password: string) {
  return apiClient.patch<ApiResponse<SessionAuthResult>>(
    AUTH_ENDPOINTS.signIn,
    {
      ...buildIdentifierPayload(identifier),
      password,
    },
    {
      headers: buildBasicHeaders(),
    },
  );
}

export async function signUpWithPassword(input: SignUpInput) {
  console.log("Signing up with input:", input);
  const response = await apiClient.post<ApiResponse<string>>(
    AUTH_ENDPOINTS.signUp,
    {
      name: {
        first: input.firstName.trim(),
        last: input.lastName.trim(),
      },
      ...buildIdentifierPayload(input.email),
      password: input.password,
      dob: buildDobValue(input.birthDay, input.birthMonth, input.birthYear),
    },
    {
      headers: buildBasicHeaders(),
    },
  );

  console.log("Sign-up response:", response);

  return response.result;
}

export async function verifySignUpOtp(otpCode: string, temporaryToken: string) {
  return apiClient.post<ApiResponse<VerifySignUpResult>>(
    AUTH_ENDPOINTS.verifySignUp,
    { otpCode },
    {
      headers: buildBearerHeaders(temporaryToken),
    },
  );
}

export async function resendSignUpOtp(temporaryToken: string) {
  return apiClient.post<ApiResponse<boolean>>(
    AUTH_ENDPOINTS.resendOtp,
    {},
    {
      headers: buildBearerHeaders(temporaryToken),
    },
  );
}
