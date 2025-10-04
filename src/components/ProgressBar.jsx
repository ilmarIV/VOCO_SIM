// bar to display current years progression on progressMenu, currently has numeric value
//probably should implement graphical bar and make percentage depend on courses EKAPs
function ProgressBar({ percentage }) {
    return (
        <div>
            <p className="text-sm text-white">
                {percentage}%
            </p>
        </div>
    )
}

export default ProgressBar;