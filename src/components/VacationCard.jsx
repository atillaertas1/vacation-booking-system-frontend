import React from "react";

const VacationCard = ({ vacation }) => {
  return (
<div className="max-w-sm h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-800 flex flex-col">
  <img
    className="w-full h-48 object-cover"
    src={vacation.imageUrl}
    alt={vacation.name}
  />
  <div className="px-6 py-4 flex-1 flex flex-col justify-between">
    <div>
      <div className="font-bold text-2xl text-white mb-2">{vacation.name}</div>
      <p className="text-gray-300 text-base mb-2">
        {vacation.description}
      </p>
      <p className="text-blue-400 font-bold text-xl mb-2">
        ${vacation.pricePerNight} / gece
      </p>
      <p className="text-gray-500 text-sm">
        Lokasyon: {vacation.location}
      </p>
    </div>
    <div className="mt-auto relative z-10">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 w-full">
        Rezervasyon Yap
      </button>
    </div>
  </div>
</div>
  );
};

export default VacationCard;
