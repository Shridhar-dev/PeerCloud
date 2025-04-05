import React from 'react'

const test = () => {
    return (
        <div>
           <div className="md:w-1/2">
          <div className="relative h-64 md:h-96 w-full">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-500 rounded-xl flex items-center justify-center">
              <div className="p-6 bg-white/80 rounded-lg backdrop-blur-md shadow-lg">
                <div className="grid grid-cols-3 gap-4">
                  {Array(9).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                    >
                      <span className="text-xs font-mono text-white">GPU{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default test