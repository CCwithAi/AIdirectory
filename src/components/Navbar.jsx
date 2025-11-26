import React from 'react';

const Navbar = ({ setCurrentPage, navItems, appName }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg sticky-navbar">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-2 sm:mb-0">
          {appName.split(' ').map((word, index) => (
            <span key={index} className="block sm:inline">{word} </span>
          ))}
        </div>
        <ul className="flex space-x-2 sm:space-x-4">
          {navItems.map((item) => (
            <li key={item.page}>
              <button
                onClick={() => setCurrentPage(item.page)}
                className="hover:bg-white hover:text-purple-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 