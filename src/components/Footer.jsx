import logoImg from "../assets/images/logo.png"
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-black to-zinc-950 text-white pt-20 pb-10 px-6 border-t border-white/10"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">

        {/* Logo */}

        <div>

          <img
            src={logoImg}
            alt="IC Restaurando el Altar Familiar"
            className="w-72 mb-8"
          />

          <p className="text-gray-300 leading-relaxed text-lg">

           Somos una iglesia apasionada por la presencia de Dios, dedicada a restaurar vidas, fortalecer familias y levantar generaciones con propósito a través de Su Palabra.

          </p>

        </div>

        {/* Horarios */}

        <div>

          <h3 className="text-2xl font-bold mb-6">
            Horarios
          </h3>

          <div className="space-y-3 text-gray-300">

            <p>
              Martes • Escuela de Formación • 7:00 PM
            </p>

            <p>
              Miércoles y Sábados • Ayuno Congregacional • 9:30 AM
            </p>

            <p>
              Viernes • Servicio Congregacional • 7:00 PM
            </p>

            <p>
              Sábado • Servicio Juvenil GPC • 5:30 PM
            </p>

            <p>
              Domingo • Escuela Dominical • 9:00 AM
            </p>

            <p className="text-yellow-400 pt-2">
              Barranquilla, Colombia
            </p>

          </div>

        </div>

        {/* Redes */}

        <div>

          <h3 className="text-2xl font-bold mb-6">
            Síguenos
          </h3>

          <div className="flex flex-col gap-5 text-lg">

        <a
        href="https://facebook.com/TU_PAGINA"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition duration-300"
        >

    <FaFacebookF />

    Facebook

  </a>

        <a
        href="https://instagram.com/restaurandoeaf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition duration-300"
        >

    <FaInstagram />

    Instagram

  </a>

        <a
        href="https://youtube.com/@restaurandoeaf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition duration-300"
        >

    <FaYoutube />

    YouTube

  </a>

          </div>

        </div>

      </div>

      {/* Línea inferior */}

      <div className="border-t border-white/10 mt-16 pt-8 text-center">

        <p className="text-gray-500 text-sm">

          © 2026 IC Restaurando el Altar Familiar.
          Todos los derechos reservados.

        </p>

      </div>

    </footer>
  )
}