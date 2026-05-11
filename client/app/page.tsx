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

export default async function Home({ searchParams }: HomeProps) {
  const { city, sort, search } = await searchParams;

  const response = await axios.get(
    "http://localhost:5000/api/company",
    { params: { city, sort, search } }
  );

  const companies = response.data.companies;

  return (
    <main className="bg-[#F2F2F2] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-28">
        <FilterSection />
        <CompanyList companies={companies} />
      </div>
    </main>
  );
}