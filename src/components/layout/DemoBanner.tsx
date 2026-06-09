export default function DemoBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2d2d2d]/90 backdrop-blur-sm text-white py-2 px-4 text-center text-xs">
      <span className="text-gray-300">Demo de propuesta — sitio no oficial. Desarrollado por </span>
      <a
        href="https://por2duros.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#e07a5f] hover:text-[#f2a98e] underline font-medium transition-colors"
      >
        Por 2 Duros
      </a>
      <span className="text-gray-300">. Los datos de esta demo no se almacenan.</span>
    </div>
  );
}
