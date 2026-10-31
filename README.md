# 🌏 Startup ASEAN Gateway (AuraASEAN)
### The AI-Powered Single Gateway for Southeast Asia's Unified Startup Ecosystem

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Category: Best Use of Gemma 4](https://img.shields.io/badge/Category-Best%20Use%20of%20Gemma%204-cyan.svg)](https://ai.google.dev/)
[![Challenge: Problem Statement 2](https://img.shields.io/badge/Challenge-Problem%20Statement%202-emerald.svg)](https://events.mlh.com/events/14817-hacktoberfest-hack-day-kuala-lumpur)
[![Hackathon: Hacktoberfest Hack Day KL 2026](https://img.shields.io/badge/Event-Hacktoberfest%20KL%202026-orange.svg)](https://events.mlh.com/)

---

## 📌 Problem Statement Addressed (Challenge 2)
> **"How can Startup ASEAN address ecosystem fragmentation and become the single gateway for discovering opportunities, programmes, funding, talent, and partners across ASEAN?"**

### The Core Problem:
Southeast Asia boasts one of the most vibrant startup economies in the world (\$45M+ in regional grants and multi-billion-dollar VC flows). However, the ecosystem remains severely **fragmented across national borders**:
* Each country operates isolated national registries and portals (Malaysia's Cradle/SSM, Singapore's ACRA/Enterprise SG, Indonesia's BKPM/AHU, Thailand's NIA, Vietnam's NIC).
* Cross-border validation takes weeks of manual paperwork.
* Founders struggle to discover bilateral grants, tax avoidance treaties, and soft-landing corridors.
* Regional talent and startups cannot easily discover and trust one another.

### The Solution:
**Startup ASEAN Gateway** transforms official government incorporation certificates (SSM, ACRA, NIB, SEC, DBD) into a unified cross-border passport using **Gemma 4 Multimodal Vision AI**. In seconds, a verified certificate unlocks:
1. **💰 Matched Funding & Grants:** Tailored recommendations from Cradle CIP Spark/Sprint, Startup SG, East Ventures, and regional VCs.
2. **🚀 Ecosystem Accelerators:** Fast-track applications to Antler SEA, Sunway iLabs, and NIC Vietnam.
3. **🤝 Soft-Landing & Expansion Partners:** Bilateral workspace access (DOJO Coworking), cross-border banking (Aspire), and tax optimization checklists.
4. **🧑‍💻 Cross-Border Talent Network:** Connecting verified startups with vetted regional engineers, designers, and growth leaders.
5. **🤖 Aura — Gemma AI Navigator:** 24/7 conversational advisor answering complex cross-border questions.

---

## 🚀 Key Features

* **📷 Multimodal Certificate Scanner (Gemma 4 Vision):**
  Upload or snap a photo of any official ASEAN certificate of incorporation. Gemma 4 reads the layout, extracts key legal entities (Name, UEN/Reg ID, Authority, Sector, Stage), and scores ASEAN readiness.
* **⚡ 1-Click Interactive Sample Certificates:**
  Test immediately with verified sample certificates for **Malaysia (SSM)**, **Singapore (ACRA)**, and **Indonesia (NIB)**.
* **🎯 Dynamic Opportunity Matching Engine:**
  Filters regional grants, venture funds, and acceleration tracks specifically tailored to the verified company's jurisdiction and stage.
* **🌐 Pan-ASEAN Directory & Ecosystem Explorer:**
  Comprehensive, searchable catalog spanning Malaysia 🇲🇾, Singapore 🇸🇬, Indonesia 🇮🇩, Thailand 🇹🇭, Vietnam 🇻🇳, and Philippines 🇵🇭.
* **👥 Regional Talent & Co-Founder Portal:**
  Allowing developers and builders across ASEAN to publish profiles, match skills, and connect with certified startups.
* **💬 Aura AI Navigator:**
  Conversational AI built on Google AI Studio / Gemini API (Gemma model) delivering actionable guidance on soft-landing, bilateral treaties, and hiring.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti
* **AI & Vision:** Google AI Studio / Gemini Multimodal API (Gemma 4 Vision & Chat integration)
* **Architecture:** Edge-ready client-side app with offline neural emulation fallback

---

## 💻 Local Setup & Quickstart

### Prerequisites
* Node.js v18+ (tested on Node v24)
* npm v9+

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/startup-asean-gateway.git
cd startup-asean-gateway
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. (Optional) Configure Google AI Studio Key
Create a \`.env\` file in the root directory:
\`\`\`env
VITE_GEMINI_API_KEY=your_google_ai_studio_api_key_here
\`\`\`
*(Note: If left empty, the application runs seamlessly using built-in high-fidelity Gemma neural emulation for instant testing!)*

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🏆 Hackathon Submission Checklist (MLH OrganizerHQ)
- [x] Public GitHub Repository
- [x] Open-source MIT License
- [x] Clear README with setup instructions
- [x] Addresses Problem Statement 2 (Single Gateway for ASEAN Ecosystem)
- [x] Implements Category A: Best Use of Gemma 4
- [x] Live interactive prototype with sample certificates

---

## 🤝 Partners & Acknowledgments
Built during **Hacktoberfest Hack Day Kuala Lumpur 2026** at DOJO Coworking Space:
* **Organisers:** Major League Hacking (MLH), MyStartup Cradle (MOSTI), Kracked Devs, TalentLabs
* **Supporting Partner:** Odra Venture
* **Venue Partner:** DOJO Coworking Space KL

Licensed under the [MIT License](LICENSE).
