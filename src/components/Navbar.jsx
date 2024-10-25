import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullan
  const location = useLocation();

  useEffect(() => {
    // Kullanıcı bilgilerini almak için bir API çağrısı yapabilirsiniz
    const fetchUser = async () => {
      const response = await fetch(
        "http://localhost:8080/api/users/current-user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold">
          Otel Rezervasyon Sistemi
        </Link>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none hover:text-blue-500 transition duration-150"
          >
            {username ? username : "Giriş Yap"}
          </button>
          {isOpen && (
            <div className="absolute right-0 bg-gray-800 shadow-lg rounded-md mt-2 w-48 z-10">
              <Link
                to="/profile"
                className={`block px-4 py-2 rounded-md text-gray-300 ${
                  location.pathname === "/profile"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                Profil
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-blue-500 hover:text-white"
                onClick={handleLogout}
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
