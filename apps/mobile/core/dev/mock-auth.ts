import type {
  ApiResponse,
  SessionAuthResult,
  VerifySignUpResult,
} from "@/features/auth/api/auth";

const FAKE_DELAY_MS = 600;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockCreateGuestSession(): Promise<
  ApiResponse<SessionAuthResult>
> {
  await delay(FAKE_DELAY_MS);
  return {
    statusCode: 200,
    message: "Success",
    result: {
      nextStep: "",
      authToken: "mock-guest-auth-token",
      refreshToken: "mock-guest-refresh-token",
      isGuest: true,
    },
  };
}

export async function mockSignInWithPassword(): Promise<
  ApiResponse<SessionAuthResult>
> {
  await delay(FAKE_DELAY_MS);
  return {
    statusCode: 200,
    message: "Success",
    result: {
      nextStep: "",
      authToken: "mock-auth-token",
      refreshToken: "mock-refresh-token",
      isGuest: false,
    },
  };
}

export async function mockSignUpWithPassword(): Promise<string> {
  await delay(FAKE_DELAY_MS);
  return "mock-temporary-token";
}

export async function mockVerifySignUpOtp(): Promise<
  ApiResponse<VerifySignUpResult>
> {
  await delay(FAKE_DELAY_MS);
  return {
    statusCode: 200,
    message: "Success",
    result: {
      authToken: "mock-auth-token",
      refreshToken: "mock-refresh-token",
    },
  };
}

export async function mockResendSignUpOtp(): Promise<ApiResponse<boolean>> {
  await delay(FAKE_DELAY_MS);
  return {
    statusCode: 200,
    message: "OTP resent",
    result: true,
  };
}
