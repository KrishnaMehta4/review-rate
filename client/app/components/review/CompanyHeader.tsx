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

const CompanyHeader = ({
  company,
}: CompanyHeaderProps) => {
  const [openModal, setOpenModal] =
    useState(false);

  return (
    <>
      <div className="w-full bg-white border border-[#ECECEC] rounded-[8px] shadow-sm px-6 py-5 flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-5">
          
          {/* LOGO */}
          <div className="w-[84px] h-[84px] rounded-[6px] overflow-hidden bg-[#111827] flex items-center justify-center">
           <img
  src={
    company.logo ||
    "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
  }
  alt={company.name}
  onError={(e) => {
    e.currentTarget.src =
      "https://cdn-icons-png.flaticon.com/512/5968/5968705.png";
  }}
  className="w-full h-full object-cover"
/>
          </div>

          {/* CONTENT */}
          <div>
            <h2 className="text-[28px] font-semibold text-black">
              {company.name}
            </h2>

            <p className="mt-2 text-[13px] text-[#7A7A7A]">
              {company.location}
            </p>

            {/* RATINGS */}
            <div className="flex items-center gap-3 mt-4">
              
              <span className="text-[28px] font-bold text-black">
                {company.averageRating}
              </span>

              <div className="flex items-center gap-[2px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-[15px] ${
                      star <=
                      Math.round(
                        company.averageRating
                      )
                        ? "text-[#F5B301]"
                        : "text-[#DDDDDD]"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[22px] text-black font-medium">
                {company.reviewCount} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end justify-between h-[90px]">
          
          <p className="text-[12px] text-[#9B9B9B]">
            Founded on{" "}
            {new Date(
              company.foundedOn
            ).toLocaleDateString()}
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="w-[130px] h-[42px] rounded-[4px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[14px] font-medium"
          >
            + Add Review
          </button>
        </div>
      </div>

      {/* MODAL */}
      <AddReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        companyId={company._id}
      />
    </>
  );
};

export default CompanyHeader;