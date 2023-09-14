import React, { SetStateAction, useState, Dispatch } from "react";

import { CommonButton, Input } from "@/styles/globals";

import { authService } from "@/services";

import { useRouter } from "next/router";

import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormField, Spinner } from "@/components";
import { AuthContainer } from "../../styles";
import { motion } from "framer-motion";

const loginVariants = {
  initial: { opacity: 0, x: -200 },
  final: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .transform((name) => name.trim()),
    email: z.string().email("Must be an email!"),
    password: z
      .string()
      .min(6, "Min 6 characters for password")
      .max(50, "Max 50 characters for password!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export type RegisterProps = {
  setIsSigningUp: Dispatch<SetStateAction<boolean>>;
};

export const Register = ({ setIsSigningUp }: RegisterProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const router = useRouter();

  async function handleRegister(values: RegisterFormSchema) {
    try {
      setIsLoading(true);
      const { name, email, password } = values;
      const { error } = await authService.signUp({ name, email, password });
      if (error) throw new Error(String(error));
      toast.success("Successful sign up!");
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      setIsLoading(false);
      toast.error("Error on signup! Please try again later");
    }
  }

  return (
    <motion.div variants={loginVariants} initial="initial" animate="final">
      <AuthContainer>
        <div className="card">
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(handleRegister)}>
            <FormField label="Name" errorMessage={errors.name?.message}>
              <Input type="text" placeholder="Jane doe" {...register("name")} />
            </FormField>
            <FormField label="E-mail" errorMessage={errors.email?.message}>
              <Input
                type="email"
                placeholder="example@email.com"
                {...register("email")}
              />
            </FormField>
            <FormField label="Password" errorMessage={errors.password?.message}>
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
            </FormField>
            <FormField
              label="Confirm Password"
              errorMessage={errors.confirmPassword?.message}
            >
              <Input
                type="password"
                placeholder="Password"
                {...register("confirmPassword")}
              />
            </FormField>

            <CommonButton
              className="signButton"
              type="submit"
              disabled={isLoading || !isValid}
            >
              {isLoading ? <Spinner boxSize="1.5rem" /> : "Sign up"}
            </CommonButton>
          </form>

          <p>
            Already have an account?
            <span onClick={() => setIsSigningUp(false)} className="option">
              Sign in
            </span>
          </p>
        </div>
      </AuthContainer>
    </motion.div>
  );
};
