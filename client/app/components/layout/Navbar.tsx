"use client";

import Container from "../common/Container";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();

  const [search, setSearch] =
    useState("");

  const handleSearch = () => {

    router.push(
      `/?search=${search}`
    );
  };

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 shadow-sm">
      <Container>
        <div className="h-[72px] flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-b from-purple-500 to-indigo-700 flex items-center justify-center">
              <FaStar className="text-white text-[14px]" />
            </div>

            <h1 className="text-[20px] font-semibold text-black">
              <span className="font-light">
                Review
              </span>

              <span className="font-bold">
                &RATE
              </span>
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-10">
            
            {/* SEARCH */}
            <div className="w-[270px] h-[38px] border border-gray-300 rounded-[3px] flex items-center px-3">
              
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />

              <button
                onClick={handleSearch}
              >
                <IoSearch className="text-purple-600 text-[18px] cursor-pointer" />
              </button>
            </div>

            {/* LINKS */}
            <div className="flex items-center gap-10 text-[15px] text-black">
              <button>SignUp</button>
              <button>Login</button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;