const auth = {
  isAuthenticated: () => {
    return typeof window !== "undefined"
      ? window.sessionStorage.getItem(
          process.env.NEXT_PUBLIC_SECRET_JWT ?? ""
        ) !== null
      : false;
  },
  login: (token: string) => {
    typeof window !== "undefined"
      ? window.sessionStorage.setItem(
          process.env.NEXT_PUBLIC_SECRET_JWT ?? "",
          token
        )
      : null;
  },
  logout: () => {
    return typeof window !== "undefined"
      ? window.sessionStorage.removeItem(
          process.env.NEXT_PUBLIC_SECRET_JWT ?? ""
        )
      : null;
  },
  getToken: () => {
    return typeof window !== "undefined"
      ? window.sessionStorage.getItem(process.env.NEXT_PUBLIC_SECRET_JWT ?? "")
      : null;
  },
};

export default auth;
