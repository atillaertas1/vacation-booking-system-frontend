import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import VacationList from "../components/VacationList";
import axios from "axios";

const HomePage = () => {
    const [vacations, setVacations] = useState([]);

    const fetchVacations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/spots?available=true");
            setVacations(response.data);
        } catch (error) {
            console.error("Tatil yerleri alınırken hata oluştu:", error);
        }
    };

    useEffect(() => {
        fetchVacations(); // Ana sayfa yüklendiğinde tatil yerlerini getir
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            {/* Navbar Bileşeni */}
            <Navbar />
            <div className="p-4">
                <h1 className="text-white text-3xl mb-4">Mevcut Tatil Yerleri</h1>
                <VacationList vacations={vacations} /> {/* Tatil yerlerini listele */}
            </div>
        </div>
    );
};

export default HomePage;
