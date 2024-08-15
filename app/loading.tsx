import React from "react";

const GlobalLoadingScreen = () => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="flex justify-center space-x-5 rounded-full p-5 duration-75">
        <div className="h-8 w-8 animate-bounce rounded-full bg-[#7148fc] delay-100"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-[#05C3DE] delay-300"></div>
        <div className="h-8 w-8 animate-bounce rounded-full bg-[#94a3b8] delay-500"></div>
      </div>
    </main>
  );
};

export default GlobalLoadingScreen;
