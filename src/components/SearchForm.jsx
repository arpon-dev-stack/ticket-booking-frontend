import { MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

const SearchForm = ({ onSearch, initialParams, today }) => {
  // Local state traps the re-renders here while typing
  const [formData, setFormData] = useState(initialParams);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">From</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-blue-500" size={18} />
          <input
            type="text"
            placeholder="Departure City"
            className="w-full pl-10 pr-4 py-3 border h-12 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.from}
            onChange={(e) => handleChange('from', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">To</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-red-500" size={18} />
          <input
            type="text"
            placeholder="Arrival City"
            className="w-full pl-10 pr-4 py-3 h-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.to}
            onChange={(e) => handleChange('to', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-600">Date</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 text-green-500" size={18} />
          <input
            type="date"
            min={today}
            className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full bg-emerald-600 h-12 text-white py-3 rounded-lg font-bold hover:bg-emerald-500 transition shadow-md active:scale-95"
        >
          Search Buses
        </button>
      </div>
    </form>
  );
};

export default SearchForm;