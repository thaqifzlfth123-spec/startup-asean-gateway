// Official Gemma 4 (gemma-4-26b-a4b-it) Multimodal & Search-Grounded Service
// Built with @google/genai SDK from Google AI Studio

import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export const GEMMA_MODEL_ID = 'gemma-4-26b-a4b-it';

export const getStoredApiKey = () => {
  return (
    localStorage.getItem('AURA_GEMINI_API_KEY') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    ''
  ).trim();
};

export const setStoredApiKey = (key) => {
  if (key && key.trim()) {
    localStorage.setItem('AURA_GEMINI_API_KEY', key.trim());
  } else {
    localStorage.removeItem('AURA_GEMINI_API_KEY');
  }
};

/**
 * Rasterizes an SVG URL or SVG data URL onto an HTML5 Canvas and exports crisp PNG base64.
 * Required because Vision models accept raster formats (image/png, image/jpeg, image/webp) or application/pdf.
 */
async function rasterizeSvgToPngBase64(svgSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const width = img.naturalWidth || 1200;
        const height = img.naturalHeight || 840;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const pngDataUrl = canvas.toDataURL('image/png');
        const base64 = pngDataUrl.replace(/^data:image\/png;base64,/, '');
        resolve({ base64, mimeType: 'image/png' });
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = (e) => reject(new Error('Failed to load SVG certificate into image canvas'));
    img.src = svgSrc;
  });
}

/**
 * Converts any image URL, SVG URL, or FileReader data URL into { base64, mimeType } ready for Gemma 4 inlineData.
 */
async function prepareInlineMedia(urlOrData) {
  if (!urlOrData) return null;

  // 1. Data URL from user file upload
  if (urlOrData.startsWith('data:')) {
    const mimeMatch = urlOrData.match(/^data:([^;]+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

    if (mimeType.includes('svg')) {
      return await rasterizeSvgToPngBase64(urlOrData);
    }

    const base64 = urlOrData.replace(/^data:[^;]+;base64,/, '');
    return { base64, mimeType };
  }

  // 2. Relative or remote URL (e.g. /certificates/ssm-malaysia-cert.svg)
  if (urlOrData.toLowerCase().endsWith('.svg')) {
    return await rasterizeSvgToPngBase64(urlOrData);
  }

  const res = await fetch(urlOrData);
  const blob = await res.blob();
  if (blob.type.includes('svg')) {
    return await rasterizeSvgToPngBase64(urlOrData);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const mimeMatch = result.match(/^data:([^;]+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : blob.type || 'image/jpeg';
      const base64 = result.replace(/^data:[^;]+;base64,/, '');
      resolve({ base64, mimeType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Safely extracts JSON object from model text output (handles markdown code fences or leading prose).
 */
function parseJsonFromModelText(rawText) {
  if (!rawText) throw new Error('Empty response from Gemma 4');
  const cleaned = rawText
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    }
    throw new Error('Could not parse structured JSON from Gemma 4 output');
  }
}

/**
 * Analyze an uploaded startup certificate image using ACTUAL Gemma 4 (`gemma-4-26b-a4b-it`) via @google/genai
 * @param {string} imageSource - base64 data URL or relative URL of certificate
 * @param {string} defaultMime - fallback mime type
 * @param {object} sampleMetadata - optional metadata if a sample was chosen
 * @param {function} onStreamProgress - optional callback for live streaming feedback
 */
export async function analyzeCertificate(
  imageSource,
  defaultMime = 'image/png',
  sampleMetadata = null,
  onStreamProgress = null
) {
  const apiKey = getStoredApiKey();
  let liveApiError = null;

  if (apiKey && imageSource) {
    try {
      const media = await prepareInlineMedia(imageSource);

      if (media && media.base64) {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are Gemma 4, the official multimodal AI auditor for the "Startup ASEAN" Single Gateway.
Carefully inspect this startup registration / incorporation certificate image and extract all company details, then synthesize personalized ASEAN cross-border recommendations across 4 pillars: Founder, Funding, Opportunities, and Talent.

Return ONLY a valid JSON object matching this exact structure (no markdown fences, no extra commentary):
{
  "name": "Full legal company name from the certificate",
  "country": "Country name (e.g. Malaysia, Singapore, Indonesia, Vietnam, Thailand, Philippines)",
  "countryCode": "2-letter ISO code (MY, SG, ID, VN, TH, PH)",
  "regNumber": "Official registration / UEN / NIB number from the certificate",
  "authority": "Issuing government agency or registry (e.g. Suruhanjaya Syarikat Malaysia (SSM), ACRA, BKPM/AHU)",
  "certType": "Type of certificate shown",
  "incorpDate": "Incorporation or registration date shown",
  "sector": "Primary industry sector inferred from the certificate",
  "directors": ["Director / Founder 1", "Director / Founder 2"],
  "stage": "Estimated startup stage (e.g. Early Stage / Seed, Pre-Series A)",
  "readinessScore": 95,
  "description": "2-sentence executive assessment of the company and its cross-border ASEAN expansion potential.",
  "founderAnalysis": {
    "team": "Names and roles of founders/directors listed on the certificate",
    "equity": "Jurisdiction & shareholding compliance note for national grants",
    "strengths": "1-2 sentences on founding governance strengths & ASEAN expansion readiness"
  },
  "fundingEligibility": {
    "flagshipGrant": "Best matching national/ASEAN grant (e.g. Cradle CIP Spark & Sprint, Startup SG Founder, Kemenparekraf / Indigo)",
    "amount": "Grant check size (e.g. Up to RM 600,000 Equity-Free, S$ 50,000 - S$ 250,000)",
    "vcPipeline": ["Top Regional VC 1", "Top Regional VC 2", "Top Regional VC 3"]
  },
  "opportunityCorridors": [
    "Specific ASEAN accelerator or corporate pilot programme 1",
    "Specific bilateral soft-landing or workspace corridor 2",
    "Specific regional talent visa or cross-border rail programme 3"
  ],
  "talentNeeds": [
    { "role": "Priority Hire Role 1 tailored to sector", "match": "Recommended ASEAN skill profile / match %" },
    { "role": "Priority Hire Role 2 tailored to cross-border GTM", "match": "Recommended ASEAN skill profile / match %" }
  ]
}`;

        const config = {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.HIGH,
          },
          tools: [
            {
              googleSearch: {},
            },
          ],
        };

        const contents = [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: media.mimeType || defaultMime,
                  data: media.base64,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ];

        let responseStream;
        try {
          responseStream = await ai.models.generateContentStream({
            model: GEMMA_MODEL_ID,
            config,
            contents,
          });
        } catch (toolErr) {
          // Retry without googleSearch tool if search grounding is restricted on multimodal JSON calls
          responseStream = await ai.models.generateContentStream({
            model: GEMMA_MODEL_ID,
            config: {
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.HIGH,
              },
            },
            contents,
          });
        }

        let fullText = '';
        for await (const chunk of responseStream) {
          if (chunk.text) {
            fullText += chunk.text;
            if (onStreamProgress) {
              onStreamProgress(fullText.length);
            }
          }
        }

        const parsed = parseJsonFromModelText(fullText);
        return {
          ...(sampleMetadata ? { previewUrl: sampleMetadata.previewUrl } : {}),
          ...parsed,
          verified: true,
          isLiveApi: true,
          modelUsed: GEMMA_MODEL_ID,
          source: `Live Gemma 4 (${GEMMA_MODEL_ID})`,
          confidence: 0.99,
        };
      }
    } catch (err) {
      console.error('Live Gemma 4 API error:', err);
      liveApiError = err?.message || 'Failed to reach Gemma 4 API';
    }
  }

  // Offline demo fallback when no API key is configured (or if API call errored)
  await new Promise((resolve) => setTimeout(resolve, 1400));

  if (sampleMetadata) {
    return {
      ...sampleMetadata,
      verified: true,
      isLiveApi: false,
      modelUsed: 'Offline Simulation (Add API Key for Live gemma-4-26b-a4b-it)',
      source: 'Demo Simulation Mode',
      apiError: liveApiError,
      confidence: 0.97,
    };
  }

  return {
    name: 'Nexus Horizon Technologies Sdn Bhd',
    country: 'Malaysia',
    countryCode: 'MY',
    regNumber: '202401048821 (1568212-A)',
    authority: 'Suruhanjaya Syarikat Malaysia (SSM)',
    certType: 'Certificate of Incorporation of Private Company',
    incorpDate: '14 February 2024',
    sector: 'Artificial Intelligence & Regional Cloud Infrastructure',
    directors: ['Ahmad Thaqif bin Zulkifli (Founder & CEO)', 'Elena Tan Li Wei (CTO)'],
    address: 'Level 14, Mercu 2, KL Eco City, 59200 Kuala Lumpur',
    stage: 'Early Stage / Seed',
    readinessScore: 94,
    description:
      'Autonomous open-weight AI agent harness designed for cross-border logistics and compliance throughout ASEAN.',
    verified: true,
    isLiveApi: false,
    modelUsed: 'Offline Simulation (Add API Key for Live gemma-4-26b-a4b-it)',
    source: 'Demo Simulation Mode',
    apiError: liveApiError,
    confidence: 0.96,
    founderAnalysis: {
      team: 'Ahmad Thaqif (CEO) & Elena Tan (CTO)',
      equity: '100% Malaysian Shareholding (51%+ local quota verified)',
      strengths:
        'Deep technical AI model deployment capabilities; compliant with MOSTI & Cradle fund governance guidelines.',
    },
    talentNeeds: [
      { role: 'Senior AI / LLM Engineer', location: 'Malaysia / Remote', match: 'Farhan Azman (98% match)' },
      { role: 'VP Regional Growth & GTM', location: 'Singapore / Regional', match: 'Stephanie Lim (94% match)' },
    ],
    fundingEligibility: {
      flagshipGrant: 'Cradle CIP Spark & CIP Sprint (MOSTI)',
      amount: 'Up to RM 600,000 (100% Equity-Free)',
      vcPipeline: ['East Ventures Seed X', '500 Southeast Asia III', 'Odra Venture AI Fellowship'],
    },
    opportunityCorridors: [
      'DOJO Coworking Reciprocal Access (KL & Singapore)',
      'Sunway iLabs Super Accelerator Pilot Validation',
      'MDEC DE Rantau Foreign Tech Talent Visa Sponsorship',
    ],
  };
}

/**
 * Ask the Gemma 4 ASEAN Navigator chatbot using generateContentStream + ThinkingLevel.HIGH + googleSearch
 */
export async function askAseanNavigator(query, context = {}, onChunk = null) {
  const apiKey = getStoredApiKey();

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });

      const systemContext = `You are "Aura", the official AI Navigator for Startup ASEAN powered by Gemma 4 (${GEMMA_MODEL_ID}).
Your mission is to help founders, talent, and investors overcome ecosystem fragmentation across ASEAN (Malaysia, Singapore, Indonesia, Thailand, Vietnam, Philippines).
Verified Startup Context: ${JSON.stringify(context)}
Provide concise, actionable, well-structured guidance citing real ASEAN grants, agencies (Cradle, Startup SG / Enterprise SG, BKPM, NIA, NIC, MDEC), cross-border tax/legal tips, and regional talent strategies. Use clean markdown bullet points.`;

      const tools = [
        {
          googleSearch: {},
        },
      ];

      const config = {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
        tools,
      };

      const contents = [
        {
          role: 'user',
          parts: [
            {
              text: `${systemContext}\n\nUser Question: ${query}`,
            },
          ],
        },
      ];

      const response = await ai.models.generateContentStream({
        model: GEMMA_MODEL_ID,
        config,
        contents,
      });

      let fullReply = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullReply += chunk.text;
          if (onChunk) {
            onChunk(fullReply);
          }
        }
      }

      if (fullReply.trim()) {
        return fullReply;
      }
    } catch (err) {
      console.error('Gemma 4 Chat API error:', err);
      return `⚠️ **Gemma 4 API Notice:** Could not complete live request (\`${err?.message || 'API Error'}\`). Please verify your Google AI Studio API key in the top bar.`;
    }
  }

  // Offline demo fallback if no API key is set
  await new Promise((resolve) => setTimeout(resolve, 700));
  const lower = query.toLowerCase();

  if (lower.includes('grant') || lower.includes('fund') || lower.includes('money') || lower.includes('cradle')) {
    return `### 💰 ASEAN Funding & Grants Recommendation *(Demo Mode — Add API Key for Live Gemma 4)*
Based on your startup's profile in **${context.country || 'Malaysia / ASEAN'}**:

1. **Cradle CIP Spark / Sprint (Malaysia):**
   * **Grant Size:** Up to **RM 600,000** (100% equity-free).
   * **Eligibility:** Registered Sdn Bhd with at least 51% Malaysian equity.
2. **Startup SG Founder (Singapore Expansion):**
   * **Grant Size:** **S$ 50,000** matching grant via Enterprise Singapore.
3. **Regional Seed VCs:**
   * **East Ventures, 500 Southeast Asia, and Odra Venture** actively back seed-stage ASEAN ventures.`;
  }

  if (lower.includes('talent') || lower.includes('hire') || lower.includes('engineer') || lower.includes('remote')) {
    return `### 🧑‍💻 Cross-Border Talent & Hiring Strategy *(Demo Mode — Add API Key for Live Gemma 4)*
1. **Malaysia Talent Pass / DE Rantau:** Simplified foreign tech talent passes issued by MDEC.
2. **Remote Engineering in Vietnam & Indonesia:** Access senior engineers (\$30–\$45/hr) via regional EORs.
3. **Kracked Devs Ecosystem:** Direct access to vetted Malaysian and regional AI builders.`;
  }

  return `### 🚀 Startup ASEAN Gateway *(Demo Mode — Add API Key for Live \`${GEMMA_MODEL_ID}\`)*
Click **"API Key"** in the top navigation bar and paste your **Google AI Studio** key (\`GEMINI_API_KEY\`) to activate live **Gemma 4 (\`${GEMMA_MODEL_ID}\`)** with \`ThinkingLevel.HIGH\` and Google Search grounding!`;
}
