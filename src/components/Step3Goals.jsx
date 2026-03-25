import React, { useState } from 'react'
import { getCareerRecommendations } from '../utils/claudeAPI'

const WORK_STYLES = [
  { id: 'remote', label: 'Remote / Work from Home', icon: '🏠' },
  { id: 'hybrid', label: 'Hybrid (Office + Remote)', icon: '🔄' },
  { id: 'onsite', label: 'On-site / In Office', icon: '🏢' },
  { id: 'flexible', label: 'Flexible / Freelance', icon: '✨' },
]

const SALARY_RANGES = [
  { id: 'entry', label: '$30k – $50k', desc: 'Entry Level' },
  { id: 'mid', label: '$50k – $80k', desc: 'Mid Level' },
  { id: 'senior', label: '$80k – $120k', desc: 'Senior Level' },
  { id: 'executive', label: '$120k+', desc: 'Executive / Specialist' },
]

const EDUCATION_PATHS = [
  { id: 'self-taught', label: 'Self-Taught / Online Courses' },
  { id: 'bootcamp', label: 'Bootcamp / Certificate' },
  { id: 'bachelors', label: "Bachelor's Degree" },
  { id: 'masters', label: "Master's / PhD" },
]

const BALANCE_OPTIONS = [
  { id: 'high-growth', label: 'Career Growth Priority', icon: '🚀' },
  { id: 'balanced', label: 'Balanced Lifestyle', icon: '⚖️' },
  { id: 'lifestyle', label: 'Work-Life Balance First', icon: '🌴' },
]

export default function Step3Goals({ goals, updateGoals, formData, setResults, onNext, onBack }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const setGoalField = (field, value) => {
    updateGoals({ ...goals, [field]: value })
  }

  const isComplete = goals.workStyle && goals.salaryRange && goals.educationPath && goals.workLifeBalance

  const handleSubmit = async () => {
    if (!isComplete) return
    setIsSubmitting(true)
    setError(null)

    try {
      const recommendations = await getCareerRecommendations({
        skills: formData.skills,
        interests: formData.interests,
        goals,
      })
      setResults(recommendations)
      onNext()
    } catch (err) {
      console.error('Career recommendation error:', err)
      setError(err.message || 'Failed to get recommendations. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="glass-card p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Step 3 of 3
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main mb-2">
            Define your goals
          </h2>
          <p className="text-subtext">
            Tell us about your career preferences so we can tailor our recommendations.
          </p>
        </div>

        {/* Work Style */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-3">Preferred Work Style</h3>
          <div className="grid grid-cols-2 gap-2">
            {WORK_STYLES.map(ws => (
              <button
                key={ws.id}
                onClick={() => setGoalField('workStyle', ws.id)}
                className={`
                  p-3 rounded-xl text-left transition-all duration-200 border text-sm
                  ${goals.workStyle === ws.id
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-sm'
                    : 'bg-white/50 border-purple-100 hover:border-purple-200'
                  }
                `}
                id={`workstyle-${ws.id}`}
              >
                <span className="text-lg">{ws.icon}</span>
                <span className={`block mt-1 font-medium ${goals.workStyle === ws.id ? 'text-primary' : 'text-text-main'}`}>
                  {ws.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Salary Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-3">Target Salary Range</h3>
          <div className="grid grid-cols-2 gap-2">
            {SALARY_RANGES.map(sr => (
              <button
                key={sr.id}
                onClick={() => setGoalField('salaryRange', sr.id)}
                className={`
                  p-3 rounded-xl text-left transition-all duration-200 border text-sm
                  ${goals.salaryRange === sr.id
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-sm'
                    : 'bg-white/50 border-purple-100 hover:border-purple-200'
                  }
                `}
                id={`salary-${sr.id}`}
              >
                <span className={`font-bold ${goals.salaryRange === sr.id ? 'text-primary' : 'text-text-main'}`}>
                  {sr.label}
                </span>
                <span className="block text-xs text-subtext mt-0.5">{sr.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Education Path */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-3">Education Path</h3>
          <div className="flex flex-wrap gap-2">
            {EDUCATION_PATHS.map(ep => (
              <button
                key={ep.id}
                onClick={() => setGoalField('educationPath', ep.id)}
                className={`tag-chip ${goals.educationPath === ep.id ? 'tag-chip-selected' : 'tag-chip-default'}`}
                id={`education-${ep.id}`}
              >
                {ep.label}
              </button>
            ))}
          </div>
        </div>

        {/* Work-Life Balance */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-text-main mb-3">Work-Life Balance Priority</h3>
          <div className="grid grid-cols-3 gap-2">
            {BALANCE_OPTIONS.map(bo => (
              <button
                key={bo.id}
                onClick={() => setGoalField('workLifeBalance', bo.id)}
                className={`
                  p-3 rounded-xl text-center transition-all duration-200 border text-sm
                  ${goals.workLifeBalance === bo.id
                    ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 shadow-sm'
                    : 'bg-white/50 border-purple-100 hover:border-purple-200'
                  }
                `}
                id={`balance-${bo.id}`}
              >
                <span className="text-xl block mb-1">{bo.icon}</span>
                <span className={`font-medium text-xs ${goals.workLifeBalance === bo.id ? 'text-primary' : 'text-text-main'}`}>
                  {bo.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button onClick={onBack} className="btn-outline px-4 py-2 text-sm" id="step3-back-btn">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className="btn-gradient flex items-center gap-2"
            id="step3-submit-btn"
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                Get Recommendations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
