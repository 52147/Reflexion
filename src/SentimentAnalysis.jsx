import React, { useState, useEffect } from "react";
import axios from "axios";
import SentimentChart from "./components/SentimentChart"; // 引入圖表元件

function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [attackType, setAttackType] = useState("none");
  const [nlpModel, setNlpModel] = useState("distilbert");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [deepDiveMode, setDeepDiveMode] = useState(false);
  const [deepDiveResult, setDeepDiveResult] = useState(null);
  const [originalText, setOriginalText] = useState("");

  // ✅ 當 originalText 變更時，觸發 deep dive 分析
  useEffect(() => {
    if (deepDiveMode && originalText) {
      analyzeSentiment(true);
    }
  }, [deepDiveMode, originalText]);

  const analyzeSentiment = async (deepDive = false) => {
    let inputText = deepDive ? originalText : text;
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/analyze_psychology",
        {
          user_id: "test_user_123",
          text: inputText,
          history,
          deep_dive: deepDive,
          model: nlpModel,
        }
      );

      let processedResult = response.data;

      if (
        nlpModel === "gpt-3.5-turbo" &&
        typeof processedResult.psychology_analysis === "string"
      ) {
        try {
          processedResult.psychology_analysis = JSON.parse(
            processedResult.psychology_analysis
              .replace("```json", "")
              .replace("```", "")
          );
        } catch (error) {
          console.error("❌ 解析 GPT-3.5 Turbo JSON 失敗:", error);
        }
      }

      if (deepDive) {
        setDeepDiveResult(response.data.next_question);
      } else {
        setResult(processedResult);
        setHistory([...history, inputText]);
        setText("");
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

      {/* 輸入框 */}
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

      {/* ✅ Before Attack */}
 {/* ✅ Before Attack - 顯示心理分析結果 */}
 {result?.psychology_analysis && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-400">📊 Before Attack (原始文本分析)</h3>
          <p className="text-white">🔹 <b>原始文本:</b> {originalText}</p>
          
          <SentimentChart data={result.psychology_analysis} />

          {/* ✅ 顯示心理分析詳細數據 */}
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold text-blue-400">🧠 詳細心理分析</h3>
            <p className="text-white">🧠 <b>心理狀態:</b> {result.psychology_analysis.state}</p>
            <p className="text-white">🔹 <b>信心分數:</b> {result.psychology_analysis.confidence}%</p>

            {/* 🔍 顯示情緒分數 */}
            <h3 className="text-lg font-bold text-blue-400 mt-4">🎭 情緒分析</h3>
            {result.psychology_analysis.emotion_scores &&
              Object.entries(result.psychology_analysis.emotion_scores).map(([key, value]) => (
                <p key={key} className="text-white">🔹 {key}: {value.toFixed(1)}%</p>
              ))}

            {/* 🔍 顯示心理因素
            <h3 className="text-lg font-bold text-blue-400 mt-4">🧠 心理因素</h3>
            {result.psychology_analysis.psychology_factors &&
              Object.entries(result.psychology_analysis.psychology_factors).map(([key, value]) => (
                <p key={key} className="text-white">🔹 {key}: {value.toFixed(1)}%</p>
              ))} */}
          </div>
        </div>
      )}

      {/* ✅ After Attack */}
      {result?.adversarial_text && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-red-400">
            🔥 After Attack (對抗樣本分析)
          </h3>
          <p className="mt-2 text-white">
            🔻 <b>對抗樣本:</b> {result.adversarial_text}
          </p>
          <SentimentChart data={result.adversarial_analysis} />
            
        </div>
      )}

      {/* ✅ 顯示下一步探索問題 */}
      {result?.next_question && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-green-400">
            🧐 下一步探索問題:
          </h3>
          <p className="text-white">
            {typeof result.next_question === "string"
              ? result.next_question
              : (() => {
                  if (result.next_question.raw_content) {
                    try {
                      let parsedContent = JSON.parse(
                        result.next_question.raw_content
                      );
                      return (
                        <div>
                          <p>
                            🧐 原因: {parsedContent.reason || "⚠️ 無法解析原因"}
                          </p>
                          <p>
                            💭 影響: {parsedContent.impact || "⚠️ 無法解析影響"}
                          </p>
                          <ul>
                            {parsedContent.advice?.map((advice, index) => (
                              <li key={index}>🛠 {advice}</li>
                            ))}
                          </ul>
                        </div>
                      );
                    } catch (error) {
                      console.error("❌ 解析 `raw_content` 失敗:", error);
                      return <p>⚠️ `raw_content` 無法解析</p>;
                    }
                  } else {
                    return (
                      <div>
                        <p>🧐 原因: {result.next_question.reason}</p>
                        <p>💭 影響: {result.next_question.impact}</p>
                        <ul>
                          {result.next_question.advice?.map((advice, index) => (
                            <li key={index}>🛠 {advice}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                })()}
          </p>
        </div>
      )}
      {/* 🔍 深度探索模式 */}
      <button
        onClick={() => {
          setDeepDiveMode((prev) => {
            const newMode = !prev;
            if (newMode) {
              setOriginalText(text); // 先設置 text
            } else {
              setDeepDiveResult(null); // 停止探索時清空結果
            }
            return newMode;
          });
        }}
        className={`mt-4 px-5 py-2 rounded font-semibold ${
          deepDiveMode
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {deepDiveMode ? "🔍 停止深度探索" : "🔍 啟動深度探索"}
      </button>
      {/* ✅ 顯示深入探索結果 */}
      {deepDiveMode && deepDiveResult && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-green-400">🔍 深入探索結果</h3>
          {typeof deepDiveResult === "string" ? (
            <p className="text-white">💬 {deepDiveResult}</p>
          ) : deepDiveResult.raw_content ? (
            (() => {
              try {
                let parsedContent = JSON.parse(deepDiveResult.raw_content);
                return (
                  <div>
                    <p className="text-white">
                      🧐 原因: {parsedContent.reason || "⚠️ 無法解析原因"}
                    </p>
                    <p className="text-white">
                      💭 影響: {parsedContent.impact || "⚠️ 無法解析影響"}
                    </p>
                    <ul className="list-disc pl-5 text-white">
                      {parsedContent.advice?.map((advice, index) => (
                        <li key={index}>🛠 {advice}</li>
                      )) || <li>⚠️ 無可用建議</li>}
                    </ul>
                  </div>
                );
              } catch (error) {
                console.error("❌ 解析 `raw_content` 失敗:", error);
                return <p className="text-white">⚠️ `raw_content` 無法解析</p>;
              }
            })()
          ) : (
            <div>
              <p className="text-white">
                🧐 原因: {deepDiveResult.reason || "⚠️ 無法解析"}
              </p>
              <p className="text-white">
                💭 影響: {deepDiveResult.impact || "⚠️ 無法解析"}
              </p>
              <ul className="list-disc pl-5 text-white">
                {deepDiveResult.advice?.map((advice, index) => (
                  <li key={index}>🛠 {advice}</li>
                )) || <li>⚠️ 無可用建議</li>}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
