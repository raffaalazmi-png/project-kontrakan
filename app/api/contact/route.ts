// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Ambil pesan dari URL parameter
  const { searchParams } = new URL(request.url);
  const message = searchParams.get("message") || "Halo, saya ingin bertanya tentang properti.";

  // Ambil nomor WA dari server environment (.env.local atau Vercel Environment Variables)
  const rawNumber = process.env.SECRET_WA_NUMBER;

  if (!rawNumber) {
    return NextResponse.json({ error: "Nomor WA belum dikonfigurasi di server" }, { status: 500 });
  }

  // Bersihkan format (hanya angka) dan ubah awalan 0 menjadi 62 untuk WhatsApp internasional
  let waNumber = rawNumber.replace(/\D/g, "");
  if (waNumber.startsWith("0")) {
    waNumber = "62" + waNumber.slice(1);
  }

  // Buat URL WhatsApp
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  // Redirect pengguna secara langsung dari sisi server
  return NextResponse.redirect(waUrl);
}