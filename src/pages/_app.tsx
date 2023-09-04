import { GlobalStyle } from "@/styles/globals";
import type { AppProps } from "next/app";

import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/config";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => supabase);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer theme="dark" position="top-left" />
    </SessionContextProvider>
  );
}
