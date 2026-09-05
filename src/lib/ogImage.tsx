export const ogImageSize = { width: 1200, height: 630 };

export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0A0F0E",
        padding: "72px 80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -120,
          bottom: -100,
          width: 640,
          height: 90,
          borderRadius: 45,
          background: "linear-gradient(90deg, rgba(79,227,193,0) 0%, #4FE3C1 100%)",
          transform: "rotate(-22deg)",
          opacity: 0.55,
          display: "flex",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "#E6EDEB",
          }}
        >
          NVILE
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 980 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#4FE3C1",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#4FE3C1",
              display: "flex",
            }}
          />
          FORECASTING ENGINE · LIVE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "#E6EDEB",
          }}
        >
          See what is coming before you make the decision.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 22,
          color: "rgba(230,237,235,0.55)",
        }}
      >
        Prediction intelligence — forecasts, evidence and a recommendation, not just a report.
      </div>
    </div>
  );
}
