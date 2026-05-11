import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

interface CompanyCardProps {
  company: {
    _id: string;
    name: string;
    location: string;
    description: string;
    foundedOn: string;
    logo: string;
    averageRating: number;
    reviewCount: number;
  };
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  const formattedDate = company.foundedOn
    ? new Date(company.foundedOn).toLocaleDateString("en-GB").replace(/\//g, "-")
    : "";

  return (
    <div className="w-full py-4 flex items-center justify-between gap-3 border-b border-gray-200 last:border-b-0">

      {/* LEFT */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">

        {/* LOGO */}
        <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] md:w-[56px] md:h-[56px] rounded-[6px] overflow-hidden bg-[#111827] flex items-center justify-center shrink-0">
          <img
            src={company.logo || "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"}
            alt={company.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"; }}
          />
        </div>

        {/* INFO */}
        <div className="min-w-0">
          <h2 className="text-[13px] md:text-[14px] font-semibold text-black leading-tight truncate">
            {company.name}
          </h2>

          <p className="flex items-center gap-[3px] mt-[3px] text-[11px] text-[#7A7A7A] truncate">
            <IoLocationSharp className="text-[10px] shrink-0" />
            <span className="truncate">{company.location}</span>
          </p>

          {/* DESCRIPTION */}
          {company.description && (
            <p className="mt-[4px] text-[11px] text-[#9A9A9A] leading-[16px] line-clamp-2 max-w-[500px]">
              {company.description}
            </p>
          )}

          <div className="flex items-center gap-1 md:gap-2 mt-[5px] flex-wrap">
            <span className="text-[12px] font-bold text-black">
              {company.averageRating > 0 ? company.averageRating.toFixed(1) : "0.0"}
            </span>
            <div className="flex items-center gap-[2px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-[10px] md:text-[11px] ${
                    star <= Math.round(company.averageRating) ? "text-[#F5B301]" : "text-[#DDDDDD]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-[#555]">
              {company.reviewCount} Reviews
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <p className="hidden sm:block text-[10px] text-[#9B9B9B] whitespace-nowrap">
          Founded on {formattedDate}
        </p>
        <Link href={`/company/${company._id}`}>
          <button className="w-[90px] sm:w-[100px] md:w-[110px] h-[30px] md:h-[32px] rounded-[4px] bg-[#2F2F2F] text-white text-[11px] md:text-[12px] font-medium hover:bg-black hover:scale-[1.02] transition-all duration-200">
            Detail Review
          </button>
        </Link>
      </div>

    </div>
  );
};

export default CompanyCard;