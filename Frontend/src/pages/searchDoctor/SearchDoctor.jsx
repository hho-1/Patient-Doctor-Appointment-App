import React, { useEffect, useState } from "react";
import "./searchDoctor.css";

import CardDoctor from "../../components/cardDoctor/CardDoctor";
import useDataCall from "../../hooks/useDataCall";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import Footer from "../../components/footer/Footer";
import searchIcon from "../../assets/ic_baseline-search.png";
import locationIcon from "../../assets/locationIcon.png";
import Header from "../../components/header/Header";
const SearchDoctor = () => {
  const { getData } = useDataCall();
  const { doctors, loading } = useSelector((state) => state.data);

  useEffect(() => {
    getData("doctors");
  }, []);

  return (
    <div className="main-container">
      <div className="nav">
        <div className="header">Navbar</div>
        {/* <Header /> */}
      </div>
      <form action="">
        <div className="input">
          <div className="input-left-box">
            <img src={searchIcon} alt="searchIcon" className="searchIcon" />
            <input
              type="text"
              className="input-left"
              placeholder="Name oder Fachgebiet"
            />
          </div>
          <div className="input-middleLine"></div>
          <div className="input-right-box">
            <img
              src={locationIcon}
              alt="locationIcon"
              className="locationIcon"
            />
            <input
              type="text"
              className="input-right"
              placeholder="z.B. Berlin oder 12345"
            />
          </div>
          <div className="input-right-box">
            <button type="submit" className="input-btn">
              Suchen
            </button>
          </div>
        </div>
      </form>
      <div className="input-fixed"></div>
      <div className="main-cardDoctor">
        {loading ? (
          <Loading />
        ) : (
          doctors?.data?.map((item, i) => <CardDoctor key={i} {...item} />)
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchDoctor;
