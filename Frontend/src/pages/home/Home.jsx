import React, { useEffect } from "react";
import useDataCall from "../../hooks/useDataCall";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import Hero from "../../components/hero/Hero";
import HomeSection from "../../components/homeSection/HomeSection";

const Home = () => {
  //   const {getData} = useDataCall()
  // const {myData} = useSelector((state)=>state.data)

  // console.log("data",myData);

  // useEffect(() => {
  //   getData("doctors")
  // }, [])

  return (
    <div className="flex flex-col  items-start">
      <Header />
      <Hero />
      <HomeSection />
    </div>
  );
};

export default Home;
