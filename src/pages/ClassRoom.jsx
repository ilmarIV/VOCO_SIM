import { useState } from "react";
import ProgressBar from "../components/ProgressBar";

function ClassRoom() {
	const [teacherMood, setTeacherMood] = useState("happy"); // Example state for teacher's mood

	return (
		<div className='w-full h-full flex  justify-between p-8 pb-0 relative'>
			<div className='absolute top-4 right-4 flex gap-3'>
				<button className='px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors'>
					Õppeaine nimetus nt
				</button>
				<button className='px-6 py-2 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors'>
					8 EKAP
				</button>
			</div>

			<div className='flex justify-center flex-col'>
				<ProgressBar percentage={45} huge={true} />
			</div>

			<div className='flex flex-col justify-end'>
				<img
					src={`/teachers/teacher_1_${teacherMood}.png`}
					alt='Teacher'
					className='h-100 object-contain'
				/>
			</div>

			<div className='flex-1 flex flex-col items-center justify-center space-y-6 max-w-2xl'>
				<div className='bg-white rounded-3xl p-6 shadow-lg w-full'>
					<p className='text-gray-800 text-lg'>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
						commodo ligula eget dolor?
					</p>
				</div>

				<div className='grid grid-cols-2 gap-4 w-full'>
					<button className='bg-white text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md'>
						Lorem ipsum dolor sit amet
					</button>
					<button className='bg-white text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md'>
						Aenean commodo
					</button>
					<button className='bg-white text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md'>
						Aliquam lorem ante
					</button>
					<button className='bg-white text-gray-800 py-3 px-6 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-md'>
						Nulla consequat massa quis enim
					</button>
				</div>
			</div>

			<div className='absolute bottom-5 right-10 mb-4 ml-4'>
				<button className='px-4 py-2 bg-white font-bold text-black  rounded-full  hover:bg-gray-100 transition-colors shadow-md'>
					Ülesanne
				</button>
			</div>
		</div>
	);
}

export default ClassRoom;
