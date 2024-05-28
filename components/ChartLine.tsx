import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Chart,
} from "chart.js";
import supabase from "@/utils/supabase";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    pointBorderColor: string;
    fill: boolean;
    tension: number;
  }[];
}

function ChartLine() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Current",
        data: [],
        backgroundColor: "black",
        borderColor: "black",
        pointBorderColor: "black",
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      // Fetch latest 10 data from Supabase
      const { data, error } = await supabase
        .from("trackerdata")
        .select("current")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        throw error;
      }

      // Process data into chart format
      const values: number[] = data.map((item: any) => item.current);

      setChartData((prevData: ChartData) => ({
        ...prevData,
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
      legend: { display: false },
    },
    scales: {
      y: {
        // min: 3,
        // max: 6
      },
    },
  };

  return (
    <>
        <Line width={400} height={150} data={chartData} options={options}></Line>
    </>
  );
}

export default ChartLine;
