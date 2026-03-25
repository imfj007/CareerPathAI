const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-20250514'

const INTEREST_LABELS = {
  technology: 'Technology & Computing',
  creative: 'Creative & Design',
  business: 'Business & Finance',
  science: 'Science & Research',
  healthcare: 'Healthcare & Medicine',
  education: 'Education & Training',
  engineering: 'Engineering',
  social: 'Social & Communication',
  environment: 'Environment & Sustainability',
  law: 'Law & Policy',
  sports: 'Sports & Fitness',
  arts: 'Performing Arts & Music',
}

const WORK_STYLE_LABELS = {
  remote: 'Remote / Work from Home',
  hybrid: 'Hybrid (Office + Remote)',
  onsite: 'On-site / In Office',
  flexible: 'Flexible / Freelance',
}

const SALARY_LABELS = {
  entry: '$30k – $50k (Entry Level)',
  mid: '$50k – $80k (Mid Level)',
  senior: '$80k – $120k (Senior Level)',
  executive: '$120k+ (Executive / Specialist)',
}

const EDUCATION_LABELS = {
  'self-taught': 'Self-Taught / Online Courses',
  bootcamp: 'Bootcamp / Certificate',
  bachelors: "Bachelor's Degree",
  masters: "Master's / PhD",
}

const BALANCE_LABELS = {
  'high-growth': 'Career Growth Priority',
  balanced: 'Balanced Lifestyle',
  lifestyle: 'Work-Life Balance First',
}

function buildPrompt(userData) {
  const { skills, interests, goals } = userData

  const interestNames = interests.map(id => INTEREST_LABELS[id] || id).join(', ')
  const workStyle = WORK_STYLE_LABELS[goals.workStyle] || goals.workStyle
  const salary = SALARY_LABELS[goals.salaryRange] || goals.salaryRange
  const education = EDUCATION_LABELS[goals.educationPath] || goals.educationPath
  const balance = BALANCE_LABELS[goals.workLifeBalance] || goals.workLifeBalance

  return `You are a career guidance expert. Based on the following student profile, recommend exactly 5 career paths that match their skills, interests, and goals.

STUDENT PROFILE:
- Skills: ${skills.join(', ')}
- Interest Areas: ${interestNames}
- Preferred Work Style: ${workStyle}
- Target Salary Range: ${salary}
- Education Path: ${education}
- Work-Life Balance Priority: ${balance}

Respond with ONLY valid JSON (no markdown, no code fences, no explanation) in this exact format:
{
  "summary": "A brief 2-3 sentence personalized summary of the student's profile and what kind of careers suit them.",
  "careers": [
    {
      "title": "Career Title",
      "field": "Field/Industry",
      "matchPercentage": 92,
      "description": "A 2-3 sentence description of this career and why it's a good fit.",
      "requiredSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
      "educationPath": "Recommended education path for this career",
      "salaryRange": "$X – $Y per year",
      "growthOutlook": "High Growth / Moderate Growth / Stable",
      "workStyle": "Typical work arrangement",
      "whyMatch": "A personalized 1-2 sentence explanation of why this career matches the student's specific profile."
    }
  ]
}

Requirements:
- matchPercentage must be between 60 and 98
- Order careers by matchPercentage descending
- Each career must have all fields filled
- requiredSkills should have 4-6 skills
- Make recommendations specific and actionable, not generic
- Tailor the "whyMatch" to reference the student's actual skills and interests`
}

function validateResponse(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid response format: not an object')
  }

  if (!data.summary || typeof data.summary !== 'string') {
    throw new Error('Invalid response: missing or invalid summary')
  }

  if (!Array.isArray(data.careers) || data.careers.length === 0) {
    throw new Error('Invalid response: missing or empty careers array')
  }

  const requiredFields = ['title', 'field', 'matchPercentage', 'description', 'requiredSkills', 'educationPath', 'salaryRange', 'growthOutlook', 'workStyle', 'whyMatch']

  data.careers.forEach((career, index) => {
    requiredFields.forEach(field => {
      if (career[field] === undefined || career[field] === null || career[field] === '') {
        throw new Error(`Career ${index + 1} is missing required field: ${field}`)
      }
    })

    if (typeof career.matchPercentage !== 'number' || career.matchPercentage < 0 || career.matchPercentage > 100) {
      throw new Error(`Career ${index + 1} has invalid matchPercentage: ${career.matchPercentage}`)
    }

    if (!Array.isArray(career.requiredSkills) || career.requiredSkills.length === 0) {
      throw new Error(`Career ${index + 1} has invalid requiredSkills`)
    }
  })

  // Sort by match percentage descending
  data.careers.sort((a, b) => b.matchPercentage - a.matchPercentage)

  return data
}

function extractJSON(text) {
  // Try parsing directly first
  try {
    return JSON.parse(text)
  } catch {
    // Try to extract JSON from possible markdown code fences
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1])
    }

    // Try to find JSON object pattern
    const objectMatch = text.match(/\{[\s\S]*\}/)
    if (objectMatch) {
      return JSON.parse(objectMatch[0])
    }

    throw new Error('Could not extract valid JSON from response')
  }
}

export async function getCareerRecommendations(userData) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('API key not configured. Please set VITE_ANTHROPIC_API_KEY in your .env file.')
  }

  const prompt = buildPrompt(userData)

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '')
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your VITE_ANTHROPIC_API_KEY.')
    }
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.')
    }
    throw new Error(`API request failed (${response.status}): ${errorBody || response.statusText}`)
  }

  const result = await response.json()

  const textContent = result.content?.find(block => block.type === 'text')?.text
  if (!textContent) {
    throw new Error('No text content in API response')
  }

  const parsed = extractJSON(textContent)
  return validateResponse(parsed)
}
