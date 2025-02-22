"use client";
import { IoPerson } from "react-icons/io5";
import { useState, FormEvent } from "react";
import axios from "axios";
import { baseUrl } from "@/components/utils/url";
const Addan = () => {
  const [formData, setFormData] = useState({
    job: "",
    company: "",
    location: "",
    skills: "",
    fromDate: "",
    toDate: "",
    description: "",
  });
  const [currentJob, setCurrentJob] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}profile/experience`, {
        ...formData,
        toDate: currentJob ? null : formData.toDate,
      });
      console.log("Success:", response.data);
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <div className="flex justify-center flex-col items-start gap-5 mt-4">
        <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">
          Add Experience
        </h1>
        <div className="flex items-center gap-2">
          <IoPerson className="text-2xl" />
          <p className="text-xl">
            Add any developer/programming positions that you have had in the
            past
          </p>
        </div>
        <form
          className="w-[800px] flex flex-col items-start gap-6"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start w-full">
            <input
              name="job"
              value={formData.job}
              onChange={onChange}
              className="w-full border py-2 px-4"
              placeholder="Job Title"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="company"
              value={formData.company}
              onChange={onChange}
              className="w-full border py-2 px-4"
              placeholder="Company"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="location"
              value={formData.location}
              onChange={onChange}
              className="w-full border py-2 px-4"
              placeholder="Location"
              type="text"
            />
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-base font-bold leading-6">From Date</p>
            <input
              name="fromDate"
              value={formData.fromDate}
              onChange={onChange}
              className="w-full border py-2 px-4"
              type="date"
              required
            />
            <span className="flex items-center py-7 gap-2">
              <input
                type="checkbox"
                checked={currentJob}
                onChange={() => setCurrentJob(!currentJob)}
              />
              <p> Current Job</p>
            </span>
            {!currentJob && (
              <>
                <p className="text-base font-bold leading-6">To Date</p>
                <input
                  name="toDate"
                  value={formData.toDate}
                  onChange={onChange}
                  className="w-full border py-2 px-4"
                  type="date"
                />
              </>
            )}
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="description"
              value={formData.description}
              onChange={onChange}
              className="w-full border pt-2 pb-7 px-4"
              placeholder="Job Description"
              type="text"
            />
          </div>
          <div className="flex items-center gap-8 pt-5">
            <button type="submit" className="bg-[#17a2b8] text-white py-2 px-4">
              Submit
            </button>
            <button type="button">Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addan;
