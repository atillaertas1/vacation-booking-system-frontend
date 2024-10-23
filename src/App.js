import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users'); // Tüm kullanıcıları al
      console.log(response.data);
    
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users', newUser); // Yeni kullanıcı oluştur
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editUser) return;

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${editUser.id}`, editUser); // Kullanıcıyı güncelle
      setUsers(users.map((user) => (user.id === response.data.id ? response.data : user)));
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`); // Kullanıcıyı sil
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">User Management</h1>

      <form onSubmit={handleAddUser} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Add User</button>
      </form>

      {editUser && (
        <form onSubmit={handleUpdateUser} className="mb-6">
          <input
            type="text"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="ml-2 p-2 bg-green-500 text-white rounded">Update User</button>
        </form>
      )}

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => handleEditUser(user)} className="mr-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
            <button onClick={() => handleDeleteUser(user.id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
