"use client";

import { useState } from "react";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e?: React.FormEvent
  ) => {
    if (e) {
      e.preventDefault();
    }

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

      alert(`Welcome ${data.name}`);

      switch (data.role) {
        case "ADMIN":
          window.location.href =
            "/admin/dashboard";
          break;

        case "TEACHER":
          window.location.href =
            "/teacher/dashboard";
          break;

        case "STUDENT":
          window.location.href =
            "/student/dashboard";
          break;

        case "PARENT":
          window.location.href =
            "/parent/dashboard";
          break;
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-6 shadow">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="text"
            value={login}
            onChange={(e) =>
              setLogin(e.target.value)
            }
            className="w-full rounded border p-3"
            placeholder="Email or Mobile"
            autoFocus
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded border p-3"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-black p-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Please Wait..."
              : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Developed By SB Designer
        </p>

      </div>
    </div>
  );
}