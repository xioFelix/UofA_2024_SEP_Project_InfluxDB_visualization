import React from 'react';
import LogIn from './LogIn';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <img src="/src/assets/atsys-logo.png" alt="ATSYS" className="h-13" />
        </div>
        <div>
          <LogIn />
        </div>
      </div>
    </header>
  );
};

export default Header;