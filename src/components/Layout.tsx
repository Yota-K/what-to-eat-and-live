import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <main>
      <div className="pt-10 flex flex-col w-11/12 h-screen mx-auto lg:w-7/12">{children}</div>
    </main>
  );
};

export default Layout;
