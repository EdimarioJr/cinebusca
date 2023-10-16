import React, { ReactNode } from "react";

import { Footer, Header } from "@/components";
import { ContainerPages } from "@/styles/globals";
import Head from "next/head";

export type MainLayoutProps = {
  page?: "review" | "watchlist" | "feed";
  children: ReactNode;
};

export const MainLayout = ({ page, children }: MainLayoutProps) => (
  <section
    style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
  >
    <Head>
      <title>Cinebusca</title>
      <meta name="description" content="Cinebusca movies" />
    </Head>
    <Header page={page} />
    <ContainerPages style={{ flex: 1, marginTop: "1.5rem" }}>
      {children}
    </ContainerPages>
    <Footer />
  </section>
);
