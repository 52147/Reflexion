import React, { useState } from "react";
import axios from "axios";

function AdversarialAttack() {
  const [text, setText] = useState("");
  const [attackType, setAttackType] = useState("synonym"); // 🔥 Allow user to choose attack type
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAttackTest = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/adversarial_attack", {
        text,
        attack_type: attackType,
      });

      setResult(response.data);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error);
    }

    setLoading(false);
  };

  const highlightSignificantChanges = (original, adversarial) => {
    const changes = {};
    Object.keys(original).forEach((factor) => {
      const difference = adversarial[factor] - original[factor];
      if (Math.abs(difference) > 5) {
        changes[factor] = difference;
      }
    });
    return changes;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-700 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        🛡️ 對抗式攻擊測試
      </h2>

      {/* 🔥 Attack Type Selection */}
      <label className="block text-white text-sm mb-2">選擇對抗攻擊類型:</label>
      <select
        value={attackType}
        onChange={(e) => setAttackType(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
      >
        <option value="synonym">同義詞替換</option>
        <option value="swap">詞序調換</option>
        <option value="contextual">語境增強</option>
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入你要測試的文本..."
        className="w-full p-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900 text-white"
      />

      <button
        onClick={handleAttackTest}
        disabled={loading}
        className={`mt-4 px-5 py-2 rounded font-semibold ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
        }`}
      >
        {loading ? "測試中..." : "測試 AI 穩健性"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-yellow-400">原始文本分析：</h3>
          <p className="mt-2">🔹 {result.original_text}</p>
          <pre className="mt-2 bg-gray-700 p-3 rounded text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(result.original_analysis, null, 2)}
          </pre>

          <h3 className="text-lg font-bold text-red-400 mt-4">對抗樣本分析：</h3>
          <p className="mt-2">🔻 {result.adversarial_text}</p>
          <pre className="mt-2 bg-gray-700 p-3 rounded text-sm whitespace-pre-wrap break-words">
            {JSON.stringify(result.adversarial_analysis, null, 2)}
          </pre>

          {/* 🔥 Highlight Significant Psychological Factor Changes */}
          <h3 className="text-lg font-bold text-blue-400 mt-4">🔍 變化顯著的心理因素：</h3>
          <ul className="mt-2 list-disc list-inside text-sm">
            {Object.entries(
              highlightSignificantChanges(
                result.original_analysis.psychology_factors,
                result.adversarial_analysis.psychology_factors
              )
            ).map(([factor, change]) => (
              <li key={factor} className="text-white">
                {factor}: <span className="text-red-400">{change.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdversarialAttack;