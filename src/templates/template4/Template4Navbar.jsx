import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Template4Navbar() {

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
            ? "py-3"
            : "py-5"
        }
      `}
    >

      <div className="max-w-7xl mx-auto px-6">

        <div
          className={`
            flex
            items-center
            justify-between
            transition-all
            duration-500
            px-6
            lg:px-10
            rounded-[24px]
            ${
              scrolled
                ? `
                  bg-white/95
                  backdrop-blur-xl
                  border
                  border-zinc-200
                  shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                  py-4
                `
                : `
                  bg-white/85
                  backdrop-blur-md
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
              font-bold
              tracking-tight
            "
            style={{
              fontFamily: "Montserrat",
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

          {/* CTA */}

          <a
            href="#oracion"
            className="
              hidden
              lg:flex
              items-center
              justify-center
              px-6
              py-3
              rounded-xl
              bg-[#C8A96B]
              text-black
              font-semibold
              hover:opacity-90
              transition-all
            "
          >
            Contáctanos
          </a>

          {/* MOBILE */}

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
              rounded-[24px]
              overflow-hidden
              shadow-[0_20px_50px_rgba(0,0,0,0.08)]
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