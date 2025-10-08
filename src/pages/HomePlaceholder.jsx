//placeholder for / route, remove once actual content is added

import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import subjectData from "../assets/subjects.json";
import { useState } from "react";

function HomePlaceholder() {
	const navigate = useNavigate();

	const handleSubjectClick = (subjectId, subjectDescription) => {
		navigate("/classroom", {
			state: {
				subjectData: { id: subjectId, description: subjectDescription },
			},
		});
	};

	const [subjects] = useState(() => {
		return Object.entries(subjectData).map(([id, data]) => ({
			id,
			...data,
		}));
	});

	return (
		<div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800'>
			<div className='max-w-2xl w-full p-8'>
				<h1 className='text-4xl font-bold text-white text-center mb-8'>
					Erialad
				</h1>

				<p className='text-lg text-gray-300 text-center mb-8'>
					Vali endale sobiv eriala, et alustada õpingutega.
				</p>

				<div className='grid grid-cols-1 gap-6'>
					{subjects.map((subject) => (
						<button
							key={subject.id}
							className='bg-white hover:bg-gray-100 p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left group cursor-pointer w-full'
							onClick={() =>
								handleSubjectClick(subject.id, subject.description)
							}
						>
							<div className='flex items-center justify-between'>
								<div className='flex-1'>
									<h2 className='text-2xl font-bold text-gray-800 mb-2'>
										{subject.name}
									</h2>
									{/* <p className='text-gray-600 mb-2'>{subject.description}</p> */}
									<p className='text-sm text-gray-500'>
										Kestus: {subject.years} aastat
									</p>
								</div>
								<FaChevronRight className='text-green-500 text-2xl ml-4 group-hover:translate-x-2 transition-transform' />
							</div>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default HomePlaceholder;
