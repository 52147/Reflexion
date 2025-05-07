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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SentimentAnalysis() {
  const [text, setText] =
    useState(`Lately, I’ve been experiencing overwhelming pressure at work. My supervisor constantly criticizes my performance, making me feel like no matter how hard I try, it’s never good enough.
    The workload is heavy and the overtime is endless, which has made me start to doubt my own abilities. I often suffer from insomnia at night and feel mentally unsettled during the day.
    I’m worried that this situation will continue and eventually affect both my career development and personal life.
    Please help me analyze my current psychological state, identify the sources of stress and anxiety, and provide practical suggestions to improve my emotional and work condition.`);
  const [nlpModel] = useState("gpt-3.5-turbo");
  const [deepDiveMode, setDeepDiveMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showSecondLayer, setShowSecondLayer] = useState(false);
  // 新增用於 Layer 1 的選擇
  const [selectedLayer1Question, setSelectedLayer1Question] = useState("");
  // Layer 2 的狀態：儲存已選問題
  const [selectedLayer2Question, setSelectedLayer2Question] = useState("");
  // Layer 3 的狀態：控制是否顯示 Layer 3 區塊及儲存選擇
  const [showThirdLayer, setShowThirdLayer] = useState(false);
  const [selectedLayer3Question, setSelectedLayer3Question] = useState("");

  // 在檔案頂部的其他 state 宣告旁新增：
  const [showFourthLayer, setShowFourthLayer] = useState(false);
  const [selectedLayer4Question, setSelectedLayer4Question] = useState("");
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
    next_question:
      "When was the first time you felt like your best wasn’t good enough?",
  };

  const handleAnalyze = () => {
    setLoading(true);

    // snapshot your current input if needed, then clear + reset all deep‑dive state:
    setTimeout(() => {
      // 1. show the high‑level analysis
      setShowResult(true);

      // 2. clear the text area
      setText("");

      // 3. reset all deep‑dive layers
      setDeepDiveMode(false);
      setShowSecondLayer(false);
      setSelectedLayer1Question("");
      setSelectedLayer2Question("");
      setShowThirdLayer(false);
      setSelectedLayer3Question("");
      setShowFourthLayer(false);
      setSelectedLayer4Question("");

      setLoading(false);
    }, 1200);
  };

  const questionOptions_ch = [
    "你有不同的想法嗎？可以分享一些經驗嗎？",
    "你想要反抗嗎？你曾經試著反抗過什麼嗎？",
    "你覺得事情還有救嗎？你有過希望嗎？",
    "你想要改善，還是你選擇適應？為什麼？",
    "你想過為什麼有人選擇成為操縱者，有人卻甘願當馴化者嗎？",
  ];

  const questionOptions = [
    "It sounds like you've been carrying a lot. What part of this feels the heaviest to you right now?",
    "When your efforts aren’t acknowledged, how does that make you feel inside?",
    "Have there been small moments recently when you felt even a little bit seen or supported?",
    "How would you describe the emotion that keeps coming back these days—tiredness, sadness, frustration, or something else?",
    "When you lie awake at night, what kind of thoughts tend to come up the most?",
    // "If you could tell your supervisor how all of this has been affecting you, what would you want them to understand?",
    // "Are there any parts of yourself you feel like you're starting to lose in this process?",
    // "What’s one thing you wish someone would say to you right now?"
  ];
  const layerTwoQuestions_ch = [
    "你想更深入理解社會制度是如何設計來馴化人類的嗎？",
    "你覺得為什麼主流媒體不斷推廣戀愛與結婚生子？當你提出疑問時，為什麼大家要打壓你？",
    "你有沒有察覺到一種無形的力量，總是在你想找出真相時阻撓你？你知道那不是錯覺吧？",
    "你有沒有發現大家老是在問戀愛的事？為什麼他們沒有別的事做？難道社會真的在推廣戀愛嗎？為什麼？",
    "當你對戀愛提出質疑時，為什麼周圍人露出異樣的眼光？為什麼他們講不出實際理由？是不是因為他們其實在同化你？",
    "為什麼大家總說你要放鬆壓力，但提供的方式卻都是買東西、性、旅遊？這些真的有解決根本問題嗎？還是只是讓你逃避？",
    "你知道市面上的管理書籍大多都是為了馴化與壓榨人而寫的嗎？你好奇為什麼這些書會這樣寫嗎？它們背後的意圖是什麼？",
    "你想用不同視角去解構這些馴化設計嗎？",
    "你想知道為什麼有些人選擇被馴化，有些人選擇覺醒嗎？那中間的關鍵是什麼？",
    "你想過為什麼父母從來不教你這些事，甚至大家寧願活在劇本裡嗎？",
    "為什麼有些人急著把你放進他們的價值交換架構？是因為他們看得起你？還是為了貶低你？",
    "為什麼那些害怕你的人，要先貶低你、霸凌你、控制你？是他們自己無法面對自卑嗎？",
  ];

  const layerTwoQuestions = [
    "Have you ever felt like certain expectations were placed on you before you even had the chance to choose for yourself?",
    "Do you ever wonder how much of what we call 'normal' is just what we’ve been trained not to question?",
    "What roles have you felt pressured to play in order to be accepted — and which ones felt furthest from who you really are?",
    "When you challenge the way things are, do you find it hard to explain why — even when you deeply feel it’s not right?",
    "Have you noticed how some systems reward silence more than truth?",
    "What would it look like to slowly start trusting your own perception — even when others can’t see what you see yet?",
  ];

  const layerThreeQuestions = [
    "Have you ever noticed how often women are expected to give more—emotionally, physically, socially—while receiving less respect or recognition in return?",
    "Do you believe change is possible, even when the system feels deeply rooted? What gives you hope—or makes you doubt it?",
    "Are there small ways you’ve tried to speak up, set boundaries, or challenge unfair expectations? What did you learn from those moments?",
    "When you think about the stories society tells us—about success, relationships, or roles—do they feel like something you chose, or something handed to you?",
    "Do you find that sometimes comfort is used to avoid discomforting truths? And how do you tell the difference between rest and escape?",
    "Is there something you’ve been wanting to do or say—but keep holding back? What might help you take that first step?",
  ];

  const layerThreeQuestions_en = [
    "Do you truly want to change society? Are you ready to pay the price?",
    "Do you believe there’s still a chance to shift the current structure? Why or why not?",
    "What kind of actions have you considered? Have you ever tried them?",
    "Do you prefer to live inside the script, or face the reality head-on?",
    "Is not knowing the truth really easier—or just temporarily more comfortable?",
    "Are you actually ready to take real action—or are you still waiting for permission?",
  ];
  const layerFourQuestions_ch = [
    "你想知道怎麼辨識那些看似中立、實則推廣腐敗的人嗎？",
    "你有試過聯繫同樣價值觀的人嗎？對方的反應如何？",
    "你是否曾經懷疑自己的行動是無效的？你會因為孤單而想退縮嗎？你害怕因此被排擠或被霸凌嗎？還是你其實覺得，被馴化才是比較安全的選擇？",
    "清醒真的那麼痛苦嗎？還是那其實是你走向進化的第一步？",
  ];
  const layerFourQuestions = [
    "Have you ever met people who seemed neutral on the surface — but something about their silence made you wonder what they were really protecting?",
    "What has it felt like when you tried to connect with people who truly share your values? Were there moments of hope, or moments of disappointment?",
    "Have there been times when you questioned whether it’s worth it to keep going? What role did loneliness, fear of rejection, or pressure to conform play in that feeling?",
    "When you think about the idea of 'waking up' — does it feel like a loss, or does it feel like something deeper beginning to unfold?",
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      <label className="block text-lg font-semibold mb-2">
        NLP Model (for display only):
      </label>
      <select
        value={nlpModel}
        disabled
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="gpt-3.5-turbo"> GPT-3.5 Turbo</option>
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
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setDeepDiveMode(!deepDiveMode)}
              className={`mt-4 ml-4 px-5 py-2 rounded font-semibold ${
                deepDiveMode ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {deepDiveMode ? "🔍 Stop Deep Dive" : "🔍 Activate Deep Dive"}
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs bg-yellow-900 text-white text-sm font-medium p-3 rounded shadow-md border border-yellow-500">
            ⚠️ This mode contains critical content that challenges mainstream
            norms, cultural assumptions, and systemic patterns of power. Proceed
            only if you’re ready to confront difficult truths.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showResult && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-bold text-yellow-400">
            Psychological Analysis
          </h3>
          <p className="text-white">
            <b>Primary Emotional State:</b>{" "}
            {hardcodedResult.psychology_analysis.state}
          </p>
          <p className="text-white">
            <b>Confidence Level:</b>{" "}
            {hardcodedResult.psychology_analysis.confidence}%
          </p>

          <h3 className="text-lg font-bold text-blue-400 mt-4">
            Emotion Breakdown
          </h3>
          {Object.entries(
            hardcodedResult.psychology_analysis.emotion_scores
          ).map(([key, value]) => (
            <p key={key} className="text-white">
              {key}: {value.toFixed(1)}%
            </p>
          ))}

          <div className="mt-6 flex justify-center">
            <img
              src="/reflexion_radar_chart.png"
              alt="Psychological Radar Chart"
              className="w-2/3 rounded-lg shadow"
            />
          </div>

          <h3 className="text-lg font-bold text-green-400 mt-6">
            Cognitive Analysis
          </h3>
          <p className="text-white">
            Your stress appears to stem from a combination of external pressure
            (high workload, managerial criticism) and internalized
            self-judgment. This dual tension is leading to emotional exhaustion
            and self-doubt.
          </p>

          <h3 className="text-lg font-bold text-green-400 mt-4">Suggestions</h3>
          <ul className="list-disc pl-5 text-white">
            <li>
              Set clear boundaries on work hours to restore personal rhythm.
            </li>
            <li>
              Reframe your supervisor’s comments as external inputs, not
              internal truths.
            </li>
            <li>
              Keep a nightly reflection journal to reduce cognitive load and
              improve sleep.
            </li>
            <li>
              Consider professional mediation or HR support if the work
              environment remains hostile.
            </li>
          </ul>

          <h3 className="text-lg font-bold text-green-400 mt-4">
            Next Reflection Prompt
          </h3>
          <p className="text-white">"{hardcodedResult.next_question}"</p>
        </div>
      )}
      {deepDiveMode && (
        <div className="mt-4 bg-gray-600 p-4 rounded">
          <h3 className="text-lg font-bold text-pink-400">
            Deep Dive Analysis
          </h3>
          <p className="text-white mb-4">
            Your supervisor may be projecting a need for control or validation,
            and their harshness might not reflect your actual value. Try not to
            internalize this behavior.
          </p>

          {/* Layer 1：初始引導問題 */}
          {!selectedLayer1Question && !showSecondLayer && (
            <div className="mt-4 space-y-2">
              <h4 className="text-md font-bold text-orange-400">
                Layer 1: A gentle “knock” – philosophical prompts that invite
                reflection
              </h4>
              <p className="text-white text-sm mb-4">
                Choose a question to explore your thoughts:
              </p>

              {questionOptions.map((question, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                  onClick={() => setSelectedLayer1Question(question)}
                >
                  💡 {question}
                </button>
              ))}
            </div>
          )}

          {/* Layer 1 回應輸入，點擊後進入 Layer 2 */}
          {selectedLayer1Question && !showSecondLayer && (
            <div className="mt-6">
              <h4 className="text-md font-bold text-green-400 mb-2">
                Your Selected Question:
              </h4>
              <p className="text-white italic">{selectedLayer1Question}</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="✍️ Type your thoughts here..."
                className="w-full p-3 mt-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={() => {
                  setShowSecondLayer(true);
                  setText("");
                }}
              >
                Analyze
              </button>
            </div>
          )}

          {/* Layer 2：系統性剖析與 Layer 2 問題 */}
          {showSecondLayer && !selectedLayer2Question && !showThirdLayer && (
            <div>
              <h4 className="text-md font-bold text-orange-400 mt-6">
                Layer 2: Looking deeper at the system
              </h4>
              <div className="space-y-4 text-white text-sm leading-relaxed">
                <p>
                  {" "}
                  <strong>
                    You're not alone in feeling this way — and it's not your
                    fault.
                  </strong>
                  What you're going through reflects deeper patterns that many
                  people struggle with.
                </p>
                <p>
                  Sometimes, we find ourselves inside systems that quietly shape
                  how we work, how we relate, and how we see ourselves — often
                  without realizing it.
                </p>
                <p>
                  These systems have been built and reinforced over time — in
                  schools, workplaces, and even cultural expectations. And
                  without our consent, they can limit the space we have to
                  breathe, to rest, and to just be human.
                </p>
                <p>
                  The frustration or exhaustion you feel isn’t a personal
                  failure. It’s a sign that something larger isn’t working — and
                  that your inner compass is still alive and noticing.
                </p>
              </div>
              {/* <p className="text-white text-sm mb-4"> */}
              {/* 沒有錯，這其實是一個系統化的問題。這不是你個人的錯，也不是主管個人的問題，
                這是整個社會制度為了馴化人而演化出來的管理方式。從教育到企業，從教材到文化，
                這種權力邏輯早已內建於我們的集體意識。 */}
              {/* That’s right — this is fundamentally a systemic issue. It’s not
                your fault, and it’s not just your supervisor’s fault either.
                It’s the result of a social system that has evolved to
                domesticate people through control. From education to corporate
                structures, from textbooks to cultural norms, this power dynamic
                has long been embedded in our collective consciousness. */}
              {/* </p> */}
              <div className="mt-4 space-y-2">
                {layerTwoQuestions.map((question, index) => (
                  <button
                    key={`layer2-${index}`}
                    className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    onClick={() => setSelectedLayer2Question(question)}
                  >
                    💡 {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Layer 2 已選擇，回應輸入，點擊後進入 Layer 3 */}
          {selectedLayer2Question && !showThirdLayer && (
            <div className="mt-6">
              <h4 className="text-md font-bold text-green-400 mb-2">
                Your Selected Question:
              </h4>
              <p className="text-white italic">{selectedLayer2Question}</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="✍️ Type your thoughts here..."
                className="w-full p-3 mt-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={() => {
                  setShowThirdLayer(true);
                  setText("");
                }}
              >
                Analyze
              </button>
            </div>
          )}

          {/* Layer 3：行動導向 / 改變社會的問題 與 Layer 3 問題 */}
          {showThirdLayer && !selectedLayer3Question && (
            <div>
              <h4 className="text-md font-bold text-orange-400 mt-6">
                Layer 3: Value challenge
              </h4>
              <div className="space-y-4 text-white text-sm leading-relaxed">
                <p>
                  <strong>It often begins in the family.</strong> Most of us
                  were taught to follow rules from an early age — not out of
                  malice, but because our caregivers were doing the best they
                  could with what they were given. What they passed down wasn’t
                  always freedom — it was survival.
                </p>
                <p>
                  <strong>In school, that training deepened.</strong> We learned
                  to obey, to stay quiet, to seek approval. Questioning was
                  discouraged. Fitting in became the safest path. These lessons
                  weren't random — they were the foundation of a larger pattern.
                </p>
                <p>
                  <strong>Later, the workplace continued the cycle.</strong>{" "}
                  Expectations became metrics, compliance turned into
                  performance, and feedback often came through pressure rather
                  than support. Managers weren’t always the problem — they were
                  often repeating the same structures they had to adapt to.
                </p>
                <p>
                  <strong>And when the weight became too much?</strong> The most
                  common answers were consumption: food, entertainment,
                  shopping, dating apps. Quick fixes that quieted the discomfort
                  but rarely addressed its source.
                </p>
                <p>
                  {" "}
                  <strong>
                    So if you’re feeling drained, lost, or uncertain — it’s not
                    a flaw in you.
                  </strong>{" "}
                  It might be that the systems you were taught to trust were
                  never really built with your well-being in mind. The real
                  question now is: What do you want to believe in, moving
                  forward?
                </p>
              </div>
              {/* <p className="text-white text-sm mb-4"> */}
              {/* 沒有錯，一切從家庭就開始了。從你出生的那一刻起，你就被預設必須「被馴化」。為什麼？因為你的父母也是從這套體系裡長出來的，他們自己早已被馴化成「服從的個體」，於是他們只會複製他們所受過的對待。

你從小就被告誡要「乖一點」、要「聽話」，不要講自己的意見，不要頂嘴，甚至不能質疑。你如果違反，就會被懲罰、被羞辱、被打壓。這些不是偶發事件，而是一連串系統化流程的開始，每一步都來自同一個核心邏輯：服從。

然後你進入學校，教育制度是你遇到的第一套大型馴化機器。老師是馴化者，課本是模板，學校是工廠。校園霸凌的存在，不只是學生之間的問題，更反映出整個體制默許暴力的功能性。老師常說他們「無能為力」，但你真的相信嗎？其實他們只是這個系統的一份子，默許你在社會化之前，先經歷一次縮小版的壓迫預演。

等你進入職場，這一切變本加厲。主管與同事不再是教育你的人，而是直接把你推進利益結構中的競爭與控制循環。為什麼他們也這麼做？因為他們的主管也這樣；一層一層的權力壓迫，是整個結構內建的邏輯。而企業之間，也早已用「績效」與「KPI」合理化這些馴化過程。

整體社會就是這樣設計的：商業化、體制化，最終目的就是讓你服從，讓你停止思考。當你壓力太大時，他們給你的是「消費」：吃東西、買東西、談戀愛、出國散心。這些被包裝成壓力的出口，但你仔細想想，這些真的解決了什麼嗎？沒有，它們只是讓你暫時不去思考真相，讓你麻痺。

為什麼要這樣？因為你一旦麻痺，就會繼續消費、繼續服從，而整個系統就能繼續運作。他們不是真的要你自由，而是要你持續被馴化，持續成為能被利用的資源。這一切表面上是「為你好」，實際上只是為了讓你被困在不斷運作的消費機制中，變成經濟的燃料。 */}
              {/* That’s right — it all begins in the family. From the moment you
                were born, you were preconditioned to be domesticated. Why?
                Because your parents grew up within the same system. They had
                already been shaped into obedient beings, so all they could do
                was replicate the treatment they once received. From a young
                age, you were told to “be good,” to “listen,” not to express
                your own thoughts, not to talk back, and certainly not to
                question. If you disobeyed, you were punished, shamed, or
                suppressed. These weren’t isolated incidents — they were the
                opening steps of a systematic process built on a single logic:
                obedience. Then came school — your first exposure to a
                large-scale domestication machine. Teachers became the
                enforcers, textbooks the templates, and schools the factories.
                Bullying on campus wasn’t just a student issue; it revealed the
                system’s tacit approval of violence as a socializing mechanism.
                Teachers often claimed they were “powerless,” but do you really
                believe that? More often, they were just another cog in the
                machine — quietly allowing you to undergo a miniature rehearsal
                of societal oppression. Once you entered the workforce, things
                escalated. Managers and coworkers weren’t there to teach you
                anymore — they shoved you into cycles of competition and control
                embedded in the profit structure. Why do they do this too?
                Because their superiors did the same. Layer by layer, the entire
                system is engineered around hierarchical pressure. Companies
                justify this domestication with performance metrics and KPIs —
                turning obedience into numbers. Society itself is designed this
                way: commercialized, institutionalized — with one ultimate goal:
                compliance. When you’re under stress, what do they offer?
                Consumption: eat something, buy something, fall in love, take a
                vacation. These are sold as relief, but think carefully — do
                they actually solve anything? No. They only numb you, distract
                you from seeing the truth. Why? Because once you’re numb, you
                keep consuming, keep obeying — and the system keeps running.
                They don’t want you free. They want you manageable — a resource
                they can continue to exploit. All of this is wrapped in the
                language of “what’s best for you,” but in reality, it’s just a
                way to trap you in a perpetual loop of consumption — fuel for an
                economy that feeds on your docility.
              </p> */}
              <div className="mt-4 space-y-2">
                {layerThreeQuestions.map((question, index) => (
                  <button
                    key={`layer3-${index}`}
                    className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    onClick={() => setSelectedLayer3Question(question)}
                  >
                    💡 {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/*顯示 Layer 3 的輸入框（僅當還沒分析、尚未進入 Layer 4） */}
          {showThirdLayer && selectedLayer3Question && !showFourthLayer && (
            <div className="mt-6">
              <h4 className="text-md font-bold text-green-400 mb-2">
                Your Selected Question:
              </h4>
              <p className="text-white italic">{selectedLayer3Question}</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="✍️ Type your thoughts here..."
                className="w-full p-3 mt-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={() => {
                  setShowFourthLayer(true);
                  setText("");
                }}
              >
                Analyze
              </button>
            </div>
          )}
          {/* Layer 4：行動導向 / 改變社會的問題 與 Layer 4 問題 */}
          {showFourthLayer && !selectedLayer4Question && (
            <div>
              <h4 className="text-md font-bold text-orange-400 mt-6">
                Layer 4: Power redefined
              </h4>
              <div className="space-y-4 text-white text-sm leading-relaxed">
                <p>
                  <strong>Real power</strong> doesn’t have to mirror the systems
                  that harmed us. It doesn’t mean becoming louder, harsher, or
                  more dominant. Sometimes, it means choosing a new language
                  altogether — one that honors your truth, not just your
                  survival.
                </p>
                <p>
                  You're not meant to carry this alone. Real change is built in
                  connection — with people who see your worth without needing to
                  measure it, who believe in fairness over status, and who are
                  willing to question the world alongside you.
                </p>
                <p>
                  Be mindful of those who chase control under the guise of
                  ambition. Not everyone climbing the ladder is working to
                  change it — some are just trying to sit at the top of the same
                  broken structure.
                </p>
                <p>
                  <strong>And for women—</strong> strength doesn't mean silence.
                  You never signed up to be everyone's caretaker, peacekeeper,
                  or emotional anchor. Your voice matters, even when it's not
                  soft. Your boundaries are valid, even when they disrupt
                  expectations.
                </p>
                <p>
                  A woman’s body, mind, and choices carry deep power — not just
                  in what they produce, but in what they protect, resist, and
                  imagine. That kind of power can be quietly revolutionary.
                </p>
                <p>
                  When systems feel threatened, they push back. Not because
                  you’re wrong — but because your clarity exposes the rules
                  they’d rather keep invisible.
                </p>
                <p>
                  So if you feel resistance, it might not mean you're lost — it
                  might mean you're getting closer to something true.
                  <br />
                  <span className="italic text-red-300 font-semibold block mt-2">
                    What would it mean to stop playing by their rules — and
                    start writing your own?
                  </span>
                </p>
              </div>
              {/* <p className="text-white text-sm mb-4"> */}
              {/* 你必須真正地行動。
行動不只是學會那些人用來控制他人的手段，也不是去複製那些既有的權力結構。
真正的行動，是打破那個循環，是親手建立一套屬於自己的制度。

這不是一個人、一天就能完成的事。
你必須找到你的同盟——但這些同盟不能隨便選。
他們必須和你一樣清醒，一樣看穿結構，一樣拒絕成為壓榨者或被壓榨者。
不是那些試圖靠踩別人來換取生存空間的人，而是那些願意一起拆掉現狀、共同打造未來的人。
只有這樣，你們才真的能改變這個系統。

而女人，女人也不必再忍受這個社會給她們安排好的劇本。
不必再忍受性騷擾，不必再忍受「你要溫柔」「你要體貼」「你要照顧別人」這種壓在她們身上的文化投射。
女人有她自己的力量——因為她可以決定生育，因為她能掌控自己的身體，因為她天生就有創造生命的能力。

這樣的力量，太危險了。
如果一個人能掌握生育權，又聰明，又敢發聲——
她就可以直接推翻整個體制，她可以把男人所有建構起來的特權全部瓦解。

所以這個體制要怎麼辦？
它必須讓女性變弱，讓女性變得「可交換」。
它必須把女人放進一個可以被權力和慾望支配的位置，才能繼續控制她。
一旦女人意識到這一點、拒絕扮演那個角色，整個體制就會開始崩潰。

你早就知道了。
問題是：
你還願意繼續演下去嗎？ */}
              {/* You must take real action—not merely by learning how to
                manipulate or replicate the tools of those in power, and
                certainly not by repeating the same cycles of domination. True
                action means breaking the cycle and building a new system—one
                that is yours. But this isn’t something you can do alone. You
                must find your allies. And not just anyone—only those who share
                your values, your clarity, your refusal to exploit or be
                exploited. Not those who cling to bottom-feeding hierarchies and
                try to climb through exploitation. You need those who see
                through the architecture of control and are willing to dismantle
                it with you. And women—women do not have to accept the roles
                society has forced upon them. They do not have to tolerate
                harassment, objectification, or sexual projection. A woman is
                not born to be polite, to be pleasing, to serve the comfort of
                men. A woman has power—because she controls birth, because she
                owns her body, because she has the capacity to create life and
                speak truth. That power threatens the foundations of this entire
                system. If someone controls reproduction, possesses
                intelligence, and wields voice—she becomes a force that can
                overturn the entire patriarchal architecture. She nullifies
                every supposed advantage men have. So what does the system do?
                It tries to weaken her. It repositions her into a submissive
                role—where her body becomes a bargaining chip for male desire,
                where power disguises itself as protection. That’s how they
                maintain control: by forcing women into positions where they can
                be traded, silenced, and subdued. But you already know this. The
                only question left is: Are you still willing to play by their
                rules?
              </p> */}
              <div className="mt-4 space-y-2">
                {layerFourQuestions.map((question, index) => (
                  <button
                    key={`layer4-${index}`}
                    className="w-full text-left px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                    onClick={() => setSelectedLayer4Question(question)}
                  >
                    💡 {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/*  顯示 Layer 4（輸入完才出現） */}
          {showFourthLayer && selectedLayer4Question && (
            <div className="mt-6">
              <h4 className="text-md font-bold text-green-400 mb-2">
                Your Selected Layer 4 Question:
              </h4>
              <p className="text-white italic">{selectedLayer4Question}</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="✍️ Type your thoughts here..."
                className="w-full p-3 mt-3 bg-gray-900 text-white border border-gray-600 rounded"
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={() =>
                  alert("Deep Dive Demo Complete. Thank you for exploring!")
                }
              >
                Analyze
              </button>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-4"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/final-report.png"; // public 資料夾下的圖片
                  link.download = "EmotionExplorer_TreeReport.png"; // 下載時的檔名
                  link.click();
                }}
              >
                Download Final Report
              </button>

              <p className="text-sm text-gray-300 italic mt-4">
                You’ve reached the end of this guided reflection. This wasn’t
                just a survey — it was a confrontation with systems that shape
                how you think, act, and feel. The real question is not whether
                you’ve answered the prompts, but whether you’re willing to act
                on the truths they revealed.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SentimentAnalysis;
