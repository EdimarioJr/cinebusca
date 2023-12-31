import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { FormField, Spinner } from "@/components";
import { authService } from "@/services";
import { CommonButton, Input } from "@/styles/globals";

import { AuthContainer } from "../../styles";

// login Animation
const loginVariants = {
  initial: { opacity: 0, x: -200 },
  final: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const loginSchema = z.object({
  email: z.string().email("Must be an valid e-mail"),
  password: z
    .string()
    .min(6, "At least 6 characters")
    .max(50, "Maximum of 50 characters"),
});

export type LoginProps = {
  setIsSigningUp: Dispatch<SetStateAction<boolean>>;
};

export type LoginFormSchema = z.infer<typeof loginSchema>;

export const Login = ({ setIsSigningUp }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function handleLogin(values: LoginFormSchema) {
    try {
      setIsLoading(true);
      const { error } = await authService.login(values);

      if (error) throw new Error(String(error));
      toast.success("Successful login!");
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      toast.error("Error on login! Please try again later");
    }
  }

  return (
    <motion.div variants={loginVariants} initial="initial" animate="final">
      <AuthContainer>
        <div className="card">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormField label="E-mail" errorMessage={errors.email?.message}>
              <Input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
                data-test="email-input"
              />
            </FormField>

            <FormField label="Password" errorMessage={errors.password?.message}>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                data-test="password-input"
              />
            </FormField>
            <CommonButton
              className="signButton"
              type="submit"
              disabled={isLoading || !isValid}
              style={{
                display: "grid",
                placeContent: "center",
                width: "10rem",
                marginTop: "1rem",
              }}
              data-test="signin-button"
            >
              {isLoading ? <Spinner boxSize="1.5rem" /> : "Sign in"}
            </CommonButton>
          </form>

          <p>
            Dont have an account?
            <button
              onClick={() => setIsSigningUp(true)}
              className="option"
              data-test="signup-link"
            >
              Sign up
            </button>
          </p>
        </div>
      </AuthContainer>
    </motion.div>
  );
};
