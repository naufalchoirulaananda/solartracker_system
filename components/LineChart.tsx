"use client"
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import supabase from "@/utils/supabase";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
  Interaction,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | ((context: any) => string);
    borderColor: string;
    pointBorderColor: string;
    fill: boolean;
    tension: number;
    borderWidth: number;
    pointBorderWidth: number;
    pointBackgroundColor: string;
  }[];
}

function ChartLine() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "rgba(28, 100, 242, 0.5)",
        borderWidth: 3,
        pointBorderColor: "rgba(28, 100, 242, 0.5)",
        pointBackgroundColor: "rgba(28, 100, 242, 255)",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(28, 100, 242, 0.5)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        },
      },
    ],
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const { data, error } = await supabase
        .from("trackerdata")
        .select("current, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }

      const values: number[] = data.map((item: any) => item.current);
      const labels: string[] = data.map((item: any) => item.created_at);

      setChartData((prevData: ChartData) => ({
        ...prevData,
        labels: labels.reverse(), // Reverse labels to maintain order
        datasets: [
          {
            ...prevData.datasets[0],
            data: values.reverse(), // Reverse data to maintain order
          },
        ],
      }));
    } catch (error: any) {
      console.error("Error fetching chart data:", error.message);
    }
  };

  useEffect(() => {
    fetchChartData();

    const intervalId = setInterval(fetchChartData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        intersect: false,
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: true,
          font: {
            size: 10,
            weight: "bold" as const,
          },
        },
        min: 0,
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: true,
          font: {
            size: 6,
            weight: "bold" as const,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Line width={400} height={200} data={chartData} options={options}></Line>
    </>
  );
}

export default ChartLine;
