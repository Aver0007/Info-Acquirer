import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./Countries";

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  let category = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology", "Politics"];

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowCountryDropdown(false); 
  };

  const toggleCountryDropdown = () => {
    setShowCountryDropdown(!showCountryDropdown);
    setShowCategoryDropdown(false); 
  };

  const closeCategoryDropdown = () => {
    setShowCategoryDropdown(false);
  };

  const closeCountryDropdown = () => {
    setShowCountryDropdown(false);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-between p-4">
        <h3 className="Info relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">INFO ACQUIRER</h3>

        <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 justify-end ${active ? "active" : ""}`}>
          <li><Link className="allNews no-underline font-semibold" to="/" onClick={() => { setActive(!active) }}>All News</Link></li>
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
        </ul>

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
