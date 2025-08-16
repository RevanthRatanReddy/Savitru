import React, { useState } from "react";

export default function NumberSystemSVG() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const speakNumber = (num) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(num.toString());
    let count = 0;
    utterance.onend = () => {
      count++;
      if (count < 5) synth.speak(utterance);
      else setSelectedNumber(null); // close modal after 5 repeats
    };
    synth.speak(utterance);
  };

  const renderSVG = (num) => (
    <svg width="80" height="80" viewBox="0 0 100 100">
      <defs>
        <linearGradient id={`grad-${num}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffcc00" }} />
          <stop offset="100%" style={{ stopColor: "#ff6600" }} />
        </linearGradient>
      </defs>
      <rect
        x="5"
        y="5"
        rx="15"
        ry="15"
        width="90"
        height="90"
        fill={`url(#grad-${num})`}
        stroke="#333"
        strokeWidth="2"
      />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="40"
        fontWeight="bold"
        fill="#fff"
        filter="url(#shadow)"
      >
        {num}
      </text>
    </svg>
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Learn Numbers</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded bg-gray-300 dark:bg-gray-700"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-4">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => {
              setSelectedNumber(num);
              speakNumber(num);
            }}
            className="flex items-center justify-center p-2 rounded shadow hover:scale-105 transition-transform"
          >
            {renderSVG(num)}
          </button>
        ))}
      </div>

      {selectedNumber !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold mb-4 text-center">{selectedNumber}</h2>
            <div className="flex justify-center">{renderSVG(selectedNumber)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
