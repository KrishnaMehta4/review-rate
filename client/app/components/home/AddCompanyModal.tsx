"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCompanyModal = ({ open, onClose }: AddCompanyModalProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [foundedOn, setFoundedOn] = useState("");
  const [logo, setLogo] = useState("");

  const handleAddCompany = async () => {
    if (!name.trim() || !location.trim() || !foundedOn || !city.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/company", {
        name, location, city, description, foundedOn, logo,
      });
      toast.success("Company Added Successfully");
      setName(""); setLocation(""); setCity("");
      setDescription(""); setFoundedOn(""); setLogo("");
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add Company");
    }
  };

  if (!open) return null;

  const labelClass = "text-[11px] text-[#7A7A7A] mb-[3px] block";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="relative w-[380px] bg-white rounded-[12px] overflow-hidden">

        {/* TOP DECORATION */}
        <div className="relative h-[60px] bg-white overflow-hidden flex-shrink-0">
          <div className="absolute -top-8 -left-8 w-[90px] h-[90px] rounded-full bg-gradient-to-b from-[#C229FF] to-[#5C28FF] opacity-80" />
          <div className="absolute -top-4 left-8 w-[60px] h-[60px] rounded-full bg-gradient-to-b from-[#C229FF] to-[#5C28FF] opacity-40" />
          <button onClick={onClose} className="absolute top-3 right-4 text-[18px] text-gray-500 hover:text-black">
            <IoClose />
          </button>
          <h2 className="absolute bottom-2 w-full text-center text-[17px] font-semibold text-black">
            Add Company
          </h2>
        </div>

        {/* FORM */}
        <div className="px-6 pb-5 space-y-[10px]">

          {/* COMPANY NAME */}
          <div>
            <label className={labelClass}>Company name</label>
            <div className="w-full h-[36px] border border-[#DDDDDD] rounded-[4px] px-3 flex items-center bg-white">
              <input
                type="text"
                placeholder="Enter"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className={labelClass}>Location</label>
            <div className="w-full h-[36px] border border-[#DDDDDD] rounded-[4px] px-3 flex items-center justify-between bg-white">
              <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />
              <IoLocationOutline className="text-[#AAAAAA] text-[15px]" />
            </div>
          </div>

          {/* FOUNDED ON */}
          <div>
            <label className={labelClass}>Founded on</label>
            <div className="w-full h-[36px] border border-[#DDDDDD] rounded-[4px] px-3 flex items-center bg-white">
              <input
                type="date"
                value={foundedOn}
                onChange={(e) => setFoundedOn(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent text-[#AAAAAA]"
              />
            </div>
          </div>

          {/* CITY */}
          <div>
            <label className={labelClass}>Enter City</label>
            <div className="w-full h-[36px] border border-[#DDDDDD] rounded-[4px] px-3 flex items-center bg-white">
              <input
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className={labelClass}>Description</label>
            <div className="w-full border border-[#DDDDDD] rounded-[4px] px-3 py-2 bg-white">
              <textarea
                placeholder="Company Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[60px] text-[13px] outline-none resize-none bg-transparent"
              />
            </div>
          </div>

          {/* LOGO URL */}
          <div>
            <label className={labelClass}>Logo URL</label>
            <div className="w-full h-[36px] border border-[#DDDDDD] rounded-[4px] px-3 flex items-center bg-white">
              <input
                type="text"
                placeholder="https://..."
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                className="flex-1 text-[13px] outline-none bg-transparent"
              />
            </div>
          </div>

          {/* SAVE BUTTON */}
          <div className="flex justify-center pt-1">
            <button
              onClick={handleAddCompany}
              className="w-[90px] h-[34px] rounded-[4px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white text-[13px] font-medium hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;