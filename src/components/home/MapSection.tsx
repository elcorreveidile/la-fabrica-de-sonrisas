export default function MapSection() {
  return (
    <section className="py-16 bg-[#fdf8f3]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#2d2d2d]">Nos encontrarás en el Realejo</h2>
          <p className="text-[#8b7d72] mt-2">C. Molinos 34, 18009 Granada · A 5 min del centro histórico</p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg h-80 md:h-96 bg-[#f5ede0] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.1766555832447!2d-3.5984!3d37.1760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fcb69e1b19e5%3A0x4b5b3e3e3e3e3e3e!2sCalle%20de%20los%20Molinos%2C%2034%2C%2018009%20Granada!5e0!3m2!1ses!2ses!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa La Fábrica de Sonrisas"
          />
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center text-sm text-[#8b7d72]">
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">📍</p>
            <p className="font-semibold text-[#2d2d2d]">C. Molinos 34</p>
            <p>Realejo, Granada</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">🕘</p>
            <p className="font-semibold text-[#2d2d2d]">L–V 9:30–18:30</p>
            <p className="text-xs">(confirmar horario)</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-[#f5ede0]">
            <p className="text-lg mb-1">📞</p>
            <p className="font-semibold text-[#2d2d2d]">958 XXX XXX</p>
            <p className="text-xs">(placeholder)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
