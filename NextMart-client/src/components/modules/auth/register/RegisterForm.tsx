"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  console.log(password, confirmPassword);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
            <label>Name</label>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <Input {...field} value={field.value || ""} />
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <label>Confirm Password</label>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <Input {...field} value={field.value || ""} />
                  {confirmPassword && password !== confirmPassword ? (
                    <FormMessage>Password Dose not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button
              disabled={confirmPassword && password !== confirmPassword}
              type="submit"
              className="w-full my-5 bg-purple-500 hover:bg-purple-600 cursor-pointer"
            >
              Register
            </Button>
            <p className="text-center">
              Already have an account?{" "}
              <span className="text-purple-500 font-semibold">Login</span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
