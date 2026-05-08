import axios from "axios";

import Container from "@/app/components/common/Container";
import Navbar from "@/app/components/layout/Navbar";
import CompanyHeader from "@/app/components/review/CompanyHeader";
import ReviewList from "@/app/components/review/ReviewList";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const CompanyDetailsPage = async ({
  params,
}: PageProps) => {

  const { id } = await params;

  // FETCH COMPANY
  const response = await axios.get(
    `http://localhost:5000/api/company/${id}`
  );

  const company = response.data.company;

  return (
    <main className="bg-[#FAFAFA] min-h-screen">

      <Navbar />

      <section className="pt-[80px] pb-[100px]">

        <Container>

          <CompanyHeader company={company} />

        </Container>

        <ReviewList companyId={id} />

      </section>

    </main>
  );
};

export default CompanyDetailsPage;