import { useRef, useState } from "react";

export default function MapCalibrator() {
  const wrapRef = useRef(null);
  const [opacity, setOpacity] = useState(0.5);
  const [points, setPoints] = useState([]);

  const handleClick = (e) => {
    const box = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const leftPct = ((x / box.width) * 100).toFixed(2) + "%";
    const topPct  = ((y / box.height) * 100).toFixed(2) + "%";
    const p = { left: leftPct, top: topPct };
    setPoints((prev) => [...prev, p]);
    navigator.clipboard.writeText(JSON.stringify(p));
  };

  const copyAll = () =>
    navigator.clipboard.writeText(JSON.stringify(points, null, 2));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm">Ülemise kihi läbipaistvus</label>
        <input type="range" min="0" max="1" step="0.01"
               value={opacity} onChange={(e) => setOpacity(+e.target.value)} />
        <button className="px-3 py-1 rounded bg-black text-white text-sm" onClick={copyAll}>
          Copy JSON
        </button>
        <span className="text-sm opacity-70">Klikk kaardil lisab punkti.</span>
      </div>

      <div
        ref={wrapRef}
        className="relative w-full max-w-5xl mx-auto cursor-crosshair select-none"
        onClick={handleClick}
        style={{ aspectRatio: "724 / 623" }}  // kohanda kui vaja
      >
        {/* ALUMINE: mustvalge map */}
        <img
          src="/map.png"
          alt="map (bw)"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
        {/* PEALMINE: värviline korruseplaan liuguriga */}
        <img
          src="/Korruse plaan frame.png"
          alt="korruseplaan (colored)"
          className="absolute inset-0 w-full h-full object-contain"
          style={{ opacity }}
          draggable={false}
        />

        {points.map((p, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2"
               style={{ left: p.left, top: p.top }}
               title={`${p.left}, ${p.top}`}>
            <div className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-600 shadow" />
          </div>
        ))}
      </div>

      <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-w-5xl mx-auto">
{JSON.stringify(points, null, 2)}
      </pre>
    </div>
  );
}
