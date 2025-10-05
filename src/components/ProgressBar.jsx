// bar to display current years progression on progressMenu, currently has numeric value
//probably should implement graphical bar and make percentage depend on courses EKAPs
function ProgressBar({ percentage, huge = false }) {
	const roundedPercentage = Math.max(
		0,
		Math.min(100, Math.round(Number(percentage)) || 0)
	);

	const sizeClasses = huge ? "h-48 w-12" : "h-32 w-8";
	const textClass = huge ? "text-lg sm:text-xl" : "text-sm";

	return (
		<div className='flex flex-col items-center space-y-2'>
			{/* Numeric value */}
			<p className={`${textClass} text-white font-semibold`}>
				{roundedPercentage} %
			</p>

			{/* Bar - vertical capsule shape */}
			<div
				role='progressbar'
				aria-label='Year progress'
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={roundedPercentage}
				className={`relative ${sizeClasses} bg-transparent rounded-full overflow-hidden border-4 border-white`}
			>
				<div
					className='absolute bottom-0 left-0 w-full bg-green-500 transition-all duration-500 ease-out rounded-full'
					style={{ height: `${roundedPercentage}%` }}
				/>
			</div>
		</div>
	);
}

export default ProgressBar;
