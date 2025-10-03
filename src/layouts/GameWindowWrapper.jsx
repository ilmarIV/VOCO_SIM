import React from 'react'

//This is a wrapper component meant to set game window size, also can be configured to pass props between routes if needed.
function GameWindowWrapper({ children }) {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-900 overflow-x-hidden">
			<div className="w-full aspect-video bg-gray-700 flex mx-[4px] max-w-[1280px] max-h-[720px]">
				{children}
			</div>
		</div>
	)
}

export default GameWindowWrapper;