// modal to display all current years courses, is openned via clicking button on ProgressMenu, 
// has visual distinction between courses that are completed and not, styled with chatGPT, needs to be styled according to the prototype
function CurrentYearsCoursesModal({ courses, onClose }) {
  return (
    // Overlay: clicking here closes modal
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      {/* Inner modal: stop clicks from bubbling to overlay */}
      <div
        className="bg-gray-900 rounded-lg shadow-xl p-6 w-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white mb-4">Your courses</h2>

        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {courses.map((c) => (
            <li
              key={c.name}
              className={`p-2 rounded ${
                c.completed
                  ? "bg-green-700 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {c.name}
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          close
        </button>
      </div>
    </div>
  );
}

export default CurrentYearsCoursesModal;