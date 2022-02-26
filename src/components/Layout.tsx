import React from 'react';

const Layout: React.FC = ({ children }) => {
  return <div className="flex flex-col w-11/12 h-screen mx-auto lg:w-7/12">{children}</div>;
};

export default Layout;
