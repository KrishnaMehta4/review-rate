"use client";

import CompanyCard from "./CompanyCard";

interface Company {
  _id: string;
  name: string;
  location: string;
  foundedOn: string;
  logo: string;
  averageRating: number;
  reviewCount: number;
}

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = ({ companies }: CompanyListProps) => {
  return (
    <section className="pt-4 md:pt-6 pb-10 md:pb-16">
      <p className="text-[12px] text-[#A0A0A0] mb-4">
        Result Found: {companies.length}
      </p>
      <div>
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))
        ) : (
          <p className="text-[14px] text-gray-500">No company found</p>
        )}
      </div>
    </section>
  );
};

export default CompanyList;

