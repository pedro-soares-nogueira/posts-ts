import React from "react";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="flex items-center justify-center bg-zinc-800 py-3 gap-3 border-b border-gray-700">
      <img src={logo} alt="Logotipo" className="w-14 bg-zinc-800" />
      <h1 className="font-bold text-2xl bg-zinc-800">Pedro | BlogFeed</h1>
    </div>
  );
};

export default Header;
