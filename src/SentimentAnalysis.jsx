import React, { useState } from "react";
import axios from "axios";
import SentimentChart from "./components/SentimentChart"; // 引入圖表元件

function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [attackType, setAttackType] = useState("none");
  const [nlpModel, setNlpModel] = useState("distilbert"); // ✅ 讓使用者選擇 NLP 模型
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [deepDiveMode, setDeepDiveMode] = useState(false);
  const [deepDiveResult, setDeepDiveResult] = useState(null);
  const [originalText, setOriginalText] = useState("");

  const analyzeSentiment = async (deepDive = false) => {
    let inputText = deepDive ? originalText : text; // ✅ 使用原始分析的文字
    if (!inputText.trim()) return; // ❌ 防止空字串發送 API
  
    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze_psychology", {
        user_id: "test_user_123",
        text: inputText,  // ✅ 確保有內容
        history,
        deep_dive: deepDive,
        model: nlpModel,
      });
  
      let processedResult = response.data;
  
      if (nlpModel === "gpt-3.5-turbo" && typeof processedResult.psychology_analysis === "string") {
        try {
          processedResult.psychology_analysis = JSON.parse(
            processedResult.psychology_analysis.replace("```json", "").replace("```", "")
          );
        } catch (error) {
          console.error("❌ 解析 GPT-3.5 Turbo JSON 失敗:", error);
        }
      }
  
      if (deepDive) {
        setDeepDiveResult(response.data.next_question); // ✅ 存入深入探索結果
      } else {
        setResult(processedResult);
        setHistory([...history, inputText]); // ✅ 記錄用戶輸入
        setText(""); // ✅ 清空輸入框
      }
    } catch (error) {
      console.error("❌ 錯誤:", error.response?.data || error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        🧠 Sentiment & Psychology Analysis
      </h2>

      {/* 🔥 選擇 NLP 模型 */}
      <label className="block text-lg font-semibold mb-2">選擇 NLP 模型:</label>
      <select
        value={nlpModel}
        onChange={(e) => setNlpModel(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="distilbert">🤖 DistilBERT (基礎)</option>
        <option value="roberta-large">🚀 RoBERTa-Large (強化情緒分析)</option>
        <option value="bert-base">🌍 BERT (多語言支持)</option>
        <option value="xlm-roberta">🌎 XLM-RoBERTa (跨語言分析)</option>
        <option value="gpt-3.5-turbo">🧠 GPT-3.5 Turbo (深度心理分析)</option>
      </select>

      {/* 🔥 選擇對抗攻擊類型 */}
      <label className="block text-lg font-semibold mb-2">
        選擇對抗攻擊類型:
      </label>
      <select
        value={attackType}
        onChange={(e) => setAttackType(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="none">🚫 無對抗攻擊</option>
        <option value="synonym">🔄 同義詞替換</option>
        <option value="swap">🔀 詞序調換</option>
        <option value="contextual">⚡ 情境變化</option>
      </select>

      {!deepDiveMode ? (
        <div className="flex flex-col space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="請輸入你的想法..."
            className="w-full p-3 border border-gray-500 rounded bg-gray-900 text-white"
          />
          <button
            onClick={() => analyzeSentiment(false)}
            disabled={loading}
            className={`px-5 py-2 rounded font-semibold ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "分析中..." : "分析"}
          </button>
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-400">
          🔍 <span className="font-bold">深入分析模式</span>{" "}
          啟動：探索「為什麼他們這樣對你？」
        </p>
      )}

      {result && (
        <div className="mt-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-400">
              Before Attack (原始文本分析)
            </h3>
            <p className="mt-2 text-white">
              🔹 <b>原始文本:</b> {originalText}
            </p>
            <SentimentChart data={result.psychology_analysis} />
          </div>

          {attackType !== "none" &&
            result.adversarial_test?.adversarial_text && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-bold text-red-400">
                  After Attack (對抗樣本分析)
                </h3>
                <p className="mt-2 text-white">
                  🔻 <b>對抗樣本:</b> {result.adversarial_test.adversarial_text}
                </p>
                <SentimentChart
                  data={result.adversarial_test.adversarial_analysis}
                />
                <h3 className="text-lg font-bold text-blue-400 mt-4">
                  📊 變化顯著的心理指標:
                </h3>
                <ul className="mt-2">
                  {Object.entries(
                    calculateDifference(
                      result.psychology_analysis.psychology_factors,
                      result.adversarial_test.adversarial_analysis
                        .psychology_factors
                    )
                  ).map(([factor, diff]) => (
                    <li key={factor} className="text-white">
                      🔹 {factor}: {diff > 0 ? `⬆️ +${diff}` : `⬇️ ${diff}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}
      {result?.next_question && !deepDiveMode && (
  <button
    onClick={() => {
      setDeepDiveMode(true);  // ✅ 進入深入探索模式
      analyzeSentiment(true); // ✅ 重新請求 GPT，並帶入 `originalText`
    }}
    className="mt-4 px-5 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-700"
  >
    🔥 深入探索這個問題
  </button>
)}
      {deepDiveMode && deepDiveResult && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-green-400">🔍 深入探索結果:</h3>
          <p className="mt-2 text-white">{deepDiveResult}</p>
        </div>
      )}
      {
        /* 🔥 退出探索模式結果 */
        deepDiveMode && (
          <button
            onClick={() => {
              setDeepDiveMode(false);
              setDeepDiveResult(null);
            }}
            className="mt-4 px-5 py-2 rounded font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            退出深入探索模式
          </button>
        )
      }
      {deepDiveMode && deepDiveResult && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-green-400">🔍 深入探索結果:</h3>

          {/* ✅ 顯示 `reason` */}
          <p className="mt-2 text-white">
            <b>🧐 原因：</b> {deepDiveResult.reason}
          </p>

          {/* ✅ 顯示 `impact` */}
          <p className="mt-2 text-white">
            <b>💭 影響：</b> {deepDiveResult.impact}
          </p>

          {/* ✅ 顯示 `advice` */}
          <p className="mt-2 text-white">
            <b>🛠 建議：</b> {deepDiveResult.advice}
          </p>
        </div>
      )}
      {result?.next_question && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-bold text-green-400">
            🧐 下一個探索問題:
          </h3>
          <p className="mt-2 text-white">
            {typeof result.next_question === "string"
              ? result.next_question // ✅ 如果是字符串，直接顯示
              : typeof result.next_question === "object"
              ? JSON.stringify(result.next_question, null, 2) // ✅ 如果是物件，轉為 JSON
              : "無法解析的問題"}
          </p>
        </div>
      )}
      {loading && (
        <p className="mt-4 text-yellow-400">🔄 正在處理你的請求...</p>
      )}
      {result && <p className="mt-4 text-green-400">✅ 分析完成！</p>}
      {deepDiveResult && (
        <p className="mt-4 text-green-400">✅ 深入探索完成！</p>
      )}
    </div>
  );
}

export default SentimentAnalysis;
