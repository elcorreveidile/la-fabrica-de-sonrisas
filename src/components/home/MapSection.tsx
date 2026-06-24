export default function MapSection() {
  return (
    <section className="py-16 bg-[#fdf8f3]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#2d2d2d]">Nos encontrarás en el centro</h2>
          <p className="text-[#8b7d72] mt-2">Calle Mayor 1, local 2 · 28013 Madrid · En pleno corazón de la ciudad</p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-80 md:h-96 bg-[#f5ede0] relative">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-3.7100%2C40.4100%2C-3.6900%2C40.4200&layer=mapnik&marker=40.4168%2C-3.7038"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa clínica dental ejemplo"
          />
        </div>
        <div className="mt-6 grid sm:grid-cols-4 gap-4 text-center text-sm text-[#8b7d72]">
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">📍</p>
            <p className="font-semibold text-[#2d2d2d]">Calle Mayor 1, local 2</p>
            <p>Centro, Madrid</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">🕘</p>
            <p className="font-semibold text-[#2d2d2d]">L–V 9:30–18:30</p>
            <p>Sábado y domingo cerrado</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">📞</p>
            <a href="tel:900000000" className="font-semibold text-[#2d2d2d] hover:text-[#e07a5f] transition-colors">
              900 000 000
            </a>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">📱</p>
            <span className="font-semibold text-[#2d2d2d] block">Instagram</span>
            <span className="text-sm text-[#8b7d72]">YouTube</span>
          </div>
        </div>
      </div>
    </section>
  );
}
