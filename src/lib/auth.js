import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

function sign(value) {
  const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(token) {
  if (!token || !token.includes(".")) return false;
  const [value, hmac] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function createSessionToken() {
  const payload = `admin:${Date.now() + SESSION_MAX_AGE * 1000}`;
  return sign(payload);
}

export function isSessionValid(token) {
  if (!token) return false;
  if (!verify(token)) return false;
  const [value] = token.split(".");
  const [, expiryStr] = value.split(":");
  const expiry = parseInt(expiryStr, 10);
  return Date.now() < expiry;
}

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE;
