# Reflexion – AI-Guided Emotional Reflection Platform (Demo Version)

> _“Emotional clarity is not a luxury — it’s a foundation for autonomy.”_

Reflexion is a cognitive insight system that helps users explore their emotions, question internalized beliefs, and develop psychological self-awareness — all without the need for a therapist.

This demo highlights Reflexion’s core reflection engine, including emotion detection, personalized insights, and layered inquiry prompts.

---

## Live Project

- **Landing Page:** https://www.reflexionai.dev  
- **Feedback Form:** [Google Questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSeKJnQFfbbqfaaEmm7tOH31qcc4Fj2fG436Afl3vF0EiJmmSA/viewform)  
- **Technical Write-up:** [Medium Article](https://medium.com/@ainotfound404321)

---

## Tech Stack

| Layer       | Tools / Frameworks                          |
|-------------|----------------------------------------------|
| Frontend    | React, Tailwind CSS, Vercel Hosting          |
| Backend     | FastAPI , OpenAI GPT-4, RoBERTa     |
| NLP Layer   | Multilingual emotion classification, prompt chaining |
| Storage     | Firebase Authentication, Firestore DB       |

---

## Features Overview

### Normal Mode

- Text-based emotional check-in
- Emotion radar with % intensity scores
- Cognitive insight summary
- Actionable self-reflection prompts

### Deep Dive Mode (Demo Only)

- Multi-layered guided inquiry (4 stages)
- Prompts rooted in CBT, narrative therapy, and cultural psychology
- Final report summarizing emotional progression + areas for growth

> _Note: This flow reflects the current demo implementation. In future versions, Deep Dive prompts will be contextually surfaced based on user emotional state._

---

## Current Demo Limitations

- Backend is mocked — no live API calls
- GPT results are simulated for demonstration purposes
- Deep Dive is activated manually (will later be event-driven)

---

## Sample Outputs

- Emotion radar graph (anxiety, self-doubt, confidence, etc.)
- AI-generated summaries of stress drivers
- Guided prompt trees based on user cognition and response
- Final Session Report (Deep Dive only)

---

## Local Dev Setup

```bash
npm install
npm run dev
```
Make sure to create a .env file if you plan to connect to actual APIs.


---

## 🛣️ Roadmap

- [ ] GPT-4 API integration with adaptive prompt trees  
- [ ] Mood history and timeline tracking  
- [ ] Personalized mental health modules (e.g. burnout, relationship fatigue)  
- [ ] Final report export to professionals (PDF or structured JSON)  
- [ ] Multilingual interface and accessibility improvements (WCAG compliance)  

---

## Use Case Scenarios

- Emotion check-ins for high-stress individuals  
- Lightweight mental health tool for underserved communities  
- Self-guided reflection for those uncomfortable with therapy  
- Experimental interface for applied NLP + psychology research  

---

## License

MIT License — for research and non-commercial purposes.  

---

## 🙋‍♀Author

**Shou-Tzu Han**  
AI x Psychology Engineer ・ Boston University M.S.  
📧 [Email](mailto:debrah@bu.edu) ・ 🌐 [Website](https://www.reflexionai.dev)
