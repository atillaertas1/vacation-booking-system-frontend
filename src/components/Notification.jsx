import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) return null; // Eğer mesaj yoksa, bileşeni render etme

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${bgColor} text-white`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times; {/* Kapatma butonu */}
        </button>
      </div>
    </div>
  );
};

export default Notification;
