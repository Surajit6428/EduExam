"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.role) {
      alert("Please select account type");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            role: form.role,
            firstName: form.firstName,
            middleName: form.middleName,
            lastName: form.lastName,
            email: form.email,
            mobile: form.mobile,
            gender: form.gender,
            dob: form.dob,
            address: form.address,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(
        `Registration Successful\nID: ${data.uniqueId}`
      );

      setForm({
        role: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobile: "",
        gender: "",
        dob: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border p-8 shadow-sm">
          <h1 className="mb-2 text-center text-4xl font-bold">
            Create Account
          </h1>

          <p className="mb-8 text-center text-muted-foreground">
            Register as Student, Teacher or Parent
          </p>

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="mb-2 block font-medium">
                Account Type
              </label>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border p-3"
              >
                <option value="">
                  --Select--
                </option>

                <option value="STUDENT">
                  Student
                </option>

                <option value="TEACHER">
                  Teacher
                </option>

                <option value="PARENT">
                  Parent
                </option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="First Name"
              />

              <input
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Middle Name"
              />

              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Last Name"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Email"
              />

              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Mobile Number"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="rounded-lg border p-3"
              >
                <option value="">
                  --Select--
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />
            </div>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              placeholder="Address"
              rows={4}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Password"
              />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="rounded-lg border p-3"
                placeholder="Confirm Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-black p-3 text-white"
            >
              {loading
                ? "Creating..."
                : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Developed By SB Designer
          </div>
        </div>
      </div>
    </main>
  );
}