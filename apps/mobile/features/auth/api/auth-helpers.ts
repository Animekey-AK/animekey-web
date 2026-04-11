export interface PhonePayload {
  code: string;
  number: string;
}

export type CredentialPayload =
  | {
      email: string;
      phone?: never;
    }
  | {
      email?: never;
      phone: PhonePayload;
    };

const DEFAULT_PHONE_CODE = "+966";
const MIN_PHONE_LENGTH = 8;

function parseExplicitInternationalNumber(value: string): PhonePayload | null {
  if (!value.startsWith("+")) {
    return null;
  }

  const digits = value.slice(1).replace(/\D/g, "");

  if (digits.startsWith("966")) {
    return {
      code: DEFAULT_PHONE_CODE,
      number: digits.slice(3),
    };
  }

  const match = digits.match(/^(\d{1,3})(\d{6,14})$/);
  if (!match) {
    return null;
  }

  return {
    code: `+${match[1]}`,
    number: match[2],
  };
}

function parsePhonePayload(value: string): PhonePayload {
  const normalizedValue = value.replace(/[^\d+]/g, "");
  const internationalPayload = parseExplicitInternationalNumber(normalizedValue);

  if (internationalPayload) {
    return internationalPayload;
  }

  const digits = normalizedValue.replace(/\D/g, "");
  let localNumber = digits;

  if (localNumber.startsWith("00966")) {
    localNumber = localNumber.slice(5);
  } else if (localNumber.startsWith("966")) {
    localNumber = localNumber.slice(3);
  } else if (localNumber.startsWith("0")) {
    localNumber = localNumber.slice(1);
  }

  if (localNumber.length < MIN_PHONE_LENGTH) {
    throw new Error("Enter a valid phone number.");
  }

  return {
    code: DEFAULT_PHONE_CODE,
    number: localNumber,
  };
}

export function buildCredentialPayload(value: string): CredentialPayload {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    throw new Error("Enter your email or phone number.");
  }

  const looksLikeEmail =
    trimmedValue.includes("@") || /[a-zA-Z]/.test(trimmedValue);

  if (looksLikeEmail) {
    return {
      email: trimmedValue.toLowerCase(),
    };
  }

  return {
    phone: parsePhonePayload(trimmedValue),
  };
}

export function buildDobValue(day: string, month: string, year: string) {
  return `${year}-${month}-${day}`;
}
