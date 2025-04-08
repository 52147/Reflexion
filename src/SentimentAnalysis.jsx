// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SentimentChart from "./components/SentimentChart"; // Import the chart component

// function SentimentAnalysis() {
//   const [text, setText] = useState("");
//   const [attackType, setAttackType] = useState("none");
//   const [nlpModel, setNlpModel] = useState("distilbert");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [deepDiveMode, setDeepDiveMode] = useState(false);
//   const [deepDiveResult, setDeepDiveResult] = useState(null);
//   const [originalText, setOriginalText] = useState("");

//   // ✅ When originalText changes, trigger deep dive analysis
//   useEffect(() => {
//     if (deepDiveMode && originalText) {
//       analyzeSentiment(true);
//     }
//   }, [deepDiveMode, originalText]);

//   const analyzeSentiment = async (deepDive = false) => {
//     let inputText = deepDive ? originalText : text;
//     if (!inputText.trim()) return;

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/analyze_psychology",
//         {
//           user_id: "test_user_123",
//           text: inputText,
//           history,
//           deep_dive: deepDive,
//           model: nlpModel,
//         }
//       );

//       let processedResult = response.data;

//       if (
//         nlpModel === "gpt-3.5-turbo" &&
//         typeof processedResult.psychology_analysis === "string"
//       ) {
//         try {
//           processedResult.psychology_analysis = JSON.parse(
//             processedResult.psychology_analysis
//               .replace("```json", "")
//               .replace("```", "")
//           );
//         } catch (error) {
//           console.error("❌ Error parsing GPT-3.5 Turbo JSON:", error);
//         }
//       }

//       if (deepDive) {
//         setDeepDiveResult(response.data.next_question);
//       } else {
//         setResult(processedResult);
//         setHistory([...history, inputText]);
//         setText("");
//       }
//     } catch (error) {
//       console.error("❌ Error:", error.response?.data || error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-center mb-4">
//         🧠 Sentiment & Psychology Analysis
//       </h2>

//       {/* 🔥 Choose NLP Model */}
//       <label className="block text-lg font-semibold mb-2">Choose NLP Model:</label>
//       <select
//         value={nlpModel}
//         onChange={(e) => setNlpModel(e.target.value)}
//         className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
//       >
//         <option value="distilbert">🤖 DistilBERT (Basic)</option>
//         <option value="roberta-large">🚀 RoBERTa-Large (Enhanced Sentiment Analysis)</option>
//         <option value="bert-base">🌍 BERT (Multilingual Support)</option>
//         <option value="xlm-roberta">🌎 XLM-RoBERTa (Cross-language Analysis)</option>
//         <option value="gpt-3.5-turbo">🧠 GPT-3.5 Turbo (Deep Psychological Analysis)</option>
//       </select>

//       {/* Text Input */}
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Please enter your thoughts..."
//         className="w-full p-3 border border-gray-500 rounded bg-gray-900 text-white"
//       />
//       <button
//         onClick={() => analyzeSentiment(false)}
//         disabled={loading}
//         className={`px-5 py-2 rounded font-semibold ${
//           loading
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700"
//         }`}
//       >
//         {loading ? "Analyzing..." : "Analyze"}
//       </button>

//       {/* ✅ Before Attack - Display Psychological Analysis Results */}
//       {result?.psychology_analysis && (
//         <div className="mt-6 p-4 bg-gray-700 rounded-lg">
//           <h3 className="text-lg font-bold text-yellow-400">
//             📊 Before Attack (Original Text Analysis)
//           </h3>
//           <p className="text-white">
//             🔹 <b>Original Text:</b> {originalText}
//           </p>
          
//           <SentimentChart data={result.psychology_analysis} />

//           {/* ✅ Display Detailed Psychological Analysis Data */}
//           <div className="mt-4 p-4 bg-gray-800 rounded-lg">
//             <h3 className="text-lg font-bold text-blue-400">🧠 Detailed Psychological Analysis</h3>
//             <p className="text-white">
//               🧠 <b>Psychological State:</b> {result.psychology_analysis.state}
//             </p>
//             <p className="text-white">
//               🔹 <b>Confidence Score:</b> {result.psychology_analysis.confidence}%
//             </p>

//             {/* 🔍 Display Emotion Scores */}
//             <h3 className="text-lg font-bold text-blue-400 mt-4">🎭 Emotion Analysis</h3>
//             {result.psychology_analysis.emotion_scores &&
//               Object.entries(result.psychology_analysis.emotion_scores).map(([key, value]) => (
//                 <p key={key} className="text-white">
//                   🔹 {key}: {value.toFixed(1)}%
//                 </p>
//               ))}

//             {/* 🔍 Optionally, display psychological factors 
//             <h3 className="text-lg font-bold text-blue-400 mt-4">🧠 Psychological Factors</h3>
//             {result.psychology_analysis.psychology_factors &&
//               Object.entries(result.psychology_analysis.psychology_factors).map(([key, value]) => (
//                 <p key={key} className="text-white">
//                   🔹 {key}: {value.toFixed(1)}%
//                 </p>
//               ))} */}
//           </div>
//         </div>
//       )}

//       {/* ✅ After Attack - Display Adversarial Sample Analysis */}
//       {result?.adversarial_text && (
//         <div className="mt-6 p-4 bg-gray-700 rounded-lg">
//           <h3 className="text-lg font-bold text-red-400">
//             🔥 After Attack (Adversarial Sample Analysis)
//           </h3>
//           <p className="mt-2 text-white">
//             🔻 <b>Adversarial Sample:</b> {result.adversarial_text}
//           </p>
//           <SentimentChart data={result.adversarial_analysis} />
//         </div>
//       )}

//       {/* ✅ Display Next Exploration Question */}
//       {result?.next_question && (
//         <div className="mt-6 p-4 bg-gray-700 rounded-lg">
//           <h3 className="text-lg font-bold text-green-400">
//             🧐 Next Exploration Question:
//           </h3>
//           <p className="text-white">
//             {typeof result.next_question === "string"
//               ? result.next_question
//               : (() => {
//                   if (result.next_question.raw_content) {
//                     try {
//                       let parsedContent = JSON.parse(
//                         result.next_question.raw_content
//                       );
//                       return (
//                         <div>
//                           <p>
//                             🧐 Reason: {parsedContent.reason || "⚠️ Unable to parse reason"}
//                           </p>
//                           <p>
//                             💭 Impact: {parsedContent.impact || "⚠️ Unable to parse impact"}
//                           </p>
//                           <ul>
//                             {parsedContent.advice?.map((advice, index) => (
//                               <li key={index}>🛠 {advice}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       );
//                     } catch (error) {
//                       console.error("❌ Error parsing `raw_content`:", error);
//                       return <p>⚠️ Unable to parse `raw_content`</p>;
//                     }
//                   } else {
//                     return (
//                       <div>
//                         <p>🧐 Reason: {result.next_question.reason}</p>
//                         <p>💭 Impact: {result.next_question.impact}</p>
//                         <ul>
//                           {result.next_question.advice?.map((advice, index) => (
//                             <li key={index}>🛠 {advice}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     );
//                   }
//                 })()}
//           </p>
//         </div>
//       )}

//       {/* 🔍 Deep Dive Mode */}
//       <button
//         onClick={() => {
//           setDeepDiveMode((prev) => {
//             const newMode = !prev;
//             if (newMode) {
//               setOriginalText(text); // First set text
//             } else {
//               setDeepDiveResult(null); // Clear result when stopping deep dive
//             }
//             return newMode;
//           });
//         }}
//         className={`mt-4 px-5 py-2 rounded font-semibold ${
//           deepDiveMode
//             ? "bg-gray-500 cursor-not-allowed"
//             : "bg-green-600 hover:bg-green-700"
//         }`}
//       >
//         {deepDiveMode ? "🔍 Stop Deep Dive" : "🔍 Activate Deep Dive"}
//       </button>

//       {/* ✅ Display Deep Dive Result */}
//       {deepDiveMode && deepDiveResult && (
//         <div className="mt-6 p-4 bg-gray-700 rounded-lg">
//           <h3 className="text-lg font-bold text-green-400">🔍 Deep Dive Result</h3>
//           {typeof deepDiveResult === "string" ? (
//             <p className="text-white">💬 {deepDiveResult}</p>
//           ) : deepDiveResult.raw_content ? (
//             (() => {
//               try {
//                 let parsedContent = JSON.parse(deepDiveResult.raw_content);
//                 return (
//                   <div>
//                     <p className="text-white">
//                       🧐 Reason: {parsedContent.reason || "⚠️ Unable to parse reason"}
//                     </p>
//                     <p className="text-white">
//                       💭 Impact: {parsedContent.impact || "⚠️ Unable to parse impact"}
//                     </p>
//                     <ul className="list-disc pl-5 text-white">
//                       {parsedContent.advice?.map((advice, index) => (
//                         <li key={index}>🛠 {advice}</li>
//                       )) || <li>⚠️ No advice available</li>}
//                     </ul>
//                   </div>
//                 );
//               } catch (error) {
//                 console.error("❌ Error parsing `raw_content`:", error);
//                 return <p className="text-white">⚠️ Unable to parse `raw_content`</p>;
//               }
//             })()
//           ) : (
//             <div>
//               <p className="text-white">
//                 🧐 Reason: {deepDiveResult.reason || "⚠️ Unable to parse"}
//               </p>
//               <p className="text-white">
//                 💭 Impact: {deepDiveResult.impact || "⚠️ Unable to parse"}
//               </p>
//               <ul className="list-disc pl-5 text-white">
//                 {deepDiveResult.advice?.map((advice, index) => (
//                   <li key={index}>🛠 {advice}</li>
//                 )) || <li>⚠️ No advice available</li>}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default SentimentAnalysis;
// ✅ Added: hardcoded result for demo screenshot
// ✅ Reflexion – Demo Mode with simple output delay
import React, { useState } from "react";

function SentimentAnalysis() {
  const [text, setText] = useState("");
  const [nlpModel] = useState("gpt-3.5-turbo");
  const [deepDiveMode, setDeepDiveMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const hardcodedResult = {
    psychology_analysis: {
      state: "Anxiety",
      confidence: 87,
      emotion_scores: {
        Anxiety: 83.2,
        Overthinking: 75.4,
        "Self-Doubt": 69.1,
        "Social Avoidance": 52.8,
        Confidence: 21.4,
        Aggression: 10.2,
      },
    },
    next_question: "When was the first time you felt like your best wasn’t good enough?",
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setShowResult(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <label className="block text-lg font-semibold mb-2">NLP Model (for display only):</label>
      <select
        value={nlpModel}
        disabled
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="gpt-3.5-turbo">🧠 GPT-3.5 Turbo</option>
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your thoughts..."
        className="w-full p-3 border border-gray-500 rounded bg-gray-900 text-white mb-4"
      />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`px-5 py-2 rounded font-semibold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <button
        onClick={() => setDeepDiveMode(!deepDiveMode)}
        className={`mt-4 ml-4 px-5 py-2 rounded font-semibold ${
          deepDiveMode ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {deepDiveMode ? "🔍 Stop Deep Dive" : "🔍 Activate Deep Dive"}
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-400">
            📊 Psychological Analysis
          </h3>
          <p className="text-white">
            🧠 <b>Primary Emotional State:</b> {hardcodedResult.psychology_analysis.state}
          </p>
          <p className="text-white">
            🔍 <b>Confidence Level:</b> {hardcodedResult.psychology_analysis.confidence}%
          </p>

          <h3 className="text-lg font-bold text-blue-400 mt-4">🎭 Emotion Breakdown</h3>
          {Object.entries(hardcodedResult.psychology_analysis.emotion_scores).map(
            ([key, value]) => (
              <p key={key} className="text-white">
                🔹 {key}: {value.toFixed(1)}%
              </p>
            )
          )}

          <div className="mt-6 flex justify-center">
            <img
              src="/reflexion_radar_chart.png"
              alt="Psychological Radar Chart"
              className="w-2/3 rounded-lg shadow"
            />
          </div>

          <h3 className="text-lg font-bold text-green-400 mt-6">💬 Cognitive Analysis</h3>
          <p className="text-white">
            Your stress appears to stem from a combination of external pressure (high
            workload, managerial criticism) and internalized self-judgment. This dual
            tension is leading to emotional exhaustion and self-doubt.
          </p>

          <h3 className="text-lg font-bold text-green-400 mt-4">🔧 Suggestions</h3>
          <ul className="list-disc pl-5 text-white">
            <li>Set clear boundaries on work hours to restore personal rhythm.</li>
            <li>Reframe your supervisor’s comments as external inputs, not internal truths.</li>
            <li>Keep a nightly reflection journal to reduce cognitive load and improve sleep.</li>
            <li>Consider professional mediation or HR support if the work environment remains hostile.</li>
          </ul>

          <h3 className="text-lg font-bold text-green-400 mt-4">🧐 Next Reflection Prompt</h3>
          <p className="text-white">"{hardcodedResult.next_question}"</p>

          {deepDiveMode && (
            <div className="mt-4 bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-bold text-pink-400">🔍 Deep Dive Analysis</h3>
              <p className="text-white">
                Your supervisor may be projecting a need for control or validation, and their
                harshness might not reflect your actual value. Try not to internalize this behavior.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;


