import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Template2Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () =>
      window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-500
        ${
          scrolled
            ? "py-4"
            : "py-7"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div
          className={`
            flex
            items-center
            justify-between
            rounded-full
            transition-all
            duration-500
            px-6
            lg:px-8
            ${
              scrolled
                ? `
                  bg-white/85
                  backdrop-blur-2xl
                  border
                  border-zinc-200
                  shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                  py-4
                `
                : `
                  bg-white/60
                  backdrop-blur-xl
                  border
                  border-zinc-100
                  py-5
                `
            }
          `}
        >
          {/* LOGO */}

          <a
            href="#inicio"
            className="
              text-black
              text-lg
              md:text-xl
              tracking-tight
              transition
              hover:opacity-70
            "
            style={{
              fontFamily: "Instrument Serif",
            }}
          >
            IC Restaurando el Altar Familiar
          </a>

          {/* DESKTOP */}

          <nav className="hidden md:flex items-center gap-10">
            <a
              href="#inicio"
              className="
                text-zinc-600
                hover:text-black
                transition
              "
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="
                text-zinc-600
                hover:text-black
                transition
              "
            >
              Servicios
            </a>

            <a
              href="#eventos"
              className="
                text-zinc-600
                hover:text-black
                transition
              "
            >
              Eventos
            </a>

            <a
              href="#envivo"
              className="
                text-zinc-600
                hover:text-black
                transition
              "
            >
              En Vivo
            </a>

            <a
              href="#oracion"
              className="
                text-zinc-600
                hover:text-black
                transition
              "
            >
              Oración
            </a>
          </nav>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              md:hidden
              text-black
            "
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <div
            className="
              md:hidden
              mt-4
              bg-white
              border
              border-zinc-200
              rounded-3xl
              shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              overflow-hidden
            "
          >
            <nav
              className="
                flex
                flex-col
                p-6
                gap-6
              "
            >
              <a
                href="#inicio"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  text-zinc-700
                  hover:text-black
                  transition
                "
              >
                Inicio
              </a>

              <a
                href="#servicios"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  text-zinc-700
                  hover:text-black
                  transition
                "
              >
                Servicios
              </a>

              <a
                href="#eventos"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  text-zinc-700
                  hover:text-black
                  transition
                "
              >
                Eventos
              </a>

              <a
                href="#envivo"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  text-zinc-700
                  hover:text-black
                  transition
                "
              >
                En Vivo
              </a>

              <a
                href="#oracion"
                onClick={() =>
                  setMenuOpen(false)
                }
                className="
                  text-zinc-700
                  hover:text-black
                  transition
                "
              >
                Oración
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}