import React, { useState } from "react";

import { MainLayout } from "@/layouts";

import { Login } from "./components/Login";
import { Register } from "./components/Register";

export const AuthScreen = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <MainLayout>
      {isSigningUp ? (
        <Register setIsSigningUp={setIsSigningUp} />
      ) : (
        <Login setIsSigningUp={setIsSigningUp} />
      )}
    </MainLayout>
  );
};
