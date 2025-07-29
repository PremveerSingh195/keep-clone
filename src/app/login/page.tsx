"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

    const [errorMsg , setErrorMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMsg("")

    try {
     const res =   await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed")
      }

      console.log(data , "data");
      

    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.")
    }


  };
  return (
    <div className="bg-red-500 h-screen flex justify-center items-center">
      <div className="bg-white w-96 h-[500px] rounded-4xl flex justify-center items-center flex-col gap-3">
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3">
          <h1 className="flex justify-center text-3xl font-semibold flex-col gap-2">
            Welcome Back
          </h1>
          <div className="flex flex-col">
            <label>email</label>
            <input
              value={loginData.email}
              type="email"
              name="email"
              onChange={handleChange}
              className="border rounded-xl px-2 py-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              value={loginData.password}
              type="password"
              name="password"
              onChange={handleChange}
              className="border rounded-xl px-2 py-1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-amber-950 w-full text-white p-1 rounded-2xl cursor-pointer"
          >
            login
          </button>
        </form>
        <h2>
          Don&apos;t have account ?{" "}
          <span
            className="text-blue-900 font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Sign up
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Page;
