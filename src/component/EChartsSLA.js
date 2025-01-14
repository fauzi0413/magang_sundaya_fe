import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EChartsSLA = ({ inputData }) => {
  const chartRef = useRef(null);
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
