import { useState } from 'react';
import './Header.css';
import { Outlet, NavLink } from 'react-router-dom';
function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo-container">
            <img src="/svg/logo.svg" alt="Logo" />
          </div>
          <nav>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>
              Главная
            </NavLink>
            <NavLink to="/Cart" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>
              Kорзина
            </NavLink>
            <NavLink to="/Search" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>
              Поиск
            </NavLink>
            <NavLink to="/Katalog" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>
              Kаталог
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
