const DEFAULT_LOCALE = "en";

function withLocale(path: string) {
  if (path === "/") {
    return `/${DEFAULT_LOCALE}`;
  }

  return `/${DEFAULT_LOCALE}${path}`;
}

export const routes = {
  home: withLocale("/"),
  movies: withLocale("/movies"),
  series: withLocale("/series"),
  watch: (id: string) => withLocale(`/watch/${id}`),
  account: withLocale("/account"),
  login: withLocale("/login"),
  register: withLocale("/register"),
  forgotPassword: withLocale("/forgot-password"),
  resetPassword: withLocale("/reset-password"),
  selectProfile: withLocale("/select-profile"),
  plans: withLocale("/plans"),
} as const;
