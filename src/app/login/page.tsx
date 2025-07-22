"use client";

import React from "react";

function page() {
  const handleLoginSubmit = () => {};
  return (
    <div className="h-screen bg-amber-600 flex justify-center items-center">
      <div className="w-96 h-96 bg-gray-600 rounded-2xl">
        <form
          onSubmit={handleLoginSubmit}
          className="flex justify-center items-center flex-col"
        >
          <h1 className="text-3xl">Welcome Back</h1>
          <div className="flex flex-col justify-center items-start">
            <label>Username</label>
            <input type="text" name="" id="" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
