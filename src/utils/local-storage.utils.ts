export const getLocalStorage = (key: string, parse = false) => {
  const item = localStorage.getItem(key);

  if (!item) return null;

  if (parse) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Xatoli keyni olishda"${key}":`, error);
      return null;
    }
  }

  return item;
};

export const setLocalStorage = <T>(
  key: string,
  value: T,
  stringify = false
): void => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : String(value));
};

export const removeLocalStorage = (key: string): void =>
  localStorage.removeItem(key);

export const clearLocalStorage = (): void => localStorage.clear();

export function getShortName(fullname?: string): string {
  if (!fullname) return "";
  const [last, first = "", middle = ""] = fullname.trim().split(" ");
  return `${last}.${first[0] || ""}.${middle[0] || ""}`;
}
