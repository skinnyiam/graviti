import React from "react";
import Logo from "../assests/gravitilogo.png";

const Navbar = () => {
  return (
    <div className="bg-white pb-2 pt-2">
      <img className="w-auto h-auto ml-12" src={Logo} alt="" />
    </div>
  );
};

export default Navbar;
