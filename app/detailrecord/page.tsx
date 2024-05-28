"use client";
import supabase from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Detail() {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    const { data: fetchedData } = await supabase
      .from("trackerdata")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    setData(fetchedData || []);
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="p-6">
          <Link href={"mainside"} className="mb-4 ml-6 py-2 px-6 rounded-lg text-white font-medium text-sm bg-sky-950">Back</Link>
        <div className="block w-full p-6 bg-white rounded-lg">
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Datetime
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Top Left
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Top Right
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bottom Left
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bottom Right
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-6 py-4">{item.created_at}</td>
                    <td className="px-6 py-4">{item.ldrPin1}</td>
                    <td className="px-6 py-4">{item.ldrPin2}</td>
                    <td className="px-6 py-4">{item.ldrPin3}</td>
                    <td className="px-6 py-4">{item.ldrPin4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
