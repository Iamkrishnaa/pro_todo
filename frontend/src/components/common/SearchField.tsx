import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  bgColor?: string;
  height?: string;
  width?: string;
  otherInputClasses?: string;
  disabled?: boolean;
}

const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onClear,
  onFocus,
  onBlur,
  leadingIcon = <IoSearch className="h-5 w-5 text-gray-400" />,
  trailingIcon = <FaTimes className="h-5 w-5 cursor-pointer text-gray-400" />,
  bgColor = "bg-lightSecondary dark:bg-darkSecondary",
  height = "h-10",
  width = "w-full",
  otherInputClasses = "",
  disabled = false,
}) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    if (onClear) onClear();
  };

  const handleFocus = () => {
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <div className="search-field">
      <div className="z-1 relative flex items-center">
        {/* Leading Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {leadingIcon}
        </span>

        {/* Input Field */}
        <input
          id="searchField"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          className={`block ${height} ${width} rounded-lg border border-none pl-10 pr-10 focus:outline-none ${bgColor} ${otherInputClasses}`}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />

        {/* Trailing Icon (clear button) */}
        {searchValue && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 z-10 flex items-center pr-3"
          >
            {trailingIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchField;
