import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Header({ darkMode, setDarkMode, isLoggedIn, onLoginClick, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100"
          >
            DSA Code Vault
          </NavLink>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            <NavItem to="/" label="Home" />
            <NavItem to="/programs" label="Programs" />
            <NavItem to="/about" label="About" />
            <NavItem to="/contact" label="Contact" />

            {!isLoggedIn ? (
              <button
                onClick={onLoginClick}
                className="text-xl px-2 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                title="Admin Login"
              >
                ⚙️
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Theme"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </nav>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4 pb-2">
            <NavItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
            <NavItem
              to="/programs"
              label="Programs"
              onClick={() => setMenuOpen(false)}
            />
            <NavItem
              to="/about"
              label="About"
              onClick={() => setMenuOpen(false)}
            />
            <NavItem
              to="/contact"
              label="Contact"
              onClick={() => setMenuOpen(false)}
            />

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLoginClick();
                }}
                className="text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                ⚙️ Admin
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `font-medium transition ${
          isActive
            ? "text-blue-500"
            : "text-gray-700 dark:text-gray-300"
        } hover:text-blue-500`
      }
    >
      {label}
    </NavLink>
  );
}

export default Header;
