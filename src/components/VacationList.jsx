import React, { useEffect, useState } from "react";
import VacationCard from "./VacationCard";
import axios from "axios";

const VacationList = () => {
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/spots?available=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVacations(response.data);
      } catch (error) {
        console.error("Tatil yerlerini alırken bir hata oluştu:", error);
      }
    };

    fetchVacations();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {vacations.length > 0 ? (
        vacations.map((vacation) => (
          <div key={vacation.id} className="transition-transform transform hover:scale-105">
            <VacationCard vacation={vacation} />
          </div>
        ))
      ) : (
        <p className="text-white">Mevcut tatil yeri bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default VacationList;
