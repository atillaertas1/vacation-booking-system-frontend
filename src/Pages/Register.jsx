import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // Yönlendirme için useNavigate kullanıldı

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      setSuccess(response.data.message || "Kayıt başarılı! Giriş yapabilirsiniz."); // Başarı mesajı
      setError("");
      navigate("/login"); // Kayıttan sonra giriş sayfasına yönlendirme
    } catch (err) {
      setError("Kayıt sırasında bir hata oluştu."); // Hata mesajı
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Kayıt Ol
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-3 border border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 border border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 border border-gray-600 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Zaten bir hesabınız var mı?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-semibold hover:underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
