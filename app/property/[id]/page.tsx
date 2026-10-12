"use client"; // Wajib ditambahkan agar tombol klik dan pop-up berfungsi

import React, { useState, use } from "react";
import Link from "next/link";

const getPropertyById = (id: string) => {
  const properties = [
    {
      id: "1",
      title: "Grand Harmoni Residence",
      location: "jalan mutiara, Graha Bunder Asri gresik, Jawa Timur",
      price: 35000000,
      rating: 4.8,
      description: "Rumah nyaman yang terletak di Graha Bunder Asri Gresik. Dekat dengan Iconmall, Rumah sakit ibnu sina, Tol bunder, dan pusat kota Gresik. Cocok untuk keluarga yang mencari hunian yang tenang dan strategis.",
      images: [
        "/images/grand-harmoni/tampak-depan.jpg",
        "/images/grand-harmoni/ruang-tengah.jpg",
        "/images/grand-harmoni/dapur.jpg",
        "/images/grand-harmoni/kamar-mandi.jpg",
        "/images/grand-harmoni/area-cuci.jpg",
        "/images/grand-harmoni/teras.jpg"
      ],
      facilities: ["Parkir Mobil", "2 kamar tidur", "dapur mini", "1 kamar mandi", "ruang keluarga luas"]
    },
    {
      id: "2",
      title: "Rumah Citra Sari Regency",
      location: "Perumahan Citra Sari Regency Blok B3 No. 38 Banjarsari Cerme Gresik",
      price: 30000000,
      rating: 4.9,
      description: "Ukuran 7 m x 10 m = 70 m². Rumah nyaman di Citra Sari Regency Blok B3 No. 38 Banjarsari Cerme Gresik (depan waduk/embung Banjarsari, selatan Terminal Bunder). Suasana lingkungan asri dan tenang.",
      images: [
        "/images/citrasari/tampak-depan.jpg",
        "/images/citrasari/tampak-depan-2.jpg",
        "/images/citrasari/kamar-tidur.jpg",
        "/images/citrasari/dapur.jpg",
        "/images/citrasari/kamar-mandi.jpg"
      ],
      facilities: ["2 kamar tidur", "Garasi Mobil", "Listrik Token 1300 Watt", "Air PDAM", "Dapur Mini", "1 Kamar Mandi"]
    },
    {
      id: "3",
      title: "Perumahan Dinari II",
      location: "Perumahan Dinari II, Manyar, Gresik",
      price: 450000,
      rating: 4.7,
      description: "Rumah siap huni di Perumahan Dinari II, Manyar, Gresik. Dilengkapi dengan pagar depan, teras luas, garasi/carport tertutup, ruang keluarga, serta lingkungan perumahan yang nyaman dan aman.",
      images: [
        "/images/dinari/tampak-depan.jpg",
        "/images/dinari/pagar-depan.jpg",
        "/images/dinari/teras.jpg",
        "/images/dinari/garasi.jpg",
        "/images/dinari/ruang-tengah.jpg",
        "/images/dinari/lorong.jpg",
        "/images/dinari/dapur.jpg",
        "/images/dinari/kamar-mandi.jpg"
      ],
      facilities: ["Garasi / Carport", "Teras & Pagar", "Ruang Keluarga", "Dapur", "Kamar Mandi", "Air Bersih"]
    },
    {
      id: "4",
      title: "Rumah Kawisanyar",
      location: "Kawisanyar, Giri Kedaton, Gresik",
      price: 450000,
      rating: 4.7,
      description: "Rumah 2 lantai yang nyaman di area Kawisanyar, dekat Giri Kedaton, Gresik. Lokasi tenang dengan akses perkampungan asri, cocok untuk tempat tinggal keluarga.",
      images: [
        "/images/kawisanyar/tampak-depan.jpg",
        "/images/kawisanyar/tangga-ruang-tamu.jpg",
        "/images/kawisanyar/kamar-tidur.jpg",
        "/images/kawisanyar/dapur.jpg",
        "/images/kawisanyar/kamar-mandi.jpg",
        "/images/kawisanyar/lorong.jpg",
        "/images/kawisanyar/gang-akses.jpg",
        "/images/kawisanyar/lingkungan.jpg"
      ],
      facilities: ["2 Kamar Tidur", "Ruang Tamu & Tangga", "Dapur", "Kamar Mandi", "Lingkungan Nyaman"]
    }
  ];
  return properties.find(p => p.id === id);
};

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  // Buka params menggunakan React.use() karena ini Client Component
  const resolvedParams = use(params);
  const property = getPropertyById(resolvedParams.id);
  
  // State untuk mengontrol buka/tutup Galeri Foto Layar Penuh
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Properti tidak ditemukan</h1>
        <Link href="/" className="text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">Kembali ke Beranda</Link>
      </div>
    );
  }

  // Pesan WhatsApp
  const waMessage = `Halo, saya tertarik dengan penginapan "${property.title}" di ${property.location}. Apakah masih tersedia untuk disewa?`;
  const secureContactLink = `/api/contact?message=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-white pb-20 font-sans relative">
      
      {/* ========================================= */}
      {/* MODAL GALERI FOTO (Muncul saat tombol diklik) */}
      {/* ========================================= */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-white z-[999] overflow-y-auto">
          {/* Header Popup Galeri */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">Semua Foto ({property.images.length})</h2>
            <button 
              onClick={() => setIsGalleryOpen(false)} 
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-full font-bold transition-colors flex items-center gap-2"
            >
              ✕ Tutup
            </button>
          </div>
          
          {/* Grid Foto di dalam Popup (Bentuk Potret / Memanjang Kebawah) */}
          <div className="p-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {property.images.map((img, index) => (
                // aspect-[3/4] membuat kotaknya memanjang ke bawah seperti rasio HP
                <div key={index} className="w-full aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <img 
                    src={img} 
                    alt={`Foto Lengkap ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* KONTEN HALAMAN UTAMA */}
      {/* ========================================= */}
      <nav className="bg-white border-b py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <Link href="/">
           <h1 className="text-2xl font-bold text-blue-600 tracking-tight hover:opacity-80 transition-opacity">Kontrakan Gresik</h1>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Header Judul & Rating */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="flex items-center gap-1">📍 {property.location}</span>
            <span className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm font-bold">
              ⭐ {property.rating}
            </span>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full h-64 md:h-72 mb-10 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* --- GALERI GAMBAR ALA AGODA --- */}
        {/* Diklik seluruh kotaknya akan membuka modal */}
        <div 
          onClick={() => setIsGalleryOpen(true)}
          className="relative flex flex-col md:flex-row gap-2 mb-16 h-[350px] md:h-[450px] rounded-2xl overflow-hidden cursor-pointer group"
        >
          {/* Gambar Utama (Kiri) */}
          <div className="w-full md:w-2/3 h-full bg-gray-200 relative">
             <img 
               src={property.images[0]} 
               alt={property.title} 
               className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" 
             />
          </div>
          
          {/* Gambar Samping (Kanan) - Disembunyikan di HP, tampil di PC */}
          <div className="hidden md:flex flex-col w-1/3 h-full gap-2 relative">
             <div className="w-full h-1/2 bg-gray-200 relative">
               <img 
                 src={property.images[1] || property.images[0]} 
                 alt="Foto Tambahan 1" 
                 className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" 
               />
             </div>
             <div className="w-full h-1/2 bg-gray-200 relative">
               <img 
                 src={property.images[2] || property.images[0]} 
                 alt="Foto Tambahan 2" 
                 className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-300" 
               />
             </div>
          </div>

          {/* Tombol Overlay "Lihat semua foto" */}
          <div className="absolute bottom-4 right-4 bg-white/95 text-gray-900 px-5 py-2.5 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2 z-10 border border-gray-100 hover:bg-gray-50 hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg>
            Lihat semua foto
          </div>
        </div>
        {/* --- AKHIR GALERI AGODA --- */}

        {/* Konten Deskripsi & Box Harga (Dipastikan tidak bertabrakan) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12 relative z-0">
          
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Tentang Properti Ini</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {property.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5 tracking-tight">Fasilitas Tersedia</h2>
              <ul className="grid grid-cols-2 gap-y-4">
                {property.facilities.map((fac, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                    <span className="text-green-500 bg-green-50 p-1 rounded-full">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </span> 
                    {fac}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="relative">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 sticky top-28">
              <div className="mb-8">
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Harga Sewa</span>
                <p className="text-4xl font-bold text-orange-500 mt-2">
                  Rp {property.price.toLocaleString("id-ID")}
                  <span className="text-base font-normal text-gray-500"> /Tahun</span>
                </p>
              </div>

              <a 
                href={secureContactLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold text-lg py-4 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                Hubungi via WhatsApp
              </a>
              
              <p className="text-sm text-center text-gray-500 mt-5">
                Klik tombol di atas untuk menanyakan ketersediaan secara langsung kepada pemilik.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}