import React, { useEffect, useState } from "react";
import { Icon } from "../../public/Icons";
import { NavLink, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export const Navbar = () => {
  const location = useLocation().pathname;
  const { logOut } = UserAuth();
  const [isSticky, setIsSticky] = useState(false);

  const handleLogOut = () => {
    logOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {location === "/account" ? null : (
        <div
          className={`absolute left-0 py-2 flex justify-center w-full z-[100] ${
            isSticky ? "sticky top-0 bg-black z-[200]" : ""
          }`}
        >
          <div className="w-10/12 flex items-center justify-between">
            <div className="flex items-center">
              <button className="mr-8">
                <Icon name="netflix" />
              </button>
              {location === "/home" ? (
                <nav className="text-white hidden sm:hidden md:hidden lg:flex xl:flex gap-3">
                  <NavLink className="text-link text-xs font-semibold">
                    Ana Sayfa
                  </NavLink>
                  <NavLink className="text-link text-xs font-semibold">
                    Diziler
                  </NavLink>
                  <NavLink className="text-link text-xs font-semibold">
                    Filmler
                  </NavLink>
                  <NavLink className="text-link text-xs font-semibold">
                    Yeni ve Popüler
                  </NavLink>
                  <NavLink className="text-link text-xs font-semibold">
                    Listem
                  </NavLink>
                  <NavLink className="text-link text-xs font-semibold">
                    Dile Göre Göz At
                  </NavLink>
                </nav>
              ) : null}
            </div>
            {location === "/home" ? (
              <div>
                <NavLink to="/account" className="text-white">
                  Account
                </NavLink>
                <NavLink
                  to="/"
                  className="text-white bg-red-600 rounded py-2 px-5 ml-4"
                  onClick={() => handleLogOut()}
                >
                  Logout
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink to="/" className="text-white">
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-white bg-red-600 rounded py-2 px-5 ml-4"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
