import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Main: React.FC<MainLayoutProps> = ({ children }) => {
  return <main className="flex-grow p-6 bg-neutral-100">{children}</main>;
};
export default Main;
