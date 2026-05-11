"use client";

import { useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  companyId: string;
}

const AddReviewModal = ({ open, onClose, companyId }: AddReviewModalProps) => {
  const [fullName, setFullName] = useState("");
  const [subject, setSubject] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(4);

  const handleSaveReview = async () => {
    if (!fullName.trim() || !subject.trim() || !review.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/company/${companyId}/review`,
        { fullName, subject, reviewText: review, rating }
      );
      console.log(response.data);
      setFullName("");
      setSubject("");
      setReview("");
      setRating(4);
      toast.success("Review Added Successfully");
      onClose();
      window.location.reload();
    } catch (error: any) {
      console.log(error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed To Add Review");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="relative w-[318px] bg-white rounded-[16px] shadow-2xl overflow-hidden px-[16px] pt-[18px] pb-[18px]">
        
        {/* TOP DESIGN */}
        <div className="absolute top-0 left-0">
          <div className="w-[52px] h-[52px] rounded-br-[52px] bg-gradient-to-b from-[#D52BFF] to-[#5B27FF]" />
          <div className="absolute top-0 left-[30px] w-[52px] h-[52px] rounded-full bg-[#D9C6FF]" />
        </div>

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-[14px] right-[14px] text-[#7A7A7A] text-[18px]">
          <IoClose />
        </button>

        {/* TITLE */}
        <h2 className="text-center text-[15px] font-semibold text-black">
          Add Review
        </h2>

        {/* FORM */}
        <div className="mt-[18px]">

          {/* FULL NAME */}
          <div>
            <label className="block text-[9px] text-[#7A7A7A] mb-[4px]">Full Name</label>
            <div className="border border-[#DDDDDD] rounded-[3px] px-2 py-2 bg-white">
              <input
                type="text"
                placeholder="Enter"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-[24px] border border-[#DDDDDD] rounded-[3px] px-2 text-[10px] text-black outline-none placeholder:text-[#B8B8B8]"
              />
            </div>
          </div>

          {/* SUBJECT */}
          <div className="mt-[10px]">
            <label className="block text-[9px] text-[#7A7A7A] mb-[4px]">Subject</label>
            <div className="border border-[#DDDDDD] rounded-[3px] px-2 py-2 bg-white">
              <input
                type="text"
                placeholder="Enter"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full h-[24px] border border-[#DDDDDD] rounded-[3px] px-2 text-[10px] text-black outline-none placeholder:text-[#B8B8B8]"
              />
            </div>
          </div>

          {/* REVIEW */}
          <div className="mt-[10px]">
            <label className="block text-[9px] text-[#7A7A7A] mb-[4px]">Enter your Review</label>
            <div className="border border-[#DDDDDD] rounded-[3px] px-2 py-2 bg-white">
              <textarea
                placeholder="Description"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-[50px] text-[10px] text-black outline-none resize-none bg-transparent placeholder:text-[#B8B8B8]"
              />
            </div>
          </div>

          {/* RATING */}
          <div className="mt-[14px]">
            <h3 className="text-[13px] font-semibold text-black mb-[8px]">Rating</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-[18px] cursor-pointer transition-all ${
                      star <= rating ? "text-[#F5B301]" : "text-[#D9D9D9]"
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] text-[#8A8A8A]">Satisfied</p>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center mt-[18px]">
            <button
              onClick={handleSaveReview}
              className="w-[60px] h-[24px] rounded-[3px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[10px] font-medium hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
