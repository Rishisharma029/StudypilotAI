export const DEMO_SESSION_KEY = "studypilot-demo";

export function enableDemoSession() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DEMO_SESSION_KEY, "true");
  }
}

export function hasDemoSession() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(DEMO_SESSION_KEY) === "true";
  }
  return false;
}
