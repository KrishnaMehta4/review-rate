"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddCompanyModal from "./AddCompanyModal";
import Container from "../common/Container";
import { IoLocationSharp } from "react-icons/io5";

import { useSearchParams } from "next/navigation";

const FilterSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [city, setCity] = useState("");
  const router = useRouter();
  
  

const searchParams = useSearchParams();

const [sort, setSort] =
  useState(
    searchParams.get("sort") || "name"
  );

  const handleSort = (
  value: string
) => {

  setSort(value);

  const city =
    searchParams.get("city") || "";

  router.push(
    `/?city=${city}&sort=${value}`
  );
};
  return (
    <>
      <section className="pt-8">
        <Container>
          <div className="border-b border-gray-200 pb-5 flex items-end justify-between">
            {/* LEFT */}
            <div className="flex items-end gap-6">
              {/* CITY */}
              <div>
                <p className="text-[11px] text-gray-500 mb-2">Select City</p>

                <div className="w-[292px] h-[39px] border border-gray-300 rounded-[3px] bg-white flex items-center justify-between px-3">
                  <input
                    type="text"
                    placeholder="Indore, Madhya Pradesh, India"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="text-[12px] w-full outline-none bg-transparent"
                  />

                  <IoLocationSharp className="text-purple-600 text-[16px]" />
                </div>
              </div>

              {/* FIND BUTTON */}
              <button
                onClick={() => {
                  if (!city.trim()) return;

                  router.push(`/?city=${city}`);
                }}
                className="h-[39px] px-7 text-[13px] font-medium text-white rounded-[3px] bg-gradient-to-b from-purple-500 to-indigo-700"
              >
                Find Company
              </button>

              {/* ADD BUTTON */}
              <button
                onClick={() => setOpenModal(true)}
                className="w-[120px] h-[39px] rounded-[3px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[13px] font-medium"
              >
                + Add Company
              </button>
            </div>

            {/* RIGHT */}
            <div>
              <p className="text-[11px] text-gray-500 mb-2">Sort:</p>

              <select
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                className="w-[140px] h-[39px] border border-gray-300 rounded-[3px] bg-white px-3 text-[13px] outline-none"
              >
                <option value="name">Name</option>

                <option value="rating">Rating</option>

                <option value="reviews">Reviews</option>

                <option value="location">Location</option>
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* MODAL */}
      <AddCompanyModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default FilterSection;
