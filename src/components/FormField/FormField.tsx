import React, { ReactNode } from "react";

import { Container } from "./styles";

export type FormFieldProps = {
  errorMessage?: string;
  label: string;
  children: ReactNode;
};

export const FormField = ({
  errorMessage = "",
  label,
  children,
}: FormFieldProps) => (
  <Container>
    <label>{label}</label>
    {children}
    {errorMessage && <p className="error">{errorMessage}</p>}
  </Container>
);
