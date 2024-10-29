import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VacationDetail = () => {
  const { id } = useParams(); // URL'den tatil id'sini al
  const [vacation, setVacation] = useState(null);

  useEffect(() => {
    const fetchVacationDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:8080/api/spots/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVacation(response.data);
      } catch (error) {
        console.error("Tatil detaylarını alırken bir hata oluştu:", error);
      }
    };

    fetchVacationDetail();
  }, [id]);

  if (!vacation) return <div>Yükleniyor...</div>; // Yüklenme durumu

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
        <img
          className="w-full h-64 object-cover rounded-lg"
          src={vacation.imageUrl}
          alt={vacation.name}
        />
        <h2 className="text-3xl font-bold text-white mt-4">{vacation.name}</h2>
        <p className="text-gray-300 mt-2">{vacation.description}</p>
        <p className="text-blue-400 font-bold text-xl mt-4">
          ${vacation.pricePerNight} / gece
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Lokasyon: {vacation.location}
        </p>
      </div>
    </div>
  );
};

export default VacationDetail;
