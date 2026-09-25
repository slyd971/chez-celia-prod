export const dynamic = "force-static";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";


const SIZE = { width: 180, height: 180 };

export async function GET() {
  const displayFont = readFileSync(
    join(process.cwd(), "app", "fonts", "BodoniModa-Italic-600.ttf")
  );

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
          fontFamily: "Bodoni Moda",
          fontStyle: "italic",
          fontSize: 130,
          fontWeight: 600,
        }}
      >
        C
      </div>
    ),
    { ...SIZE, fonts: [{ name: "Bodoni Moda", data: displayFont, style: "italic", weight: 600 }] }
  );
}
