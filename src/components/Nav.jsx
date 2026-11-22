import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import resLogo from "../assets/logo.svg";

import { useState } from "react";
export default function Nav() {
  const storageTheme = window.localStorage.getItem("newTheme");
  const storageThemeBool = storageTheme === "true" ? true : false;
  const [theme, setTheme] = useState(storageThemeBool);
  let themeValue = theme ? "dark" : "light";
  document.body.setAttribute("theme", themeValue);
  const [navOn, setNavOn] = useState(false);
  const { en, toggleLanguage } = useContext(LanguageContext);

  /* --------------------------------------------
   **               handle theme
   **---------------------------------------------*/
  function themeHandler() {
    const newTheme = !theme;
    setTheme(newTheme);
    let themeValue = newTheme ? "dark" : "light";
    window.localStorage.setItem("newTheme", newTheme);

    document.body.setAttribute("theme", themeValue);
  }

  /* --------------------------------------------
   **               handle list
   **---------------------------------------------*/
  function listHandle() {
    setNavOn(!navOn);
  }
  function linkClick() {
    setNavOn(false);
    document.body.style.overflow = "auto";
  }

  /**------------------------------------------------------------------------
   **                          Return SECTION
   *------------------------------------------------------------------------**/
  return (
    <nav
      className={`bg-[var(--surface)]  flex flex-col md:flex-row  items-center md:justify-between
     px-[20px] md:px-[100px] py-[20px] border-b-2 border-[var(--border)]  w-full h-[100dvh] md:h-max  ${!navOn ? "h-min" : "h-[100dvh]"}`}
    >
      {/*--------------------------------------------
       *                    Resturant Name
       *----------------------------------------***/}
      <div className="flex text-[var(--text)] items-center justify-between md:justify-start  gap-[30px]   w-full md:w-[20%] ">
        <img src={resLogo} alt="resturant logo" className="w-[40px]  inline " />
        <h2 className="text-[34px] font-[600]">{en ? "Balcon" : "بالكون"}</h2>
        {/***---------------------------------------------
         *                 list Button
         *---------------------------------------------*/}
        <button
          className="text-[30px] text-[var(--primary-ember)]  md:hidden "
          onClick={listHandle}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {/*--------------------------------------------
       *                    Nav Links
       *----------------------------------------***/}
      <div
        className={`my-10 md:my-0 flex flex-col items-stretch md:flex-row md:items-center md:justify-between
       gap-[10px] md:gap-[50px] w-full md:w-[30%] text-[var(--text)] text-[20px] font-[400]
       ${navOn ? "flex" : "hidden md:flex"}
       `}
      >
        {" "}
        <NavLink to="/" className={getNavLinkClass} onClick={linkClick}>
          {en ? "Home" : "الرئيسية"}
        </NavLink>
        <NavLink to="/menu" className={getNavLinkClass} onClick={linkClick}>
          {en ? "Menu" : "القائمة"}
        </NavLink>
        <NavLink to="/about" className={getNavLinkClass} onClick={linkClick}>
          {en ? "About Us" : "من نحن"}
        </NavLink>
        <NavLink to="/contact" className={getNavLinkClass} onClick={linkClick}>
          {en ? "Contact" : "اتصل بنا"}
        </NavLink>
      </div>
      <div
        className={`flex items-center justify-center gap-[50px]  ${navOn ? "flex" : "hidden md:flex"}`}
      >
        {/***---------------------------------------------
         *                 language Button
         *---------------------------------------------*/}

        <button
          className="text-[var(--text)] text-[16px] border-[2px] border-[var(--border)] rounded-[50%] p-[10px]"
          onClick={toggleLanguage}
        >
          <span className="font-semibold">{en ? "En" : "AR"}</span>{" "}
        </button>

        {/***---------------------------------------------
         *                 Cart Button
         *---------------------------------------------*/}
        <button className="text-[var(--text)] text-[16px] border-[2px] border-[var(--border)] rounded-[50%] p-[10px]">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        {/***---------------------------------------------
         *                 Theme Button
         *---------------------------------------------*/}
        <button
          type="button"
          className="border-[2px] border-[var(--border)] bg-[var(--surface-alt)] text-[16px] px-[7px] py-[5px] rounded-[9999px] w-[95px]  flex items-center"
          onClick={themeHandler}
        >
          <div
            className={
              theme
                ? "transition transform translate-x-[45px] bg-[var(--primary-ember)] rounded-[50%] p-2 text-[var(--surface)]"
                : "transition transform translate-x-0 bg-[var(--primary-ember)] rounded-[50%] p-2 text-[var(--surface)]"
            }
          >
            <FontAwesomeIcon icon={theme ? faMoon : faSun} />
          </div>
        </button>
      </div>
    </nav>
  );
}
const getNavLinkClass = ({ isActive }) =>
  `text-center py-5 md:py-0 ${
    isActive ? "text-[var(--primary-ember)] border-b-[2px] pb-5" : ""
  }`;
