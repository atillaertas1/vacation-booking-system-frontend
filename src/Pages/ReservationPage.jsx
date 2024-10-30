import React, { useState } from "react"; // useEffect kaldırıldı
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReservationPage = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const status = "PENDING"; // Varsayılan olarak "PENDING"
    
    const { vacationSpotId } = useParams(); 
    const navigate = useNavigate();
    const userId = 1; // Örnek kullanıcı ID

    const handleDateChange = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const nightCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // Gün sayısı
            const pricePerNight = 100; // Örnek gece başı fiyat
            setTotalPrice(nightCount * pricePerNight); // Toplam fiyat hesaplama
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Formun varsayılan davranışını engelle

        const reservationData = {
            user: { id: userId },
            vacationSpot: { id: vacationSpotId },
            startDate,
            endDate,
            totalPrice,
            status,
        };

        try {
            const token = localStorage.getItem("token"); // Token'ı al
            if (!token) {
                alert("Kullanıcı oturumu kapalı. Lütfen giriş yapın.");
                return;
            }

            const response = await axios.post("http://localhost:8080/api/reservations", reservationData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Token'ı başlıkta gönder
                },
            });

            if (response.status === 201) { // Başarılı bir yanıt
                alert("Rezervasyon başarıyla gönderildi!");
                navigate(`/vacation/${vacationSpotId}`); 
            } else {
                alert("Rezervasyon oluşturulurken bir hata oluştu.");
            }
        } catch (error) {
            if (error.response) {
                // Sunucu, isteği işledi ancak bir hata döndü
                console.error("Rezervasyon oluşturma hatası:", error.response.data);
                alert(`Hata: ${error.response.data.message || "Bir hata oluştu."}`);
            } else if (error.request) {
                // İstek yapıldı ancak yanıt alınamadı
                console.error("Sunucuya ulaşılamadı:", error.request);
                alert("Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.");
            } else {
                // İstek yapılırken bir hata oluştu
                console.error("Rezervasyon oluşturma hatası:", error.message);
                alert("Rezervasyon oluşturulurken bir hata oluştu.");
            }
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Rezervasyon Yap</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Başlangıç Tarihi:</label>
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                handleDateChange();
                            }}
                            required
                            className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Bitiş Tarihi:</label>
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                handleDateChange();
                            }}
                            required
                            className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Toplam Fiyat:</label>
                        <input
                            type="number"
                            value={totalPrice}
                            readOnly
                            className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Rezervasyon Yap
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservationPage;
