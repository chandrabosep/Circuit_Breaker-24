import { CalendarDays, Check, Landmark, ListChecks, Timer } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";

export default function EmployerReview({
  Title,
  Description,
  RSubmit,
  FSubmit,
  Budget,
  tasks,
}: any) {
  return (
    <>
      <div className="w-11/12 m-auto flex flex-col gap-6">
        <p className="text-2xl font-bold text-dark-800">{Title ? Title : "Job Title"}</p>
        <p>{Description ? Description : "Job Description"}</p>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 items-center">
            <ListChecks className="w-6 h-6" />
            <h3 className="text-2xl font-semibold text-green-500">
              {tasks &&tasks.split(",").length.toString()} Tasks
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {tasks &&
              tasks.split(",").map((task: any) => (
                <div className="flex gap-2 items-center text-green-500">
                  <Check
                    strokeWidth={2.5}
                    className="w-6 h-6 bg-grad-magic rounded-full p-1"
                  />
                  <p>{task}</p>
                </div>
              ))}
          </div>
          <div className="w-full flex gap-6 text-green-500">
            <div className="w-1/2 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <CalendarDays className="w-6 h-6" />
                Job Delivery Date
              </h2>
              <div className="p-2 py-4 text-center bg-[#ccffa298] rounded-2xl">
                <p className="text-2xl">{RSubmit ? RSubmit : "N/A"}</p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Timer className="w-6 h-6" />
                Max Review Date
              </h2>
              <div className="p-2 py-4 text-center bg-[#ccffa298] rounded-2xl">
                <p className="text-2xl">{FSubmit ? FSubmit : "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
