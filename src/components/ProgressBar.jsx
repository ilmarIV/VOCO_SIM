// bar to display current years progression on progressMenu, currently has numeric value
//probably should implement graphical bar and make percentage depend on courses EKAPs
function ProgressBar({ percentage, huge = false }) {
	const roundedPercentage = Math.max(
		0,
		Math.min(100, Math.round(Number(percentage)) || 0)
	);

	const sizeClasses = huge ? "h-80 w-16" : "h-32 w-8";
	const textClass = huge ? "text-lg sm:text-xl" : "text-sm";

	return (
		<div className='flex flex-col items-center space-y-2'>
			<div
				role='progressbar'
				aria-label='Year progress'
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={roundedPercentage}
				className={`relative ${sizeClasses}  bg-black/30 rounded-full overflow-hidden border-4 border-white shadow-lg`}
			>
				<div
					className='absolute bottom-0 left-0 w-full transition-all duration-500 ease-out rounded-full shadow-inner'
					style={{
						height: `${roundedPercentage}%`,
						background: `linear-gradient(to top, #4caf50, #81c784)`,
					}}
					aria-hidden='true'
					aria-label={`Progress: ${roundedPercentage}%`}
				/>

				<div className='absolute inset-0 flex items-center justify-center'>
					<span
						className={`${textClass} text-white font-bold drop-shadow-lg z-10`}
						style={{
							textShadow: "0 2px 4px rgba(0,0,0,0.8)",
						}}
					>
						{roundedPercentage}%
					</span>
				</div>
			</div>
		</div>
	);
}

export default ProgressBar;
