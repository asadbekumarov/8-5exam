"use client";
import { baseUrl } from "../../components/utils/url";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { useState, FormEvent } from "react";
interface FormElements extends HTMLFormControlsCollection {
  school: HTMLInputElement;
  degree: HTMLInputElement;
  fieldOfStudy: HTMLInputElement;
  fromDate: HTMLInputElement;
  toDate: HTMLInputElement;
  des: HTMLInputElement;
}
interface FormElement extends HTMLFormElement {
  elements: FormElements;
}

function Edu() {
  const [currentJob, setCurrentJob] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<FormElement>) => {
    e.preventDefault();

    const form = e.currentTarget.elements;

    try {
      const response = await axios.put(`${baseUrl}/profile/education`, {
        school: form.school.value,
        degree: form.degree.value,
        fieldOfStudy: form.fieldOfStudy.value,
        from: form.fromDate.value,
        to: currentJob ? null : form.toDate.value,
        description: form.des.value,
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
          Add Your Education
        </h1>
        <div className="flex items-center gap-2">
          <IoPerson className="text-2xl" />
          <p className="text-xl">
            Add any school or bootcamp that you have attended
          </p>
        </div>
        <form
          className="w-[800px] flex flex-col items-start gap-6"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-start w-full">
            <input
              name="school"
              className="w-full border py-2 px-4"
              placeholder="* School or Bootcamp"
              type="text"
              required
            />
            <p className="text-xs leading-5">
              Give us an idea of where you studied
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="degree"
              className="w-full border py-2 px-4"
              placeholder="* Degree or Certificate"
              type="text"
              required
            />
            <p className="text-xs leading-5">
              Example: Bachelor's in Computer Science
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="fieldOfStudy"
              className="w-full border py-2 px-4"
              placeholder="Field of Study"
              type="text"
            />
            <p className="text-xs leading-5">Example: Software Engineering</p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-base font-bold leading-6">From Date</p>
            <input
              name="fromDate"
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
              <p> Currently Studying</p>
            </span>
            {!currentJob && (
              <>
                <p className="text-base font-bold leading-6">To Date</p>
                <input
                  name="toDate"
                  className="w-full border py-2 px-4"
                  type="date"
                />
              </>
            )}
          </div>
          <div className="flex flex-col items-start w-full">
            <input
              name="des"
              className="w-full border pt-2 pb-7 px-4"
              placeholder="Program Description"
              type="text"
            />
            <p className="text-xs leading-5">
              Tell us a little about your studies
            </p>
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
}

export default Edu;
