import { Search } from "lucide-react"; // optional icon
import {useState} from 'react';

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  className = "max-w-md",
}) => {

  const [barValue, setBarValue] = useState(value || '');
  const handleChange = (nextValue) => {
    setBarValue(nextValue);
    onChange?.(nextValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(barValue);
    }
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded-4xl px-3 py-1 sm:pl-5 sm:pr-5 sm:py-2 bg-white ${className}`}
    >
      <input
        type="text"
        value={barValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full focus:outline-none focus:ring-0 text-xs sm:text-base"
      />

      <Search 
        className={`w-6 sm:w-8 ${barValue ? 'text-blue-500 cursor-pointer' : 'text-gray-500'}`} 
        onClick={() => barValue && onSubmit?.(barValue)}
      />
    </div>
  );
};

export default SearchBar;
