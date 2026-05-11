"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";

interface Review {
  _id: string;
  fullName: string;
  subject: string;
  reviewText: string;
  rating: number;
  createdAt: string;
  likes: number;
}

const ReviewList = ({ companyId }: { companyId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sort, setSort] = useState("latest");

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/company/${companyId}/review?sort=${sort}`
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchReviews(); }, [sort]);

  return (
    <div className="mt-4 md:mt-6">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4 md:mb-5 flex-wrap gap-2">
        <p className="text-[12px] text-[#9B9B9B]">Result Found: {reviews.length}</p>
        <div className="flex items-center gap-2 md:gap-3">
          <p className="hidden sm:block text-[13px] text-[#7A7A7A]">Sort By</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-[140px] md:w-[160px] h-[34px] md:h-[36px] border border-[#DADADA] rounded-[4px] px-2 md:px-3 text-[12px] md:text-[13px] outline-none bg-white"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* CARDS */}
      <div className="bg-white border border-[#ECECEC] rounded-[6px] px-4 sm:px-6 md:px-8 py-2">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <p className="text-[14px] text-gray-500 py-6">No Reviews Found</p>
        )}
      </div>

    </div>
  );
};

export default ReviewList;