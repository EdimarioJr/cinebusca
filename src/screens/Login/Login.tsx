import React, { useState } from "react";
import { LoginContainer } from "./styles";

import { ContainerPages, CommonButton } from "@/styles/globals";

import { authService } from "@/services";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Header, Footer } from "@/components";
import { toast } from "react-toastify";

// login Animation
const loginVariants = {
  initial: { opacity: 0, x: -200 },
  final: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (signUp) {
      try {
        const { error } = await authService.signUp({ email, password });

        if (error) throw new Error(String(error));
        toast.success("Successful sign up!");
        router.push("/");
      } catch (err) {
        console.log("err", err);
        toast.error("Error on signup! Please try again later");
      }
    } else {
      try {
        const { error } = await authService.login({ email, password });

        if (error) throw new Error(String(error));
        toast.success("Successful login!");
        router.push("/");
      } catch (err) {
        console.log("err");
        toast.error("Error on login! Please try again later");
      }
    }
  }

  return (
    <>
      <Header />
      <ContainerPages style={{ minHeight: "calc(100vh - 278px)" }}>
        <motion.div variants={loginVariants} initial="initial" animate="final">
          <LoginContainer>
            <div className="card">
              <h1>{signUp ? "Sign up" : "Sign in"}</h1>
              <form>
                <div>
                  <p>E-mail:</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </div>
                <div>
                  <p>Password:</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                  />
                </div>
              </form>
              <CommonButton className="signButton" onClick={handleSubmit}>
                {signUp ? "Sign up" : "Sign in"}
              </CommonButton>
              <p>
                {signUp ? "Already have an account?" : "Don't have an account?"}
                <span
                  onClick={() => {
                    signUp ? setSignUp(false) : setSignUp(true);
                  }}
                >
                  {signUp ? "Sign in" : "Sign up"}
                </span>
              </p>
            </div>
          </LoginContainer>
        </motion.div>
      </ContainerPages>
      <Footer />
    </>
  );
};
