import React, { useState } from "react";
import HamburgerIcon from "../../Assets/Svg/hamburger-icon.svg";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import UserOptions from "../User/UserOptions/UserOptions";

const Header = () => {
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState();
  const mobileMenuStyle = isMenuOpen ? "" : "-translate-x-full";
  const handleMobileMenuClick = () => setIsMenuOpen(!isMenuOpen);

  const setActiveLink = (path) => {
    return location?.pathname === path
      ? "text-[#eb4034] hover:text-[#eb4034] font-bold"
      : "text-[#544E5D] hover:opacity-50";
  };

  return (
    <>
      <MobileMenu
        isMenuOpen={isMenuOpen}
        className={`${mobileMenuStyle}`}
        handleMobileMenuClick={handleMobileMenuClick}
      />
      <header className="header py-7 w-full left-0 top-0 z-20 bg-colorWhite sticky ">
        <div className="container flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button
              type="button"
              className="hamburger-container w-5 h-5 relative lg:hidden"
              onClick={handleMobileMenuClick}
            >
              <img src={HamburgerIcon} alt="Hamburger Logo" layout="fill" />
            </button>
            <Link to="/">
              <h2 className="text-2xl font-normal uppercase cursor-pointer text-[#eb4034]">
                <span className="text-4xl">E</span>commerce
              </h2>
            </Link>
          </div>

          <nav>
            <div className="flex items-center gap-5 xl:gap-12">
              <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
                <li className={`${setActiveLink("/")} text-md xl:text-base`}>
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={`${setActiveLink(
                    "/products"
                  )} text-md xl:text-base`}
                >
                  <Link to="/products">Products</Link>
                </li>
                <li
                  className={`${setActiveLink(
                    "/contact"
                  )} text-md xl:text-base`}
                >
                  <Link to="/contact">Contact</Link>
                </li>

                <li
                  className={`${setActiveLink("/about")} text-md xl:text-base`}
                >
                  <Link to="/about">About</Link>
                </li>
              </ul>

              <ul className="flex items-center gap-3">
                <li className={`${setActiveLink("/cart")} `}>
                  <Link to="/cart">
                    <IconButton
                      size="large"
                      aria-label="show 4 new mails"
                      color="inherit"
                    >
                      <Badge badgeContent={cartItems.length} color="primary">
                        <ShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Link>
                </li>
                <li>
                  {isAuthenticated ? (
                    <UserOptions user={user} />
                  ) : (
                    <Link to="/login" className="hidden sm:flex">
                      <button className="bg-[#eb4034] text-colorPale hover:bg-[#eb4034] rounded-2xl py-3 px-8 font-semibold hover:scale-95 transition-all duration-300 text-sm md:text-base">
                        Sign In
                      </button>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
