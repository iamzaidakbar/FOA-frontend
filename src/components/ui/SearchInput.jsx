import React, { useState } from "react";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import { IoCartOutline } from "react-icons/io5";

const SearchInput = ({ iconPosition = "right", placeholder = "Search..." }) => {
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = (e) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const icon = loading ? (
    <LoadingOutlined spin className="search-icon" />
  ) : (
    <SearchOutlined className="search-icon" />
  );

  return (
    <>
      <div className="relative w-full max-w-lg">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          search
        </span>
        <input
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          prefix={iconPosition === "left" ? icon : null}
          suffix={iconPosition === "right" ? icon : null}
          className="w-full rounded-full border-none bg-[#EFEEF0] h-11 pl-10 text-sm transition-all placeholder:font-medium focus:outline-none"
          type="search"
        />
      </div>
    </>
  );
};

export default SearchInput;
