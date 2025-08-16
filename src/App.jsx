import React, { useState } from "react";

// Simple color palette matching your screenshot
const colors = [
  "#E3F2FD", "#C8E6C9", "#FFECB3", "#FFCDD2", "#D1C4E9", "#FFE0B2"
];

export default function NumberSystemSVG() {
  const [selectedNumber, setSelectedNumber] = useState(null);

  // Generate 1-100
  const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

  // Handler to close modal
  const handleClose = () => setSelectedNumber(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif"
      }}
    >
      <h1 style={{
        margin: "32px 0 16px",
        fontSize: "2.5rem",
        fontWeight: "700",
        letterSpacing: "0.02em"
      }}>
        Numbers Coach
      </h1>
      <p style={{ color: "#62727b", fontSize: "1.1rem", marginBottom: 24 }}>
        Touch a number to learn and zoom!
      </p>

      {/* Numbers Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "14px",
          width: "90vw",
          maxWidth: "650px",
          background: "#ffffff",
          padding: "28px 18px",
          borderRadius: "20px",
          boxShadow: "0 4px 22px rgba(0,0,0,0.09)"
        }}
      >
        {numbers.map((num, idx) => (
          <button
            key={num}
            onClick={() => setSelectedNumber(num)}
            style={{
              background: colors[idx % colors.length],
              border: "none",
              borderRadius: "12px",
              height: "54px",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#374151",
              cursor: "pointer",
              boxShadow: selectedNumber === num ? "0 0 0 4px #2196f3" : "0 2px 8px #eee",
              transition: "box-shadow 0.18s"
            }}
            aria-label={`Learn number ${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Zoomed modal */}
      {selectedNumber !== null && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0, left: 0, bottom: 0, right: 0,
            background: "rgba(55, 65, 81, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 30
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "38px",
              padding: "48px 64px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
              textAlign: "center",
              transform: "scale(1.12)",
              transition: "transform 0.22s",
              cursor: "pointer"
            }}
          >
            <span style={{
              fontSize: "7rem",
              fontWeight: "800",
              color: "#2196f3",
              letterSpacing: "0.02em",
              display: "block"
            }}>
              {selectedNumber}
            </span>
            <div style={{
              marginTop: "18px",
              fontSize: "1.3rem",
              color: "#757575"
            }}>
              Tap anywhere to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
