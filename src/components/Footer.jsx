import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import Location from "./Location"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Footer() {
   const [footer, setFooter] = useState(null)
   const [heroData, setHeroData] = useState(null)

  useEffect(() => {

    fetchFooter()

    fetchHero()

  }, [])

  async function fetchFooter() {

    const { data, error } = await supabase
      .from("footer_content")
      .select("*")
      .eq("activo", true)
      .single()

    console.log(data)
    console.log(error)

    if (data) {

      setFooter(data)

    }


  }

  async function fetchHero() {

  const { data } = await supabase
    .from("hero_content")
    .select("*")
    .eq("id", 1)
    .single()

  if (data) {

    setHeroData(data)

  }

}

  return (
    <footer
      id="nosotros"
      className="bg-gradient-to-b from-black to-zinc-950 text-white pt-20 pb-10 px-6 border-t border-white/10"
    >

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start">

        {/* Logo + Visión */}

        <div>

          <img
            src={heroData?.logo_url}
            alt="IC Restaurando el Altar Familiar"
            className="w-72 mb-8 hover:scale-105 transition-all duration-500"
          />

          <div className="space-y-8">

            <div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                Nuestra Visión
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">

                {footer?.vision}

              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                Nuestra Misión
              </h3>

              <p className="text-gray-300 leading-relaxed text-lg">

                {footer?.mission}

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
              href={footer?.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 hover:scale-105 hover:translate-x-1 transition-all duration-300"
            >

              <FaFacebookF />

              Facebook

            </a>

            <a
              href={footer?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 hover:scale-105 hover:translate-x-1 transition-all duration-300"
            >

              <FaInstagram />

              Instagram

            </a>

            <a
              href={footer?.youtube}
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

          {footer?.copyright}

        </p>

      </div>

    </footer>
  )
}