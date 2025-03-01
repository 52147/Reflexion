import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SentimentAnalysis from "./SentimentAnalysis";
import AdversarialAttack from "./AdversarialAttack";

function App() {
  return (
    <Router>
      <div className="max-w-3xl mx-auto p-6 bg-gray-700 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">🧠 AI心理分析 & 對抗性攻擊測試</h1>

        {/* 🔗 Tailwind 版的導覽按鈕 */}
        <nav className="flex space-x-4 p-4 bg-gray-800 text-white rounded">
          <Link to="/" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
            🧠 心理分析
          </Link>
          <Link to="/adversarial" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
            🛡️ 對抗攻擊測試
          </Link>
        </nav>

        {/* 📌 設定路由 */}
        <Routes>
          <Route path="/" element={<SentimentAnalysis />} />
          <Route path="/adversarial" element={<AdversarialAttack />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;