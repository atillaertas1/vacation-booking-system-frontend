import React from "react";
import Navbar from "../components/Navbar";
import VacationList from "../components/VacationList";

const HomePage = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Navbar Bileşeni */}
      <Navbar />
      <div className="p-4">
        <VacationList />
      </div>
    </div>
  );
};

export default HomePage;
