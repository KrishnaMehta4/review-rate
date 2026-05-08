import Link from "next/link";
import { FaStar } from "react-icons/fa";

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

const CompanyCard = ({
  company,
}: CompanyCardProps) => {
  return (
    <div className="w-full min-h-[170px] bg-white border border-[#ECECEC] rounded-[8px] shadow-sm px-6 py-5 flex items-center justify-between">
      
      {/* LEFT SIDE */}
      <div className="flex items-start gap-5">
        
        {/* LOGO */}
        <div className="w-[84px] h-[84px] rounded-[6px] overflow-hidden bg-[#111827] flex items-center justify-center shrink-0">
          
          <img
            src={
              company.logo
                ? company.logo
                : "https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
            }
            alt={company.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://cdn-icons-png.flaticon.com/512/5968/5968705.png";
            }}
          />
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-[28px] font-semibold text-black leading-none">
            {company.name}
          </h2>

          {/* LOCATION */}
          <p className="mt-3 text-[13px] text-[#7A7A7A]">
            {company.location}
          </p>

          {/* DESCRIPTION */}
          <p className="mt-2 max-w-[650px] text-[13px] leading-[22px] text-[#5E5E5E]">
            {company.description}
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
                    Math.round(company.averageRating)
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

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end justify-between h-[100px]">
        
        <p className="text-[12px] text-[#9B9B9B]">
          Founded on{" "}
          {new Date(
            company.foundedOn
          ).toLocaleDateString()}
        </p>

        <Link href={`/company/${company._id}`}>
          <button className="w-[130px] h-[42px] rounded-[4px] bg-[#2F2F2F] text-white text-[14px] font-medium hover:bg-black transition-all">
            Detail Review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;