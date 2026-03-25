import React from 'react'

const STEPS = [
  { num: 1, label: 'Skills' },
  { num: 2, label: 'Interests' },
  { num: 3, label: 'Goals' },
  { num: 4, label: 'Results' },
]

export default function ProgressBar({ currentStep }) {
  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <div className="glass-card p-4 sm:p-6">
      {/* Step labels */}
      <div className="flex justify-between mb-3">
        {STEPS.map((step) => (
          <div key={step.num} className="flex flex-col items-center">
            <div
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                transition-all duration-300
                ${currentStep >= step.num
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/20'
                  : 'bg-white/60 text-subtext border border-purple-200'
                }
              `}
            >
              {currentStep > step.num ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${
                currentStep >= step.num ? 'text-primary' : 'text-subtext'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar track */}
      <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
        <div
          className="h-full progress-gradient rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
