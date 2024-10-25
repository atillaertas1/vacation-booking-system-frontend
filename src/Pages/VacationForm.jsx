import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";

const VacationForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [availabilityStartDate, setAvailabilityStartDate] = useState("");
  const [availabilityEndDate, setAvailabilityEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [token, setToken] = useState("");
  const [ownerId, setOwnerId] = useState(""); // ownerId durumu eklendi

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Kullanıcı bilgilerini almak için API çağrısı yap
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/users/current-user",
            {
              headers: {
                Authorization: `Bearer ${storedToken}`, // Token'ı buraya ekle
              },
            }
          );
          setOwnerId(response.data.id); // Kullanıcının ID'sini al
        } catch (error) {
          console.error("Kullanıcı bilgileri alınırken hata oluştu:", error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vacationSpot = {
      name,
      description,
      location,
      pricePerNight: parseFloat(pricePerNight),
      availabilityStartDate,
      availabilityEndDate,
      imageUrl,
      owner: { id: ownerId }, // ownerId'yi burada gönder
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/spots",
        vacationSpot,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token'ı buraya ekle
          },
        }
      );
      setNotification({
        message: "Tatil yeri başarıyla oluşturuldu!",
        type: "success",
      });
      // Formu temizle
      setName("");
      setDescription("");
      setLocation("");
      setPricePerNight("");
      setAvailabilityStartDate("");
      setAvailabilityEndDate("");
      setImageUrl("");
    } catch (error) {
      setNotification({
        message: "Tatil yeri oluşturulurken hata oluştu.",
        type: "error",
      });
      console.error("Tatil yeri oluşturulurken hata oluştu:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Yeni Tatil Yeri Oluştur
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              İsim:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Açıklama:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Konum:
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Gece Başı Fiyat:
            </label>
            <input
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Başlangıç Tarihi:
            </label>
            <input
              type="datetime-local"
              value={availabilityStartDate}
              onChange={(e) => setAvailabilityStartDate(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Bitiş Tarihi:
            </label>
            <input
              type="datetime-local"
              value={availabilityEndDate}
              onChange={(e) => setAvailabilityEndDate(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Resim URL'si:
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 border border-gray-600 rounded-md p-2 w-full bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Oluştur
          </button>
        </form>
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      </div>
    </div>
  );
};

export default VacationForm;
