// app/api/properties/route.ts
import { NextResponse } from "next/server";

const mockPropertiesFromDatabase = [
  {
    id: 1,
    title: "Rumah Nyaman Kota Lama",
    location: "Semarang, Jawa Tengah",
    price: 350000,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Vila Minimalis Dago",
    location: "Bandung, Jawa Barat",
    price: 500000,
    rating: 4.9,
  }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Data properti berhasil diambil",
    data: mockPropertiesFromDatabase
  }, { status: 200 });
}