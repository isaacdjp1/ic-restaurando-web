import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import Template3Location from "./Template3Location"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template3Footer() {

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
        bg-slate-950
        border-t
        border-slate-800
        pt-32
        pb-10
        px-6
        relative
        overflow-hidden
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-blue-600/10
          blur-[150px]
          pointer-events-none
        "
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP */}

        <div
          className="
            grid
            lg:grid-cols-[1.3fr_1fr_0.8fr]
            gap-16
          "
        >

          {/* BRAND */}

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

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-300
                text-sm
                mb-8
              "
            >
              Nueva Generación
            </div>

            <div className="space-y-10">

              <div>

                <h3
                  className="
                    text-3xl
                    text-white
                    mb-4
                  "
                  style={{
                    fontFamily: "Space Grotesk"
                  }}
                >
                  Nuestra Visión
                </h3>

                <p
                  className="
                    text-slate-400
                    leading-relaxed
                  "
                >
                  {footer?.vision}
                </p>

              </div>

              <div>

                <h3
                  className="
                    text-3xl
                    text-white
                    mb-4
                  "
                  style={{
                    fontFamily: "Space Grotesk"
                  }}
                >
                  Nuestra Misión
                </h3>

                <p
                  className="
                    text-slate-400
                    leading-relaxed
                  "
                >
                  {footer?.mission}
                </p>

              </div>

            </div>

          </div>

          {/* LOCATION */}

          <div>

            <Template3Location />

          </div>

          {/* SOCIALS */}

          <div>

            <h3
              className="
                text-3xl
                text-white
                mb-8
              "
              style={{
                fontFamily: "Space Grotesk"
              }}
            >
              Conecta
            </h3>

            <div className="space-y-4">

              <a
                href={footer?.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-2xl
                  bg-slate-900
                  border
                  border-slate-800
                  text-slate-300
                  hover:border-blue-500/40
                  hover:text-white
                  transition-all
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
                  p-4
                  rounded-2xl
                  bg-slate-900
                  border
                  border-slate-800
                  text-slate-300
                  hover:border-violet-500/40
                  hover:text-white
                  transition-all
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
                  p-4
                  rounded-2xl
                  bg-slate-900
                  border
                  border-slate-800
                  text-slate-300
                  hover:border-red-500/40
                  hover:text-white
                  transition-all
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
            bg-gradient-to-r
            from-transparent
            via-slate-700
            to-transparent
            my-16
          "
        />

        {/* BOTTOM */}

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
              text-slate-500
              text-sm
            "
          >
            {footer?.copyright}
          </p>

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              text-slate-500
            "
          >

            <span
              className="
                w-2
                h-2
                bg-blue-500
                rounded-full
                animate-pulse
              "
            />

            Powered by Veyron Church CMS

          </div>

        </div>

      </div>

    </footer>

  )

}