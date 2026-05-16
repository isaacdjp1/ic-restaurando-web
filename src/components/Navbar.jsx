import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)

  }, [])

  return (

    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}

        <a
          href="#inicio"
          className="text-white text-2xl font-black tracking-tight hover:text-yellow-400 transition"
        >

          IC Restaurando el altar familiar

        </a>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-10">

          <a
            href="#inicio"
            className="text-white/90 hover:text-yellow-400 transition"
          >
            Inicio
          </a>

          <a
            href="#servicios"
            className="text-white/90 hover:text-yellow-400 transition"
          >
            Servicios
          </a>

          <a
            href="#eventos"
            className="text-white/90 hover:text-yellow-400 transition"
          >
            Eventos
          </a>

          <a
            href="#envivo"
            className="text-white/90 hover:text-yellow-400 transition"
          >
            En Vivo
          </a>

          <a
            href="#oracion"
            className="text-white/90 hover:text-yellow-400 transition"
          >
            Oración
          </a>

        </nav>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >

          {menuOpen ? <X size={32} /> : <Menu size={32} />}

        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">

          <nav className="flex flex-col px-6 py-6 gap-6 text-lg">

            <a
              href="#inicio"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-yellow-400 transition"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-yellow-400 transition"
            >
              Servicios
            </a>

            <a
              href="#eventos"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-yellow-400 transition"
            >
              Eventos
            </a>

            <a
              href="#envivo"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-yellow-400 transition"
            >
              En Vivo
            </a>

            <a
              href="#oracion"
              onClick={() => setMenuOpen(false)}
              className="text-white/90 hover:text-yellow-400 transition"
            >
              Oración
            </a>

          </nav>

        </div>

      )}

    </header>
  )
}