import React, { useState } from "react";

import { MainLayout } from "@/layouts";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

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
