import React from 'react'

export default function LoadingState() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-16">
      {/* Animated spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-4 border-purple-100" />
        <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin-slow" />
        <div className="absolute inset-2 w-16 h-16 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse-glow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-text-main mb-2">Analyzing your profile...</h3>
      <p className="text-subtext text-sm text-center max-w-md">
        Our AI is evaluating your skills, interests, and goals to find the best career paths for you.
      </p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-6">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            style={{
              animation: 'pulse 1.4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
