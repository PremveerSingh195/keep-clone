"use client";

import React, { useState } from "react";

function Sighup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {};
  return (
    <div className="bg-white w-96 h-[500px] rounded-4xl flex justify-center items-center flex-col gap-3">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="flex justify-center text-3xl font-semibold flex-col gap-2">
          Create your account
        </h1>
        <button className="bg-yellow-300 p-1 px-2 rounded-2xl font-semibold cursor-pointer">
          Login with google
        </button>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border rounded-xl px-2 py-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            className="border rounded-xl px-2 py-1"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            className="border rounded-xl px-2 py-1"
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-amber-950 w-full text-white p-1 rounded-2xl cursor-pointer"
        >
          Sign Up
        </button>
      </form>
      <p>Already have an account? <span className="font-semibold text-blue-900 cursor-pointer">Log In</span></p>
    </div>
  );
}

export default Sighup;
