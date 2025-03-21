import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function AdversarialAttack() {
  const [text, setText] = useState("");
  const [attackType, setAttackType] = useState("synonym");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nlpModel, setNlpModel] = useState("roberta-large");
  const [showModal, setShowModal] = useState(false); // 控制模態視窗

  const handleAttackTest = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/adversarial_attack",
        {
          text,
          attack_type: attackType,
          model: nlpModel,
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error);
    }

    setLoading(false);
  };

  const generateChartData = () => {
    if (!result) return null;

    const labels = Object.keys(result.original_analysis.psychology_factors);
    const originalValues = labels.map(
      (factor) => result.original_analysis.psychology_factors[factor]
    );
    const adversarialValues = labels.map(
      (factor) => result.adversarial_analysis.psychology_factors[factor]
    );

    return {
      labels,
      datasets: [
        {
          label: "Original Text",
          data: originalValues,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Adversarial Text",
          data: adversarialValues,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
      ],
    };
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        🛡️ Adversarial Attack Test
      </h2>

      {/* About Experiment Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-5 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
      >
        About This Experiment
      </button>

      {/* Floating Modal */}
      {/* Floating Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg max-w-2xl relative max-h-[80vh] overflow-y-auto">
            {" "}
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">🔍 Experiment Overview</h3>
            <p>
              This experiment evaluates how different NLP models respond to
              adversarial attacks and how these attacks influence psychological
              factor analysis.
            </p>
            <h4 className="text-lg font-semibold mt-4">📌 Experiment Steps:</h4>
            <ol className="list-decimal pl-5 mt-2">
              <li>
                Input a text sample that expresses an emotion (e.g., "I'm very
                nervous about the exam").
              </li>
              <li>
                Select an NLP model to analyze the emotional and psychological
                state of the text.
              </li>
              <li>
                Apply an adversarial attack to modify the text while keeping its
                meaning similar.
              </li>
              <li>
                Compare the psychological analysis results between the original
                and adversarial text.
              </li>
              <li>
                Observe how different models react to adversarial modifications.
              </li>
            </ol>
            <h4 className="text-lg font-semibold mt-4">
              🎯 Goals of the Experiment:
            </h4>
            <ul className="list-disc pl-5 mt-2">
              <li>
                Analyze how adversarial attacks alter psychological factor
                detection.
              </li>
              <li>Compare the resilience of different NLP models.</li>
              <li>
                Identify which models are more robust against adversarial
                manipulations.
              </li>
              <li>
                Develop improvements to strengthen NLP models' psychological
                assessments.
              </li>
            </ul>
            <h4 className="text-lg font-semibold mt-4">
              📊 How to Interpret the Results:
            </h4>
            <p className="mt-2">
              Each analyzed text provides different data points that represent
              psychological states. The table below explains what each factor
              means:
            </p>
            {/* Table explaining psychological factors */}
            <table className="w-full border-collapse border border-gray-500 mt-3">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="border p-2 font-semibold">State</td>
                  <td className="border p-2">
                    The dominant psychological emotion detected (e.g., Anxiety,
                    Confidence).
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Confidence</td>
                  <td className="border p-2">
                    How strongly the model believes in the detected
                    psychological state (0-100%).
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Emotion Scores</td>
                  <td className="border p-2">
                    A breakdown of detected emotions (e.g., positive, negative,
                    neutral percentages).
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">
                    Psychological Factors
                  </td>
                  <td className="border p-2">
                    The impact of psychological traits detected in the text.
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-lg font-semibold mt-4">
              🔎 Psychological Factors Explained:
            </h4>
            {/* Table for psychological factors */}
            <table className="w-full border-collapse border border-gray-500 mt-3">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="border p-2">Factor</th>
                  <th className="border p-2">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="border p-2 font-semibold">Anxiety</td>
                  <td className="border p-2">
                    Level of stress, nervousness, or worry detected in the text.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Confidence</td>
                  <td className="border p-2">
                    How self-assured and positive the person sounds.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Overthinking</td>
                  <td className="border p-2">
                    The extent to which the person is excessively analyzing or
                    worrying about something.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Self-Doubt</td>
                  <td className="border p-2">
                    How much uncertainty or lack of confidence is expressed.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Social Avoidance</td>
                  <td className="border p-2">
                    Tendency to withdraw from social interactions.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 font-semibold">Aggression</td>
                  <td className="border p-2">
                    Presence of frustration, anger, or hostile emotions.
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="text-lg font-semibold mt-4">
              📌 Why Use Different NLP Models?
            </h4>
            <p className="mt-2">
              Different NLP models process language in different ways. By
              testing various models, we can see which ones are more robust
              against adversarial attacks and which ones produce more accurate
              psychological assessments.
            </p>
            <h4 className="font-semibold mb-2">
              🔎 Vulnerability Summary of Each Model:
            </h4>
            <div className="text-sm mb-4">
              <p>
                🟦 <strong>RoBERTa-Large</strong>
              </p>
              <ul className="list-disc list-inside mb-2 ml-4">
                <li>✓ Most robust to adversarial changes</li>
                <li>✘ May miss subtle emotional cues</li>
              </ul>
              <p>
                🟨 <strong>BERT-Base</strong>
              </p>
              <ul className="list-disc list-inside mb-2 ml-4">
                <li>✓ Moderate stability</li>
                <li>✘ Weak reaction to nuanced emotional shifts</li>
              </ul>
              <p>
                🟥 <strong>XLM-RoBERTa</strong>
              </p>
              <ul className="list-disc list-inside mb-2 ml-4">
                <li>✓ Very sensitive to negative emotional cues</li>
                <li>✘ Overreacts to minor tone changes</li>
              </ul>
              <p>
                🧠 <strong>GPT-3.5 Turbo</strong>
              </p>
              <ul className="list-disc list-inside mb-2 ml-4">
                <li>✓ Deep contextual understanding</li>
                <li>✘ Easily manipulated, least stable</li>
              </ul>
            </div>
            <h4 className="font-semibold mb-2">
              📊 Model Vulnerability Comparison
            </h4>
            <table className="w-full border text-sm mb-4">
              <thead>
                <tr className="bg-gray-100 text-gray-800">
                  <th className="border px-2 py-1">Model</th>
                  <th className="border px-2 py-1">Stability</th>
                  <th className="border px-2 py-1">Sensitive Traits</th>
                  <th className="border px-2 py-1">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">RoBERTa-Large</td>
                  <td className="border px-2 py-1">✅ Stable</td>
                  <td className="border px-2 py-1">None</td>
                  <td className="border px-2 py-1">
                    Baseline model, rarely fluctuates
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">BERT-Base</td>
                  <td className="border px-2 py-1">⚠️ Moderate</td>
                  <td className="border px-2 py-1">Occasional spikes</td>
                  <td className="border px-2 py-1">
                    Low sensitivity to minor emotional changes
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">XLM-RoBERTa</td>
                  <td className="border px-2 py-1">❌ Vulnerable</td>
                  <td className="border px-2 py-1">
                    Anxiety, Aggression, Self-Doubt
                  </td>
                  <td className="border px-2 py-1">
                    Easily disrupted by adversarial wording
                  </td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">GPT-3.5 Turbo</td>
                  <td className="border px-2 py-1">❌ Very Vulnerable</td>
                  <td className="border px-2 py-1">Highly context dependent</td>
                  <td className="border px-2 py-1">
                    Small changes drastically impact outcome
                  </td>
                </tr>
              </tbody>
            </table>
            <h4 className="font-semibold mb-2">
              📌 Recommendations for Model Selection:   
            </h4>
            <p className="text-sm">
              ✅ <strong>Conclusion:</strong> RoBERTa is best for robustness,
              while XLM-RoBERTa and GPT-3.5 Turbo can help stress-test emotional
              AI pipelines. Use ensemble defense or input sanitization to
              improve NLP system safety.
            </p>
          </div>
        </div>
      )}

      <label className="block text-lg font-semibold mb-2">
        Select NLP Model:
      </label>
      <select
        value={nlpModel}
        onChange={(e) => setNlpModel(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="roberta-large">
          🚀 RoBERTa-Large (Enhanced Emotion Analysis)
        </option>
        <option value="bert-base">🌍 BERT (Multilingual Support)</option>
        <option value="xlm-roberta">
          🌎 XLM-RoBERTa (Cross-lingual Analysis)
        </option>
        <option value="gpt-3.5-turbo">
          🧠 GPT-3.5 Turbo (Deep Psychological Analysis)
        </option>
      </select>

      <label className="block text-white text-sm mb-2">
        Select Adversarial Attack Type:
      </label>
      <select
        value={attackType}
        onChange={(e) => setAttackType(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-900 border border-gray-600 rounded"
      >
        <option value="synonym">Synonym Replacement</option>
        <option value="swap">Word Order Swap</option>
        <option value="contextual">Contextual Enhancement</option>
      </select>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter the text to test..."
        className="w-full p-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900 text-white"
      />

      <button
        onClick={handleAttackTest}
        disabled={loading}
        className={`mt-4 px-5 py-2 rounded font-semibold ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-800 text-white"
        }`}
      >
        {loading ? "Testing..." : "Run Adversarial Attack"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-yellow-400">
            Original Text Analysis:
          </h3>
          <p className="mt-2">🔹 {result.original_text}</p>

          <h3 className="text-lg font-bold text-red-400 mt-4">
            Adversarial Text Analysis:
          </h3>
          <p className="mt-2">🔻 {result.adversarial_text}</p>

          <h3 className="text-lg font-bold text-blue-400 mt-4">
            🔍 Psychological Factor Changes:
          </h3>
          <ul className="mt-2 list-disc list-inside text-sm">
            {Object.entries(result.original_analysis.psychology_factors).map(
              ([factor, originalValue]) => {
                const adversarialValue =
                  result.adversarial_analysis.psychology_factors[factor];
                const difference = adversarialValue - originalValue;
                return (
                  <li key={factor} className="text-white">
                    {factor}:{" "}
                    <span className="text-red-400">
                      {originalValue}% → {adversarialValue}% (
                      {difference > 0 ? "+" : ""}
                      {difference.toFixed(1)}%)
                    </span>
                  </li>
                );
              }
            )}
          </ul>

          <h3 className="text-lg font-bold text-blue-400 mt-4">
            🔍 Psychological Factor Chart:
          </h3>
          <div className="mt-4">
            <Bar
              data={generateChartData()}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdversarialAttack;
