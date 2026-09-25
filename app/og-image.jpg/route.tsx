export const dynamic = "force-static";

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { brand, seo } from "@/content/celia";

const SIZE = { width: 1200, height: 630 };

export async function GET() {
  // Polices embarquées explicitement : next/og (Satori) ignore les familles
  // génériques sans fichier de police réellement chargé.
  const displayFont = readFileSync(join(process.cwd(), "app", "fonts", "BodoniModa-Italic-600.ttf"));
  const bodyFont = readFileSync(join(process.cwd(), "app", "fonts", "Manrope-Bold.ttf"));
  const photo = readFileSync(join(process.cwd(), "public", seo.shareImagePhoto));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "radial-gradient(90% 120% at 85% 10%, rgba(255,79,163,0.35), transparent 60%), linear-gradient(180deg, #171310 0%, #231419 100%)",
          padding: 56,
          gap: 60,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={390}
          height={520}
          style={{
            objectFit: "cover",
            borderRadius: "195px 195px 24px 24px",
            border: "4px solid #FF4FA3",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#FF4FA3",
              marginBottom: 24,
            }}
          >
            {`Presskit · ${brand.handle}`}
          </div>
          <div
            style={{
              fontFamily: "Bodoni Moda",
              fontStyle: "italic",
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1,
              color: "#FBF3EE",
            }}
          >
            {brand.name}
          </div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 30,
              fontWeight: 700,
              color: "#F7B6D2",
              marginTop: 32,
              lineHeight: 1.35,
            }}
          >
            {brand.tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "Bodoni Moda", data: displayFont, style: "italic", weight: 600 },
        { name: "Manrope", data: bodyFont, style: "normal", weight: 700 },
      ],
    }
  );

  // JPEG plutôt que PNG : ~5x plus léger. WhatsApp, LinkedIn & co ignorent
  // souvent les images de partage de plus de ~300 Ko.
  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(jpeg), {
    headers: { "Content-Type": "image/jpeg" },
  });
}
