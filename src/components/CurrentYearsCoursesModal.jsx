// modal to display all current years courses, is openned via clicking button on ProgressMenu,
// has visual distinction between courses that are completed and not, styled with chatGPT, needs to be styled according to the prototype
import { MdClose } from "react-icons/md";

function CurrentYearsCoursesModal({ courses, onClose }) {
	return (
		// Overlay: clicking here closes modal
		<div
			className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'
			onClick={onClose}
		>
			{/* Inner modal: stop clicks from bubbling to overlay */}
			<div
				className='bg-gray-900 rounded-lg shadow-xl p-5 w-100 relative'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex items-center justify-between mb-4'>
					<h2 className='text-lg font-bold text-white'>Sinu Kursused</h2>

					<button
						onClick={onClose}
						className=' text-gray-400 hover:text-white text-2xl cursor-pointer'
					>
						<MdClose />
					</button>
				</div>

				<div
					className='max-h-100 overflow-y-auto text-center'
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					<ul className='space-y-2'>
						{courses.map((c) => (
							<li
								key={c.name}
								className={`p-2 rounded ${
									c.isCompleted
										? "bg-green-700 text-white"
										: "bg-gray-700 text-gray-300"
								}`}
							>
								{c.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default CurrentYearsCoursesModal;
