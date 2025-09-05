"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


function Sighup() {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    if (!signupData.email || !signupData.password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Signup Successfull")
      } else {
        setMessage(data.error || "Signup failed")
      }
    } catch (error) {
      setMessage("Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="bg-white w-96 h-[500px] rounded-4xl flex justify-center items-center flex-col gap-3">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="flex justify-center text-3xl font-semibold flex-col gap-2">
          Create your account
        </h1>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleInputChange}
            className="border rounded-xl px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            className="border rounded-xl px-2 py-1"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            className="border rounded-xl px-2 py-1"
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70 cursor-pointer"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>

        {
          message && <p className="text-center text-red-600 font-semibold">{message}</p>
        }
      </form>
      <p>
        Already have an account?{" "}
        <span
          className="font-semibold text-blue-900 cursor-pointer"
          onClick={() => router.push('/login')}
        >
          Log In
        </span>
      </p>
    </div>
  );
}

export default Sighup;