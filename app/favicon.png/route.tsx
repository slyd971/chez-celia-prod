export const dynamic = "force-static";

import { ImageResponse } from "next/og";


const SIZE = { width: 32, height: 32 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#171310",
          color: "#FF4FA3",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        C
      </div>
    ),
    { ...SIZE }
  );
}
