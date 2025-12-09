"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { loginSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { startTransition, useState, useTransition } from "react";
import { Spinner } from "../ui/spinner";

const LoginForm = ({
  setActiveButton,
  setIsModalOpen,
}: {
  setActiveButton: (button: "login" | "register") => void;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(data: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Anda berhasil masuk.");
            setIsModalOpen(false);
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl">LOGIN</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Email :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="johny@example.com"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password :</FieldLabel>
                    <Input
                      aria-invalid={fieldState.invalid}
                      placeholder="*******"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-1">
                  <Spinner /> Loading...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-end">
          <p className=" text-xs">Don't have an account ?</p>
          <Button
            onClick={() => setActiveButton("register")}
            variant="ghost"
            className="underline"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginForm;
