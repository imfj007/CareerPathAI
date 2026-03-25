import React, { useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import ProgressBar from './components/ProgressBar'
import Step1Skills from './components/Step1Skills'
import Step2Interests from './components/Step2Interests'
import Step3Goals from './components/Step3Goals'
import ResultsView from './components/ResultsView'

const INITIAL_STATE = {
  skills: [],
  interests: [],
  goals: {
    workStyle: '',
    salaryRange: '',
    educationPath: '',
    workLifeBalance: '',
  },
}

export default function App() {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [results, setResults] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const currentStep = (() => {
    const path = location.pathname
    if (path.includes('step2')) return 2
    if (path.includes('step3')) return 3
    if (path.includes('results')) return 4
    return 1
  })()

  const updateSkills = useCallback((skills) => {
    setFormData(prev => ({ ...prev, skills }))
  }, [])

  const updateInterests = useCallback((interests) => {
    setFormData(prev => ({ ...prev, interests }))
  }, [])

  const updateGoals = useCallback((goals) => {
    setFormData(prev => ({ ...prev, goals }))
  }, [])

  const handleRestart = useCallback(() => {
    setFormData(INITIAL_STATE)
    setResults(null)
    navigate('/')
  }, [navigate])

  return (
    <div className="min-h-screen bg-bg-main font-inter">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
              CareerPath <span className="text-primary">AI</span>
            </h1>
          </div>
          <p className="text-subtext text-sm sm:text-base max-w-lg mx-auto">
            Discover your ideal career path with AI-powered guidance tailored to your unique skills and aspirations.
          </p>
        </header>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} />

        {/* Step Content */}
        <main className="mt-8">
          <Routes>
            <Route
              path="/"
              element={
                <Step1Skills
                  skills={formData.skills}
                  updateSkills={updateSkills}
                  onNext={() => navigate('/step2')}
                />
              }
            />
            <Route
              path="/step2"
              element={
                <Step2Interests
                  interests={formData.interests}
                  updateInterests={updateInterests}
                  onNext={() => navigate('/step3')}
                  onBack={() => navigate('/')}
                />
              }
            />
            <Route
              path="/step3"
              element={
                <Step3Goals
                  goals={formData.goals}
                  updateGoals={updateGoals}
                  formData={formData}
                  setResults={setResults}
                  onNext={() => navigate('/results')}
                  onBack={() => navigate('/step2')}
                />
              }
            />
            <Route
              path="/results"
              element={
                <ResultsView
                  results={results}
                  formData={formData}
                  onRestart={handleRestart}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 pb-6">
          <p className="text-subtext text-xs">
            Powered by AI · Built by{' '}
            <a href="https://aistudies.blog" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              AIStudies
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
