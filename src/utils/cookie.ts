export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  console.log({ cookies: document.cookie });
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

export const setCookie = (
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
  } = {}
) => {
  const {
    maxAge = 60 * 60 * 24 * 7,
    path = "/",
    secure = true,
    sameSite = "Strict",
  } = options;

  document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; ${secure ? "Secure;" : ""} SameSite=${sameSite}`;
};

export const removeCookie = (name: string, path = "/") => {
  document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
