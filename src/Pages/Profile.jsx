import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Notification from "../components/Notification";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/api/users/current-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        if (error.response?.status === 401) {
          navigate("/login"); // Giriş yapmamışsa giriş sayfasına yönlendir
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/api/users/${user.id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({
        message: "Profile updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setNotification({ message: "Failed to update profile!", type: "error" });
    }
  };

  const closeNotification = () => {
    setNotification({ message: "", type: "" });
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar /> {/* Navbar bileşenini ekle */}
      <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg p-8 mt-6">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          User Profile
        </h2>
        {user ? (
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Username:
              </label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Email:
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Role:
              </label>
              <input
                type="text"
                value={user.role}
                readOnly
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-600 text-gray-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">
                Created At:
              </label>
              <input
                type="text"
                value={new Date(user.createdAt).toLocaleString()}
                readOnly
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-600 text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Update Profile
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-300">User not found</p>
        )}
      </div>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
};

export default Profile;
