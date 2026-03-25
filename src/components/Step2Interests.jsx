import React from 'react'

const INTEREST_CATEGORIES = [
  {
    id: 'technology',
    label: 'Technology & Computing',
    icon: '💻',
    description: 'Software, AI, cybersecurity, cloud',
  },
  {
    id: 'creative',
    label: 'Creative & Design',
    icon: '🎨',
    description: 'Art, UX/UI, media, content creation',
  },
  {
    id: 'business',
    label: 'Business & Finance',
    icon: '📊',
    description: 'Management, consulting, entrepreneurship',
  },
  {
    id: 'science',
    label: 'Science & Research',
    icon: '🔬',
    description: 'Biology, chemistry, physics, research',
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Medicine',
    icon: '🏥',
    description: 'Nursing, pharmacy, mental health',
  },
  {
    id: 'education',
    label: 'Education & Training',
    icon: '📚',
    description: 'Teaching, tutoring, curriculum design',
  },
  {
    id: 'engineering',
    label: 'Engineering',
    icon: '⚙️',
    description: 'Mechanical, electrical, civil, robotics',
  },
  {
    id: 'social',
    label: 'Social & Communication',
    icon: '🤝',
    description: 'HR, PR, social work, counseling',
  },
  {
    id: 'environment',
    label: 'Environment & Sustainability',
    icon: '🌍',
    description: 'Climate, agriculture, renewable energy',
  },
  {
    id: 'law',
    label: 'Law & Policy',
    icon: '⚖️',
    description: 'Legal practice, governance, compliance',
  },
  {
    id: 'sports',
    label: 'Sports & Fitness',
    icon: '🏃',
    description: 'Athletics, coaching, sports science',
  },
  {
    id: 'arts',
    label: 'Performing Arts & Music',
    icon: '🎭',
    description: 'Music, acting, dance, film production',
  },
]

export default function Step2Interests({ interests, updateInterests, onNext, onBack }) {
  const toggleInterest = (id) => {
    if (interests.includes(id)) {
      updateInterests(interests.filter(i => i !== id))
    } else {
      updateInterests([...interests, id])
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="glass-card p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Step 2 of 3
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main mb-2">
            What are your interests?
          </h2>
          <p className="text-subtext">
            Select the fields that excite you the most. Pick at least 2 areas to help us find the best match.
          </p>
        </div>

        {/* Interest cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = interests.includes(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => toggleInterest(cat.id)}
                className={`
                  relative p-4 rounded-xl text-left transition-all duration-300 border
                  ${isSelected
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-md shadow-primary/10'
                    : 'bg-white/50 border-purple-100 hover:border-purple-200 hover:bg-white/70'
                  }
                `}
                id={`interest-${cat.id}`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className={`text-sm font-semibold mb-1 ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                  {cat.label}
                </h3>
                <p className="text-xs text-subtext leading-snug">{cat.description}</p>
              </button>
            )
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="btn-outline px-4 py-2 text-sm" id="step2-back-btn">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </span>
          </button>
          <button
            onClick={onNext}
            disabled={interests.length < 2}
            className="btn-gradient flex items-center gap-2"
            id="step2-next-btn"
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {interests.length > 0 && interests.length < 2 && (
          <p className="text-xs text-subtext mt-3 text-right">
            Select {2 - interests.length} more area{2 - interests.length > 1 ? 's' : ''} to continue
          </p>
        )}
      </div>
    </div>
  )
}
