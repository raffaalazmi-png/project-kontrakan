// app/page.tsx
import Link from "next/link";

// Data properti disesuaikan dengan area Gresik
const properties = [
  {
    id: "1",
    title: "Grand Harmoni Residence",
    location: "Jalan Mutiara, Graha Bunder Asri, Gresik, Jawa Timur",
    price: 35000000,
    rating: 4.8,
    image: "/images/grand-harmoni/tampak-depan.jpg",
  },
  {
    id: "2",
    title: "Rumah Citra Sari Regency",
    location: " [ CSR ] Blok B3 No. 38 Banjarsari Cerme Gresik Depan Waduk / Embung Banjarsari / Bunder atau Selatan Termjnal Bunder",
    price: 30000000,
    rating: 4.9,
    image: "/images/citrasari/tampak-depan.jpg",
  },
  {
    id: "3",
    title: "Perumahan Dinari II",
    location: "Manyar, Gresik",
    price: 450000,
    rating: 4.7,
    image: "/images/dinari/tampak-depan.jpg",
  },
  {
    id: "4",
    title: "Rumah Kawisanyar",
    location: "giri kedaton, Gresik",
    price: 450000,
    rating: 4.7,
    image: "/images/kawisanyar/tampak-depan.jpg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12 font-sans">
      
      {/* Navbar - Tombol Login & Register Dihapus */}
      <nav className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <Link href="/">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Kontrakan Gresik</h1>
        </Link>
        {/* Area kosong di kanan agar logo tetap di kiri */}
        <div></div>
      </nav>

      {/* Hero Section - Diubah menjadi kalimat target Gresik & Form Dihapus */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Temukan Rumah Nyaman di Daerah Gresik
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Pilih dan pesan rumah sewaan atau penginapan terbaik di Gresik dengan mudah, aman, dan langsung terhubung dengan pemilik via WhatsApp.
        </p>
      </section>

      {/* Daftar Properti / Rekomendasi */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Rekomendasi Populer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id} className="block group">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
                
                {/* Gambar Rumah */}
                <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                   <img 
                     src={property.image} 
                     alt={property.title} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                   />
                </div>
                
                {/* Detail Rumah */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-xl text-gray-900 line-clamp-1">{property.title}</h4>
                    <span className="flex items-center text-sm font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-lg">
                      ⭐ {property.rating}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 flex items-center gap-1">📍 {property.location}</p>
                  
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Harga Sewa</span>
                      <p className="font-bold text-orange-500 text-xl">
                        Rp {property.price.toLocaleString("id-ID")} <span className="text-sm font-normal text-gray-500">/Tahun</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>
      
    </main>
  );
}