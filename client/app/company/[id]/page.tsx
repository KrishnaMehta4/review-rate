import axios from "axios";
import Navbar from "@/app/components/layout/Navbar";
import CompanyHeader from "@/app/components/review/CompanyHeader";
import ReviewList from "@/app/components/review/ReviewList";

interface PageProps {
  params: Promise<{ id: string }>;
}

const CompanyDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const response = await axios.get(`http://localhost:5000/api/company/${id}`);
  const company = response.data.company;

  return (
    <main className="bg-[#FAFAFA] min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-28 pt-6 md:pt-10 pb-12 md:pb-20">
        <CompanyHeader company={company} />
        <ReviewList companyId={id} />
      </section>
    </main>
  );
};

export default CompanyDetailsPage;