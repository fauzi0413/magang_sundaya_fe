import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EChartsSLA = ({ inputData }) => {
  const chartRef = useRef(null);
<<<<<<< HEAD
  let chartInstance = null;

  useEffect(() => {
    // Fungsi untuk memproses input data
    const processData = (data) => {
      const xData = data.map((item) => item.date); // Sumbu X (tanggal)
      const yData = data.map((item) => item.value); // Data nilai
      return { xData, yData };
    };

    // Proses inputData
    const { xData, yData } = processData(inputData);

    const resizeChart = () => {
      if (chartInstance) {
        chartInstance.resize();
      }
    };

    // Initialize ECharts instance
    chartInstance = echarts.init(chartRef.current);

    // Specify chart configuration
    const options = {
      title: {
        text: "SLA Line Chart",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Value"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xData, // Data untuk sumbu X
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Value",
          type: "line",
          data: yData, // Data untuk seri
        },
      ],
    };

    // Set options
    chartInstance.setOption(options);

    // Resize chart on window resize
    window.addEventListener("resize", resizeChart);

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeChart);
      chartInstance.dispose();
    };
  }, [inputData]); // Tambahkan inputData sebagai dependensi untuk merender ulang jika data berubah

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

export default EChartsSLA;
=======
  const containerRef = useRef(null);

  useEffect(() => {
    const processData = (data) => {
      const xData = data.map((item) => item.date);
      const yData = data.map((item) => item.value);
      return { xData, yData };
    };

    const { xData, yData } = processData(inputData);

    const chartInstance = echarts.init(chartRef.current);
    const options = {
      title: { text: "" },
      tooltip: { trigger: "axis" },
      legend: { data: ["Value"] },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      toolbox: { feature: { saveAsImage: {} } },
      xAxis: { type: "category", boundaryGap: false, data: xData },
      yAxis: { type: "value" },
      series: [
        { name: "Value", type: "line", data: yData },
      ],
    };
    chartInstance.setOption(options);

    // Fungsi untuk menyesuaikan ukuran grafik dengan container
    const resizeChart = () => {
      if (containerRef.current && chartInstance) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        chartInstance.resize({ width: containerWidth, height: containerHeight });
      }
    };

    // Menggunakan ResizeObserver untuk memantau perubahan ukuran container
    const resizeObserver = new ResizeObserver(resizeChart);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Membersihkan observer dan chart instance saat komponen di-unmount
    return () => {
      resizeObserver.disconnect();
      chartInstance.dispose();
    };
  }, [inputData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "300px",
        padding: "20px", // Sesuaikan padding sesuai kebutuhan
        boxSizing: "border-box", // Pastikan padding termasuk dalam perhitungan ukuran
      }}
    >
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default EChartsSLA;
>>>>>>> 45558cc (initial commit)
