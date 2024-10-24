import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
      setError("");
      // Başka bir işlem yapmak isterseniz burada yapabilirsiniz.
    } catch (err) {
      setError("Kayıt sırasında bir hata oluştu.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded ">
          <h2 className="text-2xl mb-6 text-center">Kayıt Ol</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-center mt-4">
          Zaten bir hesabınız var mı?{" "}
          <Link to="/login" className="text-blue-500">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
