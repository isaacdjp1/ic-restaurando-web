import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import Template2Location from "./Template2Location"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template2Footer() {
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
      className="
        bg-white
        pt-32
        pb-12
        px-6
        border-t
        border-zinc-200
      "
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div
          className="
            grid
            lg:grid-cols-[1.3fr_1fr_0.8fr]
            gap-16
            items-start
          "
        >
          {/* LOGO + CONTENIDO */}

          <div>
            <img
              src={heroData?.logo_url}
              alt="Logo Iglesia"
              className="
                w-full
                max-w-[280px]
                mb-10
              "
            />

            <div className="space-y-10">
              <div>
                <h3
                  className="
                    text-4xl
                    text-black
                    mb-4
                  "
                  style={{
                    fontFamily: "Instrument Serif",
                  }}
                >
                  Nuestra Visión
                </h3>

                <p
                  className="
                    text-zinc-600
                    leading-relaxed
                    text-lg
                  "
                >
                  {footer?.vision}
                </p>
              </div>

              <div>
                <h3
                  className="
                    text-4xl
                    text-black
                    mb-4
                  "
                  style={{
                    fontFamily: "Instrument Serif",
                  }}
                >
                  Nuestra Misión
                </h3>

                <p
                  className="
                    text-zinc-600
                    leading-relaxed
                    text-lg
                  "
                >
                  {footer?.mission}
                </p>
              </div>
            </div>
          </div>

          {/* UBICACIÓN */}

          <div>
            <Template2Location />
          </div>

          {/* REDES */}

          <div>
            <h3
              className="
                text-4xl
                text-black
                mb-8
              "
              style={{
                fontFamily: "Instrument Serif",
              }}
            >
              Síguenos
            </h3>

            <div className="flex flex-col gap-5">
              <a
                href={footer?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-4
                  text-zinc-600
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaFacebookF />
                Facebook
              </a>

              <a
                href={footer?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-4
                  text-zinc-600
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaInstagram />
                Instagram
              </a>

              <a
                href={footer?.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-4
                  text-zinc-600
                  hover:text-black
                  transition-all
                  duration-300
                "
              >
                <FaYoutube />
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}

        <div
          className="
            h-px
            bg-zinc-200
            my-16
          "
        />

        {/* FOOTER BOTTOM */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >
          <p
            className="
              text-zinc-500
              text-sm
            "
          >
            {footer?.copyright}
          </p>

          <p
            className="
              text-zinc-400
              text-sm
            "
          >
            Powered by Veyron Church CMS
          </p>
        </div>
      </div>
    </footer>
  )
}