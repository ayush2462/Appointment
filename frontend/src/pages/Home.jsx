import React from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import HomeFeatures from "../components/HomeFeatures";

const Home = () => {
  return (
    <div className="space-y-6">
      <Header />
      <SpecialityMenu />
      <HomeFeatures />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
