export interface AuthSessionState {
  authToken: string;
  refreshToken: string;
  isGuest: boolean;
  nextStep?: string;
}

export interface PendingSignupVerification {
  temporaryToken: string;
  destination: string;
}

let activeSession: AuthSessionState | null = null;
let pendingSignupVerification: PendingSignupVerification | null = null;

export const authSession = {
  getSession(): AuthSessionState | null {
    return activeSession;
  },
  setSession(session: AuthSessionState) {
    activeSession = session;
  },
  clearSession() {
    activeSession = null;
  },
  getPendingSignup(): PendingSignupVerification | null {
    return pendingSignupVerification;
  },
  setPendingSignup(pendingSignup: PendingSignupVerification) {
    pendingSignupVerification = pendingSignup;
  },
  clearPendingSignup() {
    pendingSignupVerification = null;
  },
};
