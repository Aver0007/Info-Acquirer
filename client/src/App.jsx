
import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import AllNews from "./AllNews";
import TopHeadlines from "./TopHeadlines";
import CountryNews from "./CountryNews";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
        </Routes>
        {/* <Cards />  */}
        {/* <Footer />   */}
      </BrowserRouter>
    </div>
  );
}

export default App;