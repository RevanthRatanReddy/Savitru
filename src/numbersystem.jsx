import React, { useState, useRef } from "react";

// SVG for speaker icon
function SpeakerIcon({ active }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={active ? "#1976d2" : "#757575"}
      width="48"
      height="48"
      viewBox="0 0 24 24"
      style={{ marginBottom: "16px", animation: active ? "pulse 1.2s infinite" : "none" }}
    >
      <path d="M3 10v4h4l5 5V5l-5 5H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.74 2.5-2.26 2.5-4.02zM14 3.23v2.06c3.39.49 6 3.39 6 6.71s-2.61 6.22-6 6.71v2.06c4.84-.58 8.5-4.56 8.5-8.77s-3.66-8.19-8.5-8.77z"/>
      <style>
      {`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: .5; }
          100% { opacity: 1; }
        }
      `}
      </style>
    </svg>
  );
}

const colors = [
  "#BBDEFB", "#C8E6C9", "#FFECB3", "#FFCDD2", "#D1C4E9", "#FFE0B2"
];

export default function NumberSystemSVG() {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakCountRef = useRef(0);

  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const speakNumber = (num) => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported in your browser.");
      return;
    }
    setIsSpeaking(true);
    speakCountRef.current = 0;
    const synth = window.speechSynthesis;

    // Stop previous utterances
    synth.cancel();

    function repeatSpeech() {
      if (speakCountRef.current >= 5) {
        setIsSpeaking(false);
        setTimeout(() => setSelectedNumber(null), 500); // Close after short delay
        return;
      }
      const utter = new window.SpeechSynthesisUtterance(num.toString());
      utter.rate = 0.9; // easier listening speed
      utter.onend = () => {
        speakCountRef.current += 1;
        repeatSpeech();
      };
      synth.speak(utter);
    }
    repeatSpeech();
  };

  const handleNumberClick = (num) => {
    setSelectedNumber(num);
    speakNumber(num);
  };

  const handleModalBackdropClick = () => {
    if (!isSpeaking) setSelectedNumber(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <h1
        style={{
          margin: "32px 0 16px",
          fontSize: "2.5rem",
          fontWeight: "700",
          letterSpacing: "0.02em",
        }}
      >
        Numbers Coach
      </h1>
      <p style={{ color: "#62727b", fontSize: "1.1rem", marginBottom: 24 }}>
        Touch any number to zoom and listen!
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "22px",
          width: "92vw",
          maxWidth: "840px",
          background: "#fff",
          padding: "38px 20px",
          borderRadius: "24px",
          boxShadow: "0 4px 22px rgba(0,0,0,0.09)",
          marginBottom: "40px",
          userSelect: "none",
        }}
      >
        {numbers.map((num, idx) => (
          <div
            key={num}
            onClick={() => handleNumberClick(num)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleNumberClick(num);
            }}
            role="button"
            tabIndex={0}
            aria-label={`Learn number ${num}`}
            style={{
              background: colors[idx % colors.length],
              borderRadius: "20px",
              width: "100%",
              height: "90px",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#263238",
              cursor: "pointer",
              boxShadow:
                selectedNumber === num
                  ? "0 0 0 5px #2196f3"
                  : "0 2px 10px #eee",
              transition: "box-shadow 0.18s",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              outline: "none",
              userSelect: "none",
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Zoomed modal + sound feedback */}
      {selectedNumber !== null && (
        <div
          onClick={handleModalBackdropClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "rgba(55, 65, 81, 0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "38px",
              padding: "40px 48px",
              minWidth: "330px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
              textAlign: "center",
              transform: "scale(1.15)",
              transition: "transform 0.22s",
              cursor: isSpeaking ? "wait" : "pointer",
            }}
          >
            {/* Speaker icon while sound is playing */}
            <SpeakerIcon active={isSpeaking} />

            <span
              style={{
                fontSize: "7rem",
                fontWeight: "800",
                color: "#1976d2",
                letterSpacing: "0.02em",
                display: "block",
              }}
            >
              {selectedNumber}
            </span>
            <div
              style={{
                marginTop: "22px",
                fontSize: "1.3rem",
                color: "#757575",
              }}
            >
              {isSpeaking
                ? `Speaking... (${speakCountRef.current + 1}/5)`
                : "Tap anywhere to close"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
