import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white dark:bg-gray-800 shadow-md p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MERN Dev</h1>
        <ul className="flex space-x-6">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-blue-500">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
