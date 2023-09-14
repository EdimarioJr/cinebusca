import { supabase } from "@/config";

export const authService = {
  logout: async () => {
    return supabase.auth.signOut();
  },
  getToken: () => {
    return typeof window !== "undefined"
      ? window.sessionStorage.getItem(process.env.NEXT_PUBLIC_SECRET_JWT ?? "")
      : null;
  },
  login: async ({ email, password }: { email: string; password: string }) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  },
  signUp: async ({
    name,
    email,
    password,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    await supabase.auth.signUp({
      email,
      password,
    });

    return supabase.from("profiles").insert({ name }).select("*");
  },
};
