"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface AddCompanyModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCompanyModal = ({
  open,
  onClose,
}: AddCompanyModalProps) => {

  const [name, setName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [city, setCity] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [foundedOn, setFoundedOn] =
    useState("");

  const [logo, setLogo] =
    useState("");

  const handleAddCompany = async () => {
    try {

      await axios.post(
        "http://localhost:5000/api/company",
        {
          name,
          location,
          city,
          description,
          foundedOn,
          logo,
        }
      );

      toast.success(
  "Company Added Successfully"
);

      setName("");
      setLocation("");
      setCity("");
      setDescription("");
      setFoundedOn("");
      setLogo("");

      onClose();

      window.location.reload();

    } catch (error) {

  console.log(error);

  toast.error(
    "Failed To Add Company"
  );
}
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">

      <div className="relative w-[420px] bg-white rounded-[16px] px-6 py-6">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[20px]"
        >
          <IoClose />
        </button>

        {/* TITLE */}
        <h2 className="text-center text-[24px] font-semibold">
          Add Company
        </h2>

        <div className="mt-6 space-y-4">

          {/* NAME */}
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full h-[45px] border border-[#DDDDDD] rounded-[6px] px-4 outline-none"
          />

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="w-full h-[45px] border border-[#DDDDDD] rounded-[6px] px-4 outline-none"
          />

          {/* CITY */}
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full h-[45px] border border-[#DDDDDD] rounded-[6px] px-4 outline-none"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Company Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full h-[100px] border border-[#DDDDDD] rounded-[6px] px-4 py-3 outline-none resize-none"
          />

          {/* FOUNDED */}
          <input
            type="date"
            value={foundedOn}
            onChange={(e) =>
              setFoundedOn(e.target.value)
            }
            className="w-full h-[45px] border border-[#DDDDDD] rounded-[6px] px-4 outline-none"
          />

          {/* LOGO */}
          <input
            type="text"
            placeholder="Logo URL"
            value={logo}
            onChange={(e) =>
              setLogo(e.target.value)
            }
            className="w-full h-[45px] border border-[#DDDDDD] rounded-[6px] px-4 outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleAddCompany}
            className="w-full h-[45px] rounded-[6px] bg-gradient-to-b from-[#C229FF] to-[#5C28FF] text-white font-medium"
          >
            Save Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;