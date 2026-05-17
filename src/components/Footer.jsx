import logoImg from "../assets/images/logo.png"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import Location from "./Location"

export default function Footer() {
  return (
    <footer
      id="nosotros"
      className="bg-gradient-to-b from-black to-zinc-950 text-white pt-20 pb-10 px-6 border-t border-white/10"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start">

        {/* Logo + Visión */}

        <div>

          <img
            src={logoImg}
            alt="IC Restaurando el Altar Familiar"
            className="w-72 mb-8 hover:scale-105 transition-all duration-500"
          />

          <div className="space-y-8">

            <div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                Nuestra Visión
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">

                Restaurar vidas, fortalecer familias y levantar generaciones con propósito a través del poder transformador de Jesucristo y Su Palabra.

              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                Nuestra Misión
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">

                Llevar el mensaje de salvación, esperanza y restauración a cada persona, formando discípulos comprometidos con Dios y Su Reino.

              </p>

            </div>

          </div>

        </div>

        {/* Ubicación */}

        <div>

          <Location />

        </div>

        {/* Redes */}

        <div>

          <h3 className="text-2xl font-bold mb-6">
            Síguenos
          </h3>

          <div className="flex flex-col gap-6 text-lg">

            <a
              href="https://facebook.com/restaurandoeaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 hover:scale-105 hover:translate-x-1 transition-all duration-300"
            >

              <FaFacebookF />

              Facebook

            </a>

            <a
              href="https://instagram.com/restaurandoeaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 hover:scale-105 hover:translate-x-1 transition-all duration-300"
            >

              <FaInstagram />

              Instagram

            </a>

            <a
              href="https://youtube.com/@restaurandoeaf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 hover:scale-105 hover:translate-x-1 transition-all duration-300"
            >

              <FaYoutube />

              YouTube

            </a>

          </div>

        </div>

      </div>

      {/* Línea inferior */}

      <div className="border-t border-white/10 mt-16 pt-8 text-center">

        <p className="text-gray-500 text-sm hover:text-gray-300 transition duration-300">

          © 2026 IC Restaurando el Altar Familiar.
          Todos los derechos reservados.

        </p>

      </div>

    </footer>
  )
}