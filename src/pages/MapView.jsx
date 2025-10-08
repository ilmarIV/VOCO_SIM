// src/pages/MapView.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { POSSIBLE_POSITIONS, TEACHER_TO_MODULE } from "../constants/mapConfig";

// util: sega massiiv
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_TEACHERS = [1, 2, 3, 4];

export default function MapView() {
  const navigate = useNavigate();

  // loe lõpetatud õpetajad localStorage’ist
  const completed = useMemo(() => {
    try {
      const raw = localStorage.getItem("completedTeachers");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, []);

  const remainingTeachers = useMemo(
    () => ALL_TEACHERS.filter((t) => !completed.includes(t)),
    [completed]
  );

  // vali juhuslikud positsioonid (üks õpetaja -> üks positsioon)
  const [layout, setLayout] = useState([]);
  useEffect(() => {
    const shuffledPositions = shuffle(POSSIBLE_POSITIONS);
    const shuffledTeachers = shuffle(remainingTeachers);
    const pairs = shuffledTeachers.map((teacherId, i) => ({
      teacherId,
      pos: shuffledPositions[i % shuffledPositions.length],
    }));
    setLayout(pairs);
  }, [remainingTeachers]);

  return (
    <div className="relative w-full h-full">
      {/* taustakaart; pane õige pildi tee public/ alla */}
      <img
        src="/map.png" // nt public/map.png
        alt="Korruse plaan"
        className="w-full h-auto block"
      />

      {/* õpetajad kaardil */}
      {layout.map(({ teacherId, pos }) => (
        <button
          key={teacherId}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ left: pos.left, top: pos.top }}
          onClick={() =>
            navigate(
              `/classroom/${TEACHER_TO_MODULE[teacherId]}/${teacherId}`
            )
          }
          aria-label={`Open teacher ${teacherId}`}
        >
          {/* glow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-24 h-5 rounded-full blur-xl opacity-60 bg-yellow-300 pointer-events-none" />

          {/* hüüumärk */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="inline-flex items-center justify-center text-black font-extrabold w-6 h-6 rounded-full bg-yellow-300 border border-yellow-500 shadow">
              !
            </span>
          </div>

          {/* õpetaja pilt (mapis kasutame happy) */}
          <img
            src={`/teachers/teacher_${teacherId}_happy.png`}
            alt={`Teacher ${teacherId}`}
            className="h-28 w-auto drop-shadow-xl hover:scale-105 transition-transform"
            draggable={false}
          />
        </button>
      ))}

      {/* kui kõik on tehtud */}
      {remainingTeachers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 rounded-xl px-6 py-4 shadow">
            <p className="text-lg font-semibold">
              Kõik õpetajad on läbitud. 🎉
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
