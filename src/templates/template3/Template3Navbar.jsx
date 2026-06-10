import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Template3Navbar() {

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
            : "py-6"
        }
      `}
    >

      <div className="max-w-7xl mx-auto px-6">

        <div
          className={`
            flex
            items-center
            justify-between
            rounded-[24px]
            transition-all
            duration-500
            px-6
            lg:px-8
            ${
              scrolled
                ? `
                  bg-slate-950/90
                  backdrop-blur-2xl
                  border
                  border-slate-800
                  shadow-[0_0_40px_rgba(37,99,235,0.15)]
                  py-4
                `
                : `
                  bg-slate-900/60
                  backdrop-blur-xl
                  border
                  border-slate-800
                  py-5
                `
            }
          `}
        >

          {/* LOGO */}

          <a
            href="#inicio"
            className="
              text-white
              text-lg
              md:text-xl
              font-bold
              tracking-tight
              hover:text-blue-400
              transition-all
            "
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            IC Restaurando el Altar Familiar
          </a>

          {/* DESKTOP */}

          <nav className="hidden md:flex items-center gap-10">

            <a
              href="#inicio"
              className="
                text-slate-300
                hover:text-blue-400
                transition-all
              "
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="
                text-slate-300
                hover:text-blue-400
                transition-all
              "
            >
              Servicios
            </a>

            <a
              href="#eventos"
              className="
                text-slate-300
                hover:text-blue-400
                transition-all
              "
            >
              Eventos
            </a>

            <a
              href="#envivo"
              className="
                text-slate-300
                hover:text-blue-400
                transition-all
              "
            >
              En Vivo
            </a>

            <a
              href="#oracion"
              className="
                text-slate-300
                hover:text-blue-400
                transition-all
              "
            >
              Oración
            </a>

          </nav>

          {/* CTA */}

          <a
            href="#envivo"
            className="
              hidden
              lg:flex
              items-center
              justify-center
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-violet-600
              text-white
              font-semibold
              shadow-[0_0_25px_rgba(124,58,237,0.35)]
              hover:scale-105
              transition-all
            "
          >
            Ver Live
          </a>

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
              md:hidden
              text-white
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
              rounded-[28px]
              overflow-hidden
              bg-slate-950
              border
              border-slate-800
              shadow-[0_0_40px_rgba(37,99,235,0.15)]
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
                  text-slate-300
                  hover:text-blue-400
                  transition-all
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
                  text-slate-300
                  hover:text-blue-400
                  transition-all
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
                  text-slate-300
                  hover:text-blue-400
                  transition-all
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
                  text-slate-300
                  hover:text-blue-400
                  transition-all
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
                  text-slate-300
                  hover:text-blue-400
                  transition-all
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