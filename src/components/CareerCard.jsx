import React from 'react'

const MATCH_COLORS = {
  high: { bg: 'from-green-400 to-emerald-500', text: 'text-green-700', badge: 'bg-green-100' },
  medium: { bg: 'from-yellow-400 to-amber-500', text: 'text-amber-700', badge: 'bg-amber-100' },
  low: { bg: 'from-orange-400 to-red-500', text: 'text-orange-700', badge: 'bg-orange-100' },
}

function getMatchLevel(percentage) {
  if (percentage >= 80) return 'high'
  if (percentage >= 60) return 'medium'
  return 'low'
}

export default function CareerCard({ career, index, onClick }) {
  const matchLevel = getMatchLevel(career.matchPercentage)
  const colors = MATCH_COLORS[matchLevel]

  return (
    <button
      onClick={onClick}
      className="glass-card glass-card-hover p-5 sm:p-6 text-left w-full"
      style={{ animationDelay: `${index * 0.1}s` }}
      id={`career-card-${index}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-text-main tracking-tight leading-snug">
            {career.title}
          </h3>
          <p className="text-xs text-subtext mt-1">{career.field}</p>
        </div>

        {/* Match percentage badge */}
        <div className={`${colors.badge} px-3 py-1 rounded-full flex items-center gap-1.5 ml-3 shrink-0`}>
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors.bg}`} />
          <span className={`text-sm font-bold ${colors.text}`}>
            {career.matchPercentage}%
          </span>
        </div>
      </div>

      <p className="text-sm text-subtext leading-relaxed mb-4 line-clamp-2">
        {career.description}
      </p>

      {/* Quick stats */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-primary px-2 py-1 rounded-lg">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {career.salaryRange}
        </span>
        <span className="inline-flex items-center gap-1 text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-lg">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {career.growthOutlook}
        </span>
      </div>

      {/* View details hint */}
      <div className="flex items-center gap-1 text-xs text-primary font-medium">
        View details
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}
