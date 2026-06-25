"use client";

import { useState } from "react";

export default function LoginPage() {
  const [login, setLogin] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            login,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(
        `Welcome ${data.name}`
      );

      if (
        data.role === "ADMIN"
      ) {
        window.location.href =
          "/admin/dashboard";
      }

      if (
        data.role === "TEACHER"
      ) {
        window.location.href =
          "/teacher/dashboard";
      }

      if (
        data.role === "STUDENT"
      ) {
        window.location.href =
          "/student/dashboard";
      }

      if (
        data.role === "PARENT"
      ) {
        window.location.href =
          "/parent/dashboard";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <input
          value={login}
          onChange={(e) =>
            setLogin(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
          placeholder="Email or Mobile"
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="mb-4 w-full rounded border p-3"
          placeholder="Password"
        />

        <button
          onClick={
            handleLogin
          }
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading
            ? "Please Wait..."
            : "Login"}
        </button>

        <p className="mt-4 text-center text-sm">
          Developed By SB Designer
        </p>
      </div>
    </div>
  );
}