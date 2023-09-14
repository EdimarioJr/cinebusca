import { Footer, Header } from "@/components";
import { ContainerPages } from "@/styles/globals";
import React, { ReactNode } from "react";

export type MainLayoutProps = {
  page?: "review" | "watchlist";
  children: ReactNode;
};

export const MainLayout = ({ page, children }: MainLayoutProps) => {
  return (
    <section
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header page={page} />
      <ContainerPages style={{ flex: 1, marginTop: "1.5rem" }}>
        {children}
      </ContainerPages>
      <Footer />
    </section>
  );
};
