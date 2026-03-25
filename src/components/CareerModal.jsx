import React, { useEffect } from 'react'

export default function CareerModal({ career, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!career) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      id="career-modal-overlay"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-text-main/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
        id="career-modal-content"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center transition-colors"
          aria-label="Close modal"
          id="career-modal-close"
        >
          <svg className="w-4 h-4 text-text-main" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
              {career.matchPercentage}%
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-main tracking-tight">{career.title}</h2>
              <p className="text-sm text-subtext">{career.field}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Description
          </h3>
          <p className="text-sm text-subtext leading-relaxed">{career.description}</p>
        </div>

        {/* Required Skills */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {career.requiredSkills?.map((skill, i) => (
              <span key={i} className="tag-chip tag-chip-default text-xs">{skill}</span>
            ))}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Education Path */}
          <div className="bg-white/40 rounded-xl p-4 border border-purple-100">
            <h4 className="text-xs font-semibold text-subtext uppercase tracking-wider mb-1">Education Path</h4>
            <p className="text-sm font-medium text-text-main">{career.educationPath}</p>
          </div>

          {/* Salary Range */}
          <div className="bg-white/40 rounded-xl p-4 border border-purple-100">
            <h4 className="text-xs font-semibold text-subtext uppercase tracking-wider mb-1">Salary Range</h4>
            <p className="text-sm font-medium text-text-main">{career.salaryRange}</p>
          </div>

          {/* Growth Outlook */}
          <div className="bg-white/40 rounded-xl p-4 border border-purple-100">
            <h4 className="text-xs font-semibold text-subtext uppercase tracking-wider mb-1">Growth Outlook</h4>
            <p className="text-sm font-medium text-text-main">{career.growthOutlook}</p>
          </div>

          {/* Work Style */}
          <div className="bg-white/40 rounded-xl p-4 border border-purple-100">
            <h4 className="text-xs font-semibold text-subtext uppercase tracking-wider mb-1">Typical Work Style</h4>
            <p className="text-sm font-medium text-text-main">{career.workStyle}</p>
          </div>
        </div>

        {/* Why this career */}
        {career.whyMatch && (
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
            <h3 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Why This Career Matches You
            </h3>
            <p className="text-sm text-subtext leading-relaxed">{career.whyMatch}</p>
          </div>
        )}
      </div>
    </div>
  )
}
