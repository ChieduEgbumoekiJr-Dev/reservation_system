"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleSearch = () => {
    if (location.trim().length === 0) return;
    const path = `/search?city=${location}`;
    router.push(path);
    setLocation("");
    return;
  };

  return (
    <div className="text-left text-lg py-3 m-auto flex flex-wrap gap-2 justify-center">
      <input
        className="rounded p-2 w-full sm:w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={handleLocation}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white w-full sm:w-auto"
        onClick={handleSearch}
      >
        Let's go
      </button>
    </div>
  );
};

export default SearchBar;
