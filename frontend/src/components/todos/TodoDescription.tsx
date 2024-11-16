import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";

export default function TodoDescription() {
  return (
    <div>
      <div className="title-section simple-border-color flex w-full items-center justify-between border-b-[1px] pb-2">
        <h1 className="text-xl font-bold">Todo Description</h1>
      </div>

      {/* Todo Title */}
      <h1 className="mb-2 mt-6 text-lg">Shop Grocery Item</h1>

      {/* Todo Description */}
      <p className="text-secondary text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        dolorem maxime quasi illo incidunt provident similique nam nisi?
        Reiciendis, aspernatur?...
      </p>

      <div className="meta w-full">
        <table className="text-secondary mt-4 w-full table-auto">
          <tbody>
            {/* Todo Status */}
            <tr>
              <td className="flex items-center gap-2 py-2">
                <FaBarsProgress /> Status
              </td>
              <td className="dark:text-white">Pending</td>
            </tr>
            {/* Todo Date */}
            <tr>
              <td className="flex items-center gap-2 py-2">
                <FaCalendarAlt /> Date
              </td>
              <td className="dark:text-white">12th August 2021</td>
            </tr>

            {/* Todo Time */}
            <tr>
              <td className="flex items-center gap-2 py-2">
                <FaClock /> Time py-2
              </td>
              <td className="dark:text-white">12:00 PM</td>
            </tr>

            {/* Created At */}
            <tr>
              <td className="flex items-center gap-2 py-2">
                <FaCalendarAlt /> Created At
              </td>
              <td className="dark:text-white">12th August 2021</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
