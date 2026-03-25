import React, { useState } from 'react'

const SUGGESTED_SKILLS = [
  'JavaScript', 'Python', 'React', 'Data Analysis', 'UI/UX Design',
  'Machine Learning', 'Communication', 'Project Management', 'Writing',
  'Marketing', 'SQL', 'Cloud Computing', 'Problem Solving', 'Leadership',
  'Graphic Design', 'Public Speaking', 'Research', 'Mobile Development',
  'Cybersecurity', 'SEO', 'Accounting', 'Video Editing', 'Sales',
  'Customer Service', 'Teaching',
]

export default function Step1Skills({ skills, updateSkills, onNext }) {
  const [customSkill, setCustomSkill] = useState('')

  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      updateSkills(skills.filter(s => s !== skill))
    } else {
      updateSkills([...skills, skill])
    }
  }

  const addCustomSkill = () => {
    const trimmed = customSkill.trim()
    if (trimmed && !skills.includes(trimmed)) {
      updateSkills([...skills, trimmed])
      setCustomSkill('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addCustomSkill()
    }
  }

  return (
    <div className="animate-fade-in-up">
      <div className="glass-card p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Step 1 of 3
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main mb-2">
            What are your skills?
          </h2>
          <p className="text-subtext">
            Select the skills you're proficient in or currently learning. Choose at least 3 to get accurate recommendations.
          </p>
        </div>

        {/* Custom skill input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            className="input-glass flex-1"
            placeholder="Add a custom skill..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            id="custom-skill-input"
          />
          <button
            onClick={addCustomSkill}
            className="btn-gradient px-4 py-2 text-sm"
            disabled={!customSkill.trim()}
            id="add-skill-btn"
          >
            Add
          </button>
        </div>

        {/* Selected skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-text-main mb-2">
              Selected ({skills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className="tag-chip tag-chip-selected"
                  id={`selected-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {skill}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested skills */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-text-main mb-2">Popular Skills</h3>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className="tag-chip tag-chip-default"
                id={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="flex justify-end">
          <button
            onClick={onNext}
            disabled={skills.length < 3}
            className="btn-gradient flex items-center gap-2"
            id="step1-next-btn"
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {skills.length > 0 && skills.length < 3 && (
          <p className="text-xs text-subtext mt-3 text-right">
            Select {3 - skills.length} more skill{3 - skills.length > 1 ? 's' : ''} to continue
          </p>
        )}
      </div>
    </div>
  )
}
