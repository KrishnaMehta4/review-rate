"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar, FaHeart, FaShare } from "react-icons/fa";

interface ReviewCardProps {
  review: {
    _id: string;
    fullName: string;
    subject: string;
    reviewText: string;
    rating: number;
    createdAt: string;
    likes: number;
  };
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) return;
      await axios.patch(`http://localhost:5000/api/company/review/${review._id}/like`);
      setLikes((prev) => prev + 1);
      setLiked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: review.subject,
      text: review.reviewText,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${review.subject}\n\n${review.reviewText}\n\n${window.location.href}`
        );
        toast.success("Review link copied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formattedDate = new Date(review.createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="w-full flex items-start justify-between gap-3 border-b border-[#EEEEEE] py-5">

      {/* LEFT */}
      <div className="flex items-start gap-3 md:gap-4 min-w-0">

        {/* AVATAR */}
        <img
          src={`https://ui-avatars.com/api/?name=${review.fullName}&background=7B2EFF&color=fff`}
          alt={review.fullName}
          className="w-[34px] h-[34px] md:w-[42px] md:h-[42px] rounded-full object-cover flex-shrink-0"
        />

        {/* CONTENT */}
        <div className="min-w-0">
          <h3 className="text-[13px] md:text-[15px] font-medium text-black">
            {review.fullName}
          </h3>
          <p className="text-[11px] text-[#A1A1A1] mt-[2px]">{formattedDate}</p>
          <p className="mt-2 text-[12px] md:text-[13px] font-medium text-[#7B2EFF]">
            {review.subject}
          </p>
          <p className="mt-2 md:mt-3 text-[12px] md:text-[13px] leading-[20px] md:leading-[22px] text-[#5B5B5B]">
            {review.reviewText}
          </p>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 md:gap-5 mt-3 md:mt-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 md:gap-2 text-[12px] md:text-[13px] hover:opacity-80 transition-all"
            >
              <FaHeart className={`text-[13px] md:text-[15px] transition-all ${liked ? "text-red-500" : "text-[#7B2EFF]"}`} />
              <span className="text-[#7B2EFF]">{likes} Likes</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 md:gap-2 text-[12px] md:text-[13px] text-[#7B2EFF] hover:opacity-80 transition-all"
            >
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end flex-shrink-0">
        <div className="flex items-center gap-[2px] md:gap-[3px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`text-[12px] md:text-[14px] ${star <= review.rating ? "text-[#F5B301]" : "text-[#D9D9D9]"}`}
            />
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default ReviewCard;