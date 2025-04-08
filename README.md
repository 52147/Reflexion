## Sentiment Psychology Analyst

Emotion Analysis & Adversarial Attacks on Psychological Factors

A research-driven project combining NLP, sentiment analysis, and adversarial testing to study emotional and psychological impacts on text classification models.

## Overview

The Sentiment Psychology Analyst is an advanced NLP-based tool designed to analyze sentiments and psychological factors in textual data. It supports two key functionalities:

1. Sentiment & Psychological Analysis
   - Extract emotion scores (e.g., anger, fear, joy, confidence)
   - Evaluate psychological factors (e.g., anxiety, self-doubt, overthinking)
   - Perform deep psychological analysis to generate insights about emotional triggers

2. Adversarial Attack Simulation
   - Apply adversarial text perturbation techniques (synonym replacement, reordering, contextual changes)
   - Compare sentiment and psychological changes before and after an adversarial attack
   - Visualize how psychological states shift when text is manipulated

This project is designed for research applications in affective computing, psychology, and AI fairness studies.

## Experimental Setup & Research Goals

This project focuses on quantifying the impact of adversarial attacks on sentiment analysis models. Key research questions include:

- How do adversarial perturbations alter perceived sentiment and psychological scores?
- Are certain psychological states more robust or vulnerable to adversarial attacks?
- Can we detect bias in NLP models’ sentiment classifications?

We conduct experiments using multiple NLP models (DistilBERT, RoBERTa, GPT-3.5, XLM-R) and evaluate:

1. Emotion and Psychology Score Shifts (e.g., before/after attack sentiment comparisons)
2. Fairness and Robustness Metrics (e.g., bias detection in emotion classification)
3. Graph-Based Analysis of Sentiment Manipulation (e.g., how perturbations influence clustering in latent space)

## Features

- Sentiment and Psychology Analysis
  - Extracts emotion scores (anger, fear, joy, love, sadness, etc.)
  - Calculates psychological attributes (self-doubt, overthinking, aggression, social avoidance)
  - Supports deep analysis mode for contextual emotional reasoning

- Adversarial Attack on Sentiments
  - Generates adversarial versions of text (e.g., synonym replacement, word reordering)
  - Compares sentiment drift before and after attacks
  - Analyzes psychological vulnerabilities in text classifiers

- Experimental Visualization
  - Graph-based analysis of sentiment shifts due to adversarial attacks
  - Heatmaps comparing before and after attack sentiment changes
  - Fairness metrics evaluating emotional bias in AI models

## Tech Stack

Backend:
- Python (3.8+)
- FastAPI – for API development
- Transformers (Hugging Face) – for NLP analysis
- Pandas, NumPy, Matplotlib – for data visualization

Frontend:
- React.js – for UI/UX interface
- Axios – for API requests
- D3.js and Chart.js – for interactive visualization

Models Used:
- DistilBERT (fast, lightweight sentiment analysis)
- RoBERTa-Large (state-of-the-art emotion analysis)
- GPT-3.5 Turbo (deep contextual psychology analysis)
- XLM-RoBERTa (cross-lingual emotional understanding)

## Installation & Usage

1. Clone the repository:
```sh
git clone https://github.com/yourusername/Sentiment-Psychology-Analyst.git
cd Sentiment-Psychology-Analyst
```

2. Install dependencies:
```sh
pip install -r backend/requirements.txt
cd frontend && npm install
```

3. Start the backend:
```sh
cd backend
uvicorn main:app --reload
```

4. Start the frontend:
```sh
cd frontend
npm start
```

## API Endpoints

**Sentiment Analysis API**
- Endpoint: `/analyze_psychology`
- Method: `POST`
- Input:
```json
{
    "text": "I am nervous about my PhD interview.",
    "model": "roberta-large"
}
```

- Response:
```json
{
    "psychology_analysis": {
        "state": "Anxiety",
        "confidence": 85.6,
        "emotion_scores": {
            "joy": 10.5,
            "fear": 75.3,
            "anger": 5.2
        },
        "psychology_factors": {
            "Self-Doubt": 60.1,
            "Overthinking": 80.3
        }
    },
    "next_question": "What aspects of the interview worry you the most?"
}
```

**Adversarial Attack API**
- Endpoint: `/adversarial_attack`
- Method: `POST`
- Input:
```json
{
    "text": "I am nervous about my PhD interview.",
    "attack_type": "synonym"
}
```

- Response:
```json
{
    "original_text": "I am nervous about my PhD interview.",
    "adversarial_text": "I feel anxious about my PhD interview.",
    "original_analysis": {
        "state": "Anxiety",
        "confidence": 85.6
    },
    "adversarial_analysis": {
        "state": "Self-Doubt",
        "confidence": 90.3
    }
}
```

## Results & Research Insights

We conducted multiple experiments on sentiment robustness under adversarial perturbation.

**Key Observations**
1. Synonym substitution (e.g., “nervous” → “anxious”) increased perceived self-doubt.
2. Contextual attacks (e.g., inserting ambiguity) led to higher misclassification rates.
3. Fairness issues were observed in RoBERTa, where female-associated texts were more likely to be misclassified as “joy” even in neutral statements.

**Example Visualization**
- Sentiment Distribution Before vs. After Adversarial Attack
Analyzing how emotion scores change due to text perturbation.

## Future Research Directions

- Robustness evaluation of deep learning NLP models.
- Graph-based sentiment propagation analysis.
- Fairness and bias mitigation in psychological sentiment analysis.
- Real-time adversarial text defenses.

## Citation & References

If you find this research useful, please consider citing:
```bibtex
@article{sentimentpsychology2025,
  title={Sentiment Psychology Analyst: Adversarial Robustness in Emotion AI},
  author={Your Name},
  journal={arXiv preprint arXiv:2501.01234},
  year={2025}
}
```

## License

This project is licensed under the MIT License.

## Contributions

We welcome contributions! If you’d like to improve the project, please:
1. Fork the repository
2. Create a new branch (`feature-improvement`)
3. Submit a pull request

## Built for AI & Psychology Research

Feel free to reach out via issues or discussions on GitHub.

