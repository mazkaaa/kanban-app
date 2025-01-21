"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input } from "../reusables";

export const LoginForm = () => {
  const router = useRouter();
  const [payload, setPayload] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: false,
    password: false,
  });

  const handleLogin = useCallback(() => {
    if (!payload.username) {
      setError({
        ...error,
        username: true,
      });
    }
    if (!payload.password) {
      setError({
        ...error,
        password: true,
      });
    }
    if (payload.username && payload.username) {
      localStorage.setItem(
        "authData",
        JSON.stringify({
          username: payload.username,
          password: payload.password,
        }),
      );
      setError({
        username: false,
        password: false,
      });
      router.push("/dashboard");
      toast.success("Successfully logged in");
    }
  }, [error, payload.password, payload.username, router]);

  useEffect(() => {
    if (localStorage.getItem("authData")) {
      router.push("/dashboard");
      toast.success("You are already logged in");
    }
  }, [router]);

  return (
    <div className="w-full space-y-6 rounded-lg border border-zinc-600 p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Welcome to Kanban App</h1>
        <p className="text-lg text-zinc-400">
          Login to get started with your tasks
        </p>
      </div>
      <form
        onSubmit={(e) => {
          // Add your login logic here
          e.preventDefault();
          handleLogin();
        }}
        className="space-y-6"
      >
        <section className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Username</label>
            <Input
              value={payload.username}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  username: e.target.value,
                });
              }}
              type="text"
              placeholder="Enter your username..."
              isError={error.username}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="font-medium">Password</label>
            <Input
              value={payload.password}
              onChange={(e) => {
                setPayload({
                  ...payload,
                  password: e.target.value,
                });
              }}
              type="password"
              placeholder="Enter your password..."
              isError={error.password}
            />
          </div>
        </section>
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};
