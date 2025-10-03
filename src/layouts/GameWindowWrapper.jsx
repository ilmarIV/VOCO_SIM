import React from 'react'

function GameWindowWrapper({ children }) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-[1024px] max-h-[576px] aspect-video bg-gray-700 flex">
        {children}
      </div>
    </div>
  )
}

export default GameWindowWrapper;