"use client";

import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    router.push(`/?search=${search}`);
  };

  return (
    <header className="h-[60px] md:h-[72px] bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-4 sm:px-8 md:px-16">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] md:w-[34px] md:h-[34px] rounded-full bg-gradient-to-b from-purple-500 to-indigo-700 flex items-center justify-center flex-shrink-0">
            <FaStar className="text-white text-[12px] md:text-[14px]" />
          </div>
          <h1 className="text-[17px] md:text-[20px] font-semibold text-black">
            <span className="font-light">Review</span>
            <span className="font-bold">
              <span className="text-[#7B2EFF]">&</span>RATE
            </span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* SEARCH — full on md+, icon-toggle on mobile */}
          <div className="flex items-center gap-2">

            {/* Full search bar — hidden on mobile */}
            <div className="hidden md:flex w-[200px] h-[36px] border border-gray-300 rounded-[3px] items-center px-3">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />
              <button onClick={handleSearch}>
                <IoSearch className="text-purple-600 text-[16px] cursor-pointer" />
              </button>
            </div>

            {/* Mobile search icon toggle */}
            <button
              className="md:hidden text-purple-600 text-[20px]"
              onClick={() => setShowSearch(!showSearch)}
            >
              <IoSearch />
            </button>
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex items-center gap-3 md:gap-5 text-[13px] md:text-[14px] text-black">
            <button className="hover:text-purple-600 transition-colors">SignUp</button>
            <button className="hover:text-purple-600 transition-colors">Login</button>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR — drops below navbar */}
      {showSearch && (
        <div className="md:hidden px-4 py-2 bg-white border-t border-gray-100 shadow-sm">
          <div className="flex items-center h-[38px] border border-gray-300 rounded-[4px] px-3">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { handleSearch(); setShowSearch(false); } }}
              className="flex-1 text-[13px] outline-none bg-transparent"
              autoFocus
            />
            <button onClick={() => { handleSearch(); setShowSearch(false); }}>
              <IoSearch className="text-purple-600 text-[16px]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

