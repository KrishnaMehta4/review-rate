
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddCompanyModal from "./AddCompanyModal";
import { IoLocationSharp } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const FilterSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [city, setCity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "name");

  const handleSort = (value: string) => {
    setSort(value);
    const city = searchParams.get("city") || "";
    router.push(`/?city=${city}&sort=${value}`);
  };

  return (
    <>
      <section className="pt-5 md:pt-8 pb-0">
        <div className="border-b border-gray-200 pb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          {/* LEFT */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-4">

            {/* CITY INPUT */}
            <div className="w-full sm:w-auto">
              <p className="text-[11px] text-gray-500 mb-2">Select City</p>
              <div className="w-full sm:w-[260px] md:w-[292px] h-[39px] border border-gray-300 rounded-[3px] bg-white flex items-center justify-between px-3">
                <input
                  type="text"
                  placeholder="Indore, Madhya Pradesh, India"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && city.trim()) {
                      router.push(`/?city=${city}`);
                    }
                  }}
                  className="text-[12px] w-full outline-none bg-transparent"
                />
                <IoLocationSharp className="text-purple-600 text-[16px] flex-shrink-0" />
              </div>
            </div>

            {/* BUTTONS ROW */}
            <div className="flex items-center gap-3">
              {/* FIND BUTTON */}
              <button
                onClick={() => { if (!city.trim()) return; router.push(`/?city=${city}`); }}
                className="h-[39px] px-5 md:px-7 text-[13px] font-medium text-white rounded-[3px] bg-gradient-to-b from-purple-500 to-indigo-700 flex-shrink-0 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                Find Company
              </button>

              {/* ADD BUTTON */}
              <button
                onClick={() => setOpenModal(true)}
                
className="h-[39px] px-4 md:w-[130px] rounded-[3px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[13px] font-medium flex-shrink-0 hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              >
                + Add Company
              </button>
            </div>
          </div>

          {/* RIGHT — SORT */}
          <div className="flex items-center gap-3 md:block">
            <p className="text-[11px] text-gray-500 md:mb-2">Sort:</p>
            <select
              value={sort}
              onChange={(e) => handleSort(e.target.value)}
              className="flex-1 md:flex-none w-full md:w-[140px] h-[39px] border border-gray-300 rounded-[3px] bg-white px-3 text-[13px] outline-none"
            >
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="reviews">Reviews</option>
              <option value="location">Location</option>
            </select>
          </div>

        </div>
      </section>

      <AddCompanyModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default FilterSection;

