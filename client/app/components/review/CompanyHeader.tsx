"use client";

import { useState } from "react";
import AddReviewModal from "./AddReviewModal";
import { FaStar } from "react-icons/fa";

interface CompanyHeaderProps {
  company: {
    _id: string;
    name: string;
    location: string;
    foundedOn: string;
    logo: string;
    averageRating: number;
    reviewCount: number;
  };
}

const CompanyHeader = ({ company }: CompanyHeaderProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full bg-white border border-[#ECECEC] rounded-[6px] px-4 sm:px-6 md:px-8 py-4 md:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* LOGO */}
          <div className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[6px] overflow-hidden bg-[#111827] flex items-center justify-center flex-shrink-0">
            <img
              src={company.logo || "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"}
              alt={company.name}
              onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"; }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* INFO */}
          <div>
            <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-semibold text-black">
              {company.name}
            </h2>
            <p className="text-[11px] md:text-[12px] text-[#7A7A7A] mt-1">
              {company.location}
            </p>
            <div className="flex items-center gap-2 mt-2 md:mt-3 flex-wrap">
              <span className="text-[18px] md:text-[22px] font-bold text-black">
                {company.averageRating}
              </span>
              <div className="flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-[11px] md:text-[13px] ${
                      star <= Math.round(company.averageRating) ? "text-[#F5B301]" : "text-[#DDDDDD]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[13px] md:text-[15px] text-black font-medium">
                {company.reviewCount} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-between sm:h-[72px] flex-shrink-0">
          <p className="text-[11px] text-[#9B9B9B]">
            Founded on {new Date(company.foundedOn).toLocaleDateString("en-IN")}
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="w-[120px] md:w-[130px] h-[34px] md:h-[38px] rounded-[4px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[12px] md:text-[13px] font-medium hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
          >
            + Add Review
          </button>
        </div>

      </div>

      <AddReviewModal open={openModal} onClose={() => setOpenModal(false)} companyId={company._id} />
    </>
  );
};

export default CompanyHeader;