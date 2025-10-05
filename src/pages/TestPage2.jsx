import { useGameState } from '../context/GameStateContext';

// testing ground for ilmar(and others)
function TestPage2 () {
    const { goToRoute } = useGameState();

    return (
        <div>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => goToRoute("/testpage")}
            >
                Move to testpage
            </button>
        </div>
    )

}

export default TestPage2;