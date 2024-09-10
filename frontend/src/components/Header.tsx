import React from 'react';
import LogIn from './LogIn';

interface HeaderProps {
  handleLoginSuccess: (buckets: string[]) => void; // Accept a callback to handle successful login
}

const Header: React.FC<HeaderProps> = ({ handleLoginSuccess }) => {
  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <img src="/src/assets/atsys-logo.png" alt="ATSYS" className="h-13" />
        </div>

        {/* LogIn Component */}
        <div>
          {/* Passing the handleLoginSuccess function from the parent to LogIn */}
          <LogIn handleLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </header>
  );
};

export default Header;
