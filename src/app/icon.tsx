import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0F0E",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#4FE3C1",
            letterSpacing: "-0.02em",
            fontFamily: "sans-serif",
          }}
        >
          N
        </div>
      </div>
    ),
    { ...size },
  );
}
