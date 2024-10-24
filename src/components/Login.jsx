import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { username, password }
      );
      // Token'i local storage'a kaydedebilirsiniz
      localStorage.setItem("token", response.data.token);
      // Başarılı giriş sonrası yönlendirme veya diğer işlemleri yapabilirsiniz
      console.log("Giriş başarılı:", response.data);
    } catch (err) {
      setError("Kullanıcı adı veya şifre hatalı!");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded"
        >
          <h2 className="text-2xl mb-6 text-center">Giriş Yap</h2>
          {error && <p className="text-red-500">{error}</p>}
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
            Giriş Yap
          </button>
        </form>
        <p className="text-center mt-4">
          Hesabınız yok mu?{" "}
          <Link to="/register" className="text-blue-500">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
