"use client";
import supabase from "@/utils/supabase";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import LineChart from "@/components/LineChart";
import ChartLine from "@/components/ChartLine";

export default function MainSide() {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    const { data: fetchedData } = await supabase
      .from("trackerdata")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    setData(fetchedData || []);
  }

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleExportCSV = async () => {
    try {
      const { data: fetchedData } = await supabase
        .from("trackerdata")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchedData && fetchedData.length > 0) {
        // Membuat header kolom
        const headers = ["id", "created_at", "ldr1", "ldr2", "ldr3", "ldr4"];
        // Menyusun data CSV
        const csv =
          headers.join(",") +
          "\n" +
          fetchedData
            .map((item) => {
              return Object.values(item).join(",");
            })
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Data Record.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      console.error("Error exporting CSV:", error.message);
    }
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <section className="">
            <div className="flex flex-col">
              <div className="lg:grid lg:grid-cols-4 gap-4 m-4">
                <div className="col-span-2">
                  {/* Current Card */}
                  <div className="flex flex-col p-6 w-full h-[420px] mx-auto text-center shadow border rounded-xl xl:p-4 mb-4 lg:mb-0">
                    <div className="w-full bg-slate-500 h-auto rounded-xl mb-4">
                      <Image
                        className="h-[20px] w-full rounded-xl object-cover"
                        src={
                          "https://res.cloudinary.com/dgnmqbglc/image/upload/v1711400631/IoT%20Monitoring/14579711_5488082_s0m994.jpg"
                        }
                        alt={"coming-soon"}
                        width={300}
                        height={200}
                        priority={true}
                        sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-14">
                      <div className="flex flex-col items-start">
                        <p className="text-base font-semibold text-left">
                          Derajat & Arah Posisi Panel Surya
                        </p>
                        <p className="text-sm text-justify text-gray-400 font-light mb-2">
                          In this section is to read the degree of position of
                          the servo both horizontally and vertically.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-[10px] text-gray-400 tracking-widest">
                          {item.created_at}
                        </p>
                      </div>
                    </div>
                    <div className="border-t-[1.5px] border-gray-200 my-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Arus dari Solar Panel{" "}
                          <span className="text-black text-6xl font-semibold mt-2">
                            {item.current} <span className="text-sm">mA</span>
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Tegangan dari Solar Panel{" "}
                          <span className="text-black text-6xl font-semibold mt-2">
                            {item.loadvoltage} <span className="text-sm">Volt</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  {/* Current Card */}
                  <div className="flex flex-col p-6 w-full h-[420px] mx-auto text-center shadow border rounded-xl xl:p-4 mb-4 sm:mb-0">
                    <div className="w-full bg-slate-500 h-auto rounded-xl mb-4">
                      <Image
                        className="h-[20px] w-full rounded-xl object-cover"
                        src={
                          "https://res.cloudinary.com/dgnmqbglc/image/upload/v1711400631/IoT%20Monitoring/14579711_5488082_s0m994.jpg"
                        }
                        alt={"coming-soon"}
                        width={300}
                        height={200}
                        priority={true}
                        sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                      />
                    </div>
                    <div className="">
                      <div className="">
                        {/* Untuk line chart */}
                        <LineChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:grid lg:grid-cols-3 gap-4 mx-4">
                {/* LDR Card */}
                <div className="flex flex-col w-full p-6 mx-auto text-center shadow text-gray-900 bg-white border rounded-xl border-gray-100 xl:p-4 mb-4 lg:mb-0">
                  <div className="w-full bg-slate-500 h-auto rounded-xl mb-4">
                    <Image
                      className="h-[20px] w-full rounded-xl object-cover"
                      src={
                        "https://res.cloudinary.com/dgnmqbglc/image/upload/v1711400631/IoT%20Monitoring/14579711_5488082_s0m994.jpg"
                      }
                      alt={"coming-soon"}
                      width={300}
                      height={200}
                      priority={true}
                      sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 mb-14">
                    <div className="flex flex-col items-start">
                      <p className="text-base font-semibold text-left">
                        Derajat & Arah Posisi Panel Surya
                      </p>
                      <p className="text-sm text-justify text-gray-400 font-light mb-2">
                        In this section is to read the degree of position of the
                        servo both horizontally and vertically.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[10px] text-gray-400 tracking-widest">
                        {item.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-gray-200 my-4"></div>
                  <div className="flex justify-center items-center">
                    <div className="grid grid-cols-4 gap-10">
                      <div className="flex justify-start items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Top Left{" "}
                          <span className="text-black font-semibold mt-2">
                            {item.topleft}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-start items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Top Right{" "}
                          <span className="text-black font-semibold mt-2">
                            {item.topright}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-end items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Bottom Left{" "}
                          <span className="text-black font-semibold mt-2">
                            {item.bottomleft}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-end items-center">
                        <p className="flex flex-col text-xs text-gray-400">
                          Bottom Right{" "}
                          <span className="text-black font-semibold mt-2">
                            {item.bottomright}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Servo Card */}
                <div className="flex flex-col w-full p-6 mx-auto text-center shadow text-gray-900 bg-white border rounded-xl border-gray-100 xl:p-4 mb-4 lg:mb-0">
                  <div className="w-full bg-slate-500 h-auto rounded-xl mb-4">
                    <Image
                      className="h-[20px] w-full rounded-xl object-cover"
                      src={
                        "https://res.cloudinary.com/dgnmqbglc/image/upload/v1711400631/IoT%20Monitoring/14579711_5488082_s0m994.jpg"
                      }
                      alt={"coming-soon"}
                      width={300}
                      height={200}
                      priority={true}
                      sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 mb-14">
                    <div className="flex flex-col items-start">
                      <p className="text-base font-semibold text-left">
                        Derajat & Arah Posisi Panel Surya
                      </p>
                      <p className="text-sm text-justify text-gray-400 font-light mb-2">
                        In this section is to read the degree of position of the
                        servo both horizontally and vertically.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[10px] text-gray-400 tracking-widest">
                        {item.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-gray-200 my-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center items-center gap-16">
                      <p className="flex flex-col text-xs text-gray-400">
                        Derajat Servo{" "}
                        <span className="text-black font-semibold mt-2">
                          {item.degrees}
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-16">
                      <p className="flex flex-col text-xs text-gray-400">
                        Arah Servo{" "}
                        <span className="text-black font-semibold mt-2">
                          {item.position}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Temperature Card */}
                <div className="flex flex-col w-full p-6 mx-auto text-center shadow text-gray-900 bg-white border rounded-xl border-gray-100 xl:p-4 mb-4 lg:mb-0">
                  <div className="w-full bg-slate-500 h-auto rounded-xl mb-4">
                    <Image
                      className="h-[20px] w-full rounded-xl object-cover"
                      src={
                        "https://res.cloudinary.com/dgnmqbglc/image/upload/v1711400631/IoT%20Monitoring/14579711_5488082_s0m994.jpg"
                      }
                      alt={"coming-soon"}
                      width={300}
                      height={200}
                      priority={true}
                      sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 80vw,
            (max-width: 1024px) 60vw,
            50vw
            "
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 mb-14">
                    <div className="flex flex-col items-start">
                      <p className="text-base font-semibold text-left">
                        Suhu Pusat Kontrol
                      </p>
                      <p className="text-sm text-justify text-gray-400 font-light mb-2">
                        In this section is to read the cardinal directions of
                        the solar panel using sensors.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[10px] text-gray-400 tracking-widest">
                        {item.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="border-t-[1.5px] border-gray-200 my-4"></div>
                  <div className="grid grid-cols-1">
                    <div className="flex justify-center items-center gap-16">
                      <p className="flex flex-col text-xs text-gray-400">
                        Suhu Pusat Kontrol{" "}
                        <span className="text-black font-semibold mt-2">
                          {item.temperature}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
