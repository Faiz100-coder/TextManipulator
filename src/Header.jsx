
import React from "react";
import Navbar from "./Nav";

const Header = () => {
  return (
    <div>
      <div className='header'>
        <span className='title'></span>
      </div>
      <Navbar />

     <h1><center> Welcome to Text Manipulator </center> </h1>
    </div>
  );
};

export default Header;