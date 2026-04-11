import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCredentialPayload,
  buildDobValue,
} from "./auth-helpers.ts";

test("buildCredentialPayload returns an email payload for email input", () => {
  assert.deepEqual(buildCredentialPayload("  USER@AnimeKey.tv "), {
    email: "user@animekey.tv",
  });
});

test("buildCredentialPayload defaults local mobile numbers to Saudi country code", () => {
  assert.deepEqual(buildCredentialPayload("0555123456"), {
    phone: {
      code: "+966",
      number: "555123456",
    },
  });
});

test("buildCredentialPayload keeps explicit Saudi country code numbers intact", () => {
  assert.deepEqual(buildCredentialPayload("+966555123456"), {
    phone: {
      code: "+966",
      number: "555123456",
    },
  });
});

test("buildCredentialPayload rejects empty credentials", () => {
  assert.throws(
    () => buildCredentialPayload("   "),
    /Enter your email or phone number\./,
  );
});

test("buildDobValue returns an API-safe YYYY-MM-DD value", () => {
  assert.equal(buildDobValue("09", "04", "1999"), "1999-04-09");
});
