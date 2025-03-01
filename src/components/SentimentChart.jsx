import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";

const SentimentChart = ({ data }) => {
  if (!data || !data.psychology_factors) {
    return <p className="text-gray-500 text-center">No data available</p>;
  }

  const chartData = Object.entries(data.psychology_factors).map(([key, value]) => ({
    category: key,
    score: Math.round(value)  // 确保数值是整数
  }));

  return (
    <div className="text-center bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">🧠 Psychology Analysis</h2>
      <h3 className="text-lg text-orange-600 mt-2 mb-4">
        Detected Emotion: <span className="font-bold">{data.state}</span> (Confidence: <span className="font-bold">{data.confidence}%</span>)
      </h3>

      <div className="flex justify-center">
        <RadarChart cx={200} cy={150} outerRadius={120} width={400} height={300} data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" className="text-gray-700" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar name="Psychology Analysis" dataKey="score" stroke="#FF4500" fill="#FF4500" fillOpacity={0.6} />
        </RadarChart>
      </div>
    </div>
  );
};

export default SentimentChart;