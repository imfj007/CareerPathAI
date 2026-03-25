import React, { useState } from 'react'
import CareerCard from './CareerCard'
import CareerModal from './CareerModal'
import LoadingState from './LoadingState'
import PDFDownload from './PDFDownload'

export default function ResultsView({ results, formData, onRestart }) {
  const [selectedCareer, setSelectedCareer] = useState(null)

  // Show loading if no results yet
  if (!results) {
    return <LoadingState />
  }

  const careers = results.careers || []

  return (
    <div className="animate-fade-in-up">
      {/* Results Header */}
      <div className="glass-card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Analysis Complete
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main mb-1">
              Your Career Matches
            </h2>
            <p className="text-subtext text-sm">
              We found {careers.length} career path{careers.length !== 1 ? 's' : ''} that match your profile.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <PDFDownload results={results} formData={formData} />
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {results.summary && (
        <div className="glass-card p-5 mb-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/10">
          <p className="text-sm text-text-main leading-relaxed">{results.summary}</p>
        </div>
      )}

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {careers.map((career, index) => (
          <CareerCard
            key={index}
            career={career}
            index={index}
            onClick={() => setSelectedCareer(career)}
          />
        ))}
      </div>

      {/* Restart Button */}
      <div className="text-center">
        <button
          onClick={onRestart}
          className="btn-outline"
          id="restart-btn"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Start Over
          </span>
        </button>
      </div>

      {/* Career Modal */}
      {selectedCareer && (
        <CareerModal
          career={selectedCareer}
          onClose={() => setSelectedCareer(null)}
        />
      )}
    </div>
  )
}
