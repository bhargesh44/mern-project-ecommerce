import React from "react";
import { Link, useLocation } from "react-router-dom";
import closeIcon from "../../Assets/Svg/close-icon.svg";
import { useSelector } from "react-redux";

const MobileMenu = ({ className, handleMobileMenuClick, isMenuOpen }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();
  const setActiveLink = (path) => {
    return location?.pathname === path
      ? "text-[#eb4034]  font-bold"
      : "text-[#544E5D]";
  };

  return (
    <>
      {isMenuOpen && (
        <div
          onClick={handleMobileMenuClick}
          className="fixed w-screen h-screen left-0 top-0 z-40 bg-colorPrimary opacity-20 lg:hidden"
        ></div>
      )}
      <div
        className={`lg:hidden p-4 pt-10 w-10/12 fixed z-50 left-0 top-0 h-screen transition-transform duration-300 bg-colorWhite  border-l ${className}`}
      >
        <div className="relative w-6 h-6 mb-28 ml-auto">
          <button type="button" className="" onClick={handleMobileMenuClick}>
            <img src={closeIcon} alt="Close Icon" />
          </button>
        </div>
        <nav className="">
          <ul className="flex flex-col items-center gap-6 text-xl">
            <li
              className={`${setActiveLink("/")}`}
              onClick={handleMobileMenuClick}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={`${setActiveLink("/products")}`}
              onClick={handleMobileMenuClick}
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              className={`${setActiveLink("/contact")}`}
              onClick={handleMobileMenuClick}
            >
              <Link to="/contact">Contact</Link>
            </li>

            <li
              className={`${setActiveLink("/about")}`}
              onClick={handleMobileMenuClick}
            >
              <Link to="/about">About</Link>
            </li>

            {!isAuthenticated && (
              <li onClick={handleMobileMenuClick}>
                <Link to="/login">
                  <button className="bg-[#eb4034] text-colorPale hover:bg-[#eb4034] rounded-2xl py-4 px-8 font-semibold hover:scale-95 transition-all duration-300 text-sm md:text-base">
                    Sign In
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
