import { GlobalStyle } from "@/styles/globals";
import type { AppProps } from "next/app";

import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/config";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import { Raleway } from "next/font/google";
import { ModalProvider } from "styled-react-modal";
import { FadingBackground } from "@/components";

// If loading a variable font, you don't need to specify the font weight
const raleway = Raleway({ subsets: ["latin"] });

const theme = {
  colors: {
    primary: "#107ee5",
    secondary: "#20242b",
  },
};

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
        <ModalProvider backgroundComponent={FadingBackground}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ModalProvider>
        <ToastContainer theme="dark" position="top-left" />
      </SessionContextProvider>
    </Provider>
  );
}
