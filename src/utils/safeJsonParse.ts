export const safeJsonParse = <T>(input: string | object): T | null => {
  // If the input is already an object, return it directly
  if (typeof input === "object" && input !== null) {
    return input as T;
  }

  // If it's a string, check if it's valid JSON
  if (typeof input === "string" && isJsonString(input)) {
    try {
      return JSON.parse(input);
    } catch (e) {
      console.error("Invalid JSON string:", e);
      return null;
    }
  }

  // If it's not a valid JSON string or object, return null
  return null;
};

// Helper function to check if a string is valid JSON
export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
