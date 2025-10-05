// bar to display current years progression on progressMenu, currently has numeric value
//probably should implement graphical bar and make percentage depend on courses EKAPs
function ProgressBar({ percentage }) {
	return (
		<div className='flex flex-col items-center space-y-1'>
			{/* Numeric value */}
			<p className='text-sm text-white text-center w-8'>{percentage}%</p>

			{/* Bar */}
			<div className='relative h-24 w-3 bg-gray-500 rounded-full overflow-hidden shadow-inner border-2 border-white'>
				<div
					className='absolute bottom-0 left-0 w-full bg-green-400 transition-all duration-500 ease-out'
					style={{
						height: `${percentage}%`,
						borderRadius: "inherit",
					}}
				/>
			</div>
		</div>
	);
}

export default ProgressBar;
