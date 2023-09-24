import { GlobalStyle } from "@/styles/globals";

import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

import { Raleway } from "next/font/google";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { ModalProvider } from "styled-react-modal";

import { FadingBackground } from "@/components";
import { supabase } from "@/config";
import { store } from "@/store/store";
import { theme } from "@/styles";

const raleway = Raleway({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => supabase);

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <style jsx global>{`
          :root {
            --raleway: ${raleway.style.fontFamily};
          }
        `}</style>
        <ThemeProvider theme={theme}>
          <ModalProvider backgroundComponent={FadingBackground}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ModalProvider>
        </ThemeProvider>

        <ToastContainer theme="dark" position="top-left" />
      </SessionContextProvider>
    </Provider>
  );
}
