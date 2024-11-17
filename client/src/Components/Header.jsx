import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./Countries";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [theme, setTheme] = useState("light-theme");
  
  let category = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle dropdown for category
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowCountryDropdown(false); // Close country dropdown if open
  };

  // Toggle dropdown for country
  const toggleCountryDropdown = () => {
    setShowCountryDropdown(!showCountryDropdown);
    setShowCategoryDropdown(false); // Close category dropdown if open
  };

  // Close dropdown when an item is clicked
  const closeCategoryDropdown = () => {
    setShowCategoryDropdown(false);
  };

  const closeCountryDropdown = () => {
    setShowCountryDropdown(false);
  };

  // Toggle theme (dark/light)
  function toggleTheme() {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-between p-4">
        <h3 className="Info relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">INFO ACQUIRER</h3>

        {/* Main nav items */}
        <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 justify-end ${active ? "active" : ""}`}>
          <li><Link className="allNews no-underline font-semibold" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
          
          {/* Category Dropdown */}
          <li className="dropdown-li">
            <Link className="topHeadlines no-underline font-semibold flex items-center gap-2" 
              onClick={toggleCategoryDropdown}>
              Top-Headlines
            </Link>
            <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {category.map((element, index) => {
                return (
                  <li key={index} onClick={closeCategoryDropdown}>
                    <Link to={"/top-headlines/" + element} className="flex gap-3 capitalize" 
                      onClick={() => { setActive(!active); }}>
                      {element}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          
          {/* Country Dropdown */}
          <li className="dropdown-li">
            <Link className="Country no-underline font-semibold flex items-center gap-2" 
              onClick={toggleCountryDropdown}>
              Country
            </Link>
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => {
                return (
                  <li key={index} onClick={closeCountryDropdown}>
                    <Link to={"/country/" + element?.iso_2_alpha} className="flex gap-3" 
                      onClick={() => { setActive(!active); }}>
                      <img
                          src={element?.png}
                          alt={element?.countryName}
                      />
                      <span>{element?.countryName}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Theme Toggle */}
          <li>
            <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
              <input type="checkbox" className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
