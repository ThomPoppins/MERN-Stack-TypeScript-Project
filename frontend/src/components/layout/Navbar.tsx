// Navbar.tsx

import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-purple-800 text-2xl font-bold">Vind Expert</div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-purple-800">
              Home
            </a>
            <a href="#" className="text-purple-800">
              About
            </a>
            <a href="#" className="text-purple-800">
              Services
            </a>
            <a href="#" className="text-purple-800">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
