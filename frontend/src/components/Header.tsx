import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-neutral-100 p-6 shadow-md text-center">
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-800 drop-shadow-sm tracking-wide ">
        {title}
      </h1>
    </header>
  );
};

export default Header;
