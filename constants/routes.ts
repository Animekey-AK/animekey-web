export const routes = {
  home: "/",
  movies: "/movies",
  series: "/series",
  watch: (id: string) => `/watch/${id}`,
  account: "/account",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  selectProfile: "/select-profile",
  plans: "/plans",
} as const;
