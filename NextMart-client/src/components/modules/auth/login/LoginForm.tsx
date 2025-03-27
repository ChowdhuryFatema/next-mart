/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRecaptcha = async (value: string | null) => {
    console.log(value);
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }

      console.log("res", res);
    } catch (error: any) {
      throw Error(error);
    }
  };

  return (
    <div className="w-[500px]">
      <div className="border p-8 rounded-2xl shadow-xl">
        <div className="mb-5 space-y-3">
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-gray-600">Join US today adn start you journey</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <label>Email</label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <Input {...field} value={field.value || ""} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <label>Password</label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <Input {...field} value={field.value || ""} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECHAPCHA_CLIENT_KEY!}
              onChange={handleRecaptcha}
            />
            ,
            <Button
              disabled={reCaptchaStatus ? false : true}
              type="submit"
              className="w-full my-5 bg-purple-500 hover:bg-purple-600 cursor-pointer"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center">
              Do not have an account?{" "}
              <Link href="/register">
                <span className="text-purple-500 font-semibold">Register</span>
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
