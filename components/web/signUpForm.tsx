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
import { signUpSchema } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

import z from "zod";
import { authClient } from "@/lib/auth-client";
import LoginForm from "./loginForm";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export function SignUpForm({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) {
  const [activeButton, setActiveButton] = useState("login");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Anda Berhasil mendaftar, silahkan masuk.");
            setActiveButton("login");
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
      {activeButton === "login" ? (
        <LoginForm
          setIsModalOpen={setIsModalOpen}
          setActiveButton={setActiveButton}
        />
      ) : (
        <>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-2xl">REGISTER</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FieldGroup>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel>Nama Lengkap :</FieldLabel>
                        <Input
                          aria-invalid={fieldState.invalid}
                          placeholder="Example: John Doe"
                          {...field}
                        />

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
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

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <div className="flex items-center gap-1">
                      <Spinner /> Loading...
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="w-full flex items-center justify-end">
              <p className=" text-xs">Already have an account ?</p>
              <Button
                onClick={() => setActiveButton("login")}
                variant="ghost"
                className="underline"
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </>
  );
}
