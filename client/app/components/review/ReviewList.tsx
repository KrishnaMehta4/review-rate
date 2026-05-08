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

interface ReviewListProps {
  companyId: string;
}

const ReviewList = ({
  companyId,
}: ReviewListProps) => {

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [sort, setSort] =
    useState("latest");

  const fetchReviews = async () => {
    try {

      const response = await axios.get(
        `http://localhost:5000/api/company/${companyId}/review?sort=${sort}`
      );

      setReviews(
        response.data.reviews
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sort]);

  return (
    <div className="mt-10 space-y-8">

      {/* TOP */}
      <div className="flex items-center justify-between">

        {/* RESULT */}
        <p className="text-[12px] text-[#9B9B9B]">
          Result Found: {reviews.length}
        </p>

        {/* SORT */}
        <div className="flex items-center gap-3">

          <p className="text-[13px] text-[#7A7A7A]">
            Sort By
          </p>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="w-[180px] h-[40px] border border-[#DADADA] rounded-[4px] px-3 text-[13px] outline-none bg-white"
          >
            <option value="latest">
              Latest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="highest">
              Highest Rating
            </option>

            <option value="lowest">
              Lowest Rating
            </option>
          </select>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="space-y-6">

        {reviews.length > 0 ? (

          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
            />
          ))

        ) : (

          <p className="text-[14px] text-gray-500">
            No Reviews Found
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;