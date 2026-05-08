import axios from "axios";

import Navbar from "./components/layout/Navbar";
import FilterSection from "./components/home/FilterSection";
import CompanyList from "./components/home/CompanyList";

interface HomeProps {
  searchParams: Promise<{
    city?: string;
    sort?: string;
    search?: string;
  }>;
}

export default async function Home({
  searchParams,
}: HomeProps) {

  const {
    city,
    sort,
    search,
  } = await searchParams;

  // FETCH COMPANIES
  const response = await axios.get(
    "http://localhost:5000/api/company",
    {
      params: {
        city,
        sort,
        search,
      },
    }
  );

  const companies =
    response.data.companies;

  return (
    <main className="bg-[#FAFAFA] min-h-screen">

      <Navbar />

      <FilterSection />

      <CompanyList companies={companies} />

    </main>
  );
}