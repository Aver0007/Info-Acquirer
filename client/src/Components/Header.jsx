import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./Countries";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light-theme");

  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowCountryDropdown(false);
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown(!showCountryDropdown);
    setShowCategoryDropdown(false);
  };

  const closeDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowCountryDropdown(false);
  };

  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  return (
    <header>
      <nav className={`fixed top-0 left-0 w-full h-auto z-10 flex items-center justify-between p-4 ${theme === "dark-theme" ? "bg-gray-900 text-white" : "bg-gray-800 text-black"}`}>
        <h3 className="Info relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">INFO ACQUIRER</h3>

        <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 justify-end ${active ? "active" : ""}`}>
          <li>
            <Link className={`allNews no-underline font-semibold ${theme === "dark-theme" ? "text-white" : "text-black"}`} 
              to="/" 
              onClick={() => { setActive(!active); closeDropdowns(); }}>
              All News
            </Link>
          </li>
          <li className="dropdown-li">
            <Link className={`topHeadlines no-underline font-semibold flex items-center gap-2 ${theme === "dark-theme" ? "text-white" : "text-black"}`}  
              onClick={toggleCategoryDropdown}>
              Top-Headlines
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => (
                <li key={index} onClick={closeDropdowns}>
                  <Link to={`/top-headlines/${element}`} className={`flex gap-3 capitalize ${theme === "dark-theme" ? "text-white" : "text-black"}`} 
                    onClick={() => setActive(!active)}>
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          
          <li className="dropdown-li">
            <Link className={`Country no-underline font-semibold flex items-center gap-2 ${theme === "dark-theme" ? "text-white" : "text-black"}`}  
              onClick={toggleCountryDropdown}>
              Country
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={closeDropdowns}>
                  <Link to={`/country/${element?.iso_2_alpha}`} className={`flex gap-3 ${theme === "dark-theme" ? "text-white" : "text-black"}`}  
                    onClick={() => setActive(!active)}>
                    <img src={element?.png} alt={element?.countryName} />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <button className="no-underline font-semibold focus:outline-none" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox hidden" id="checkbox" checked={theme === "dark-theme"} onChange={toggleTheme} />
              <label htmlFor="checkbox" className="checkbox-label cursor-pointer">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </button>
          </li>
        </ul>

        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => setActive(!active)}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
