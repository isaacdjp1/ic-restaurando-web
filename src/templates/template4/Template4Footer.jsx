import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa"
import Template4Location from "./Template4Location"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template4Footer() {

  const [footer, setFooter] = useState(null)

  const [heroData, setHeroData] = useState(null)

  useEffect(() => {

    fetchFooter()

    fetchHero()

  }, [])

  async function fetchFooter() {

    const { data } = await supabase
      .from("footer_content")
      .select("*")
      .eq("activo", true)
      .single()

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
        bg-[#111111]
        text-white
        pt-32
        pb-10
        px-6
      "
    >

      <div className="max-w-7xl mx-auto">

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
                max-w-[300px]
                mb-10
              "
            />

            <div
              className="
                inline-flex
                px-5
                py-2
                rounded-full
                bg-[#C8A96B]/10
                border
                border-[#C8A96B]/20
                text-[#C8A96B]
                text-sm
                font-semibold
                mb-8
              "
            >
              Iglesia Familiar
            </div>

            <div className="space-y-10">

              <div>

                <h3
                  className="
                    text-3xl
                    font-bold
                    mb-4
                  "
                  style={{
                    fontFamily: "Montserrat"
                  }}
                >
                  Nuestra Visión
                </h3>

                <p
                  className="
                    text-zinc-400
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
                    font-bold
                    mb-4
                  "
                  style={{
                    fontFamily: "Montserrat"
                  }}
                >
                  Nuestra Misión
                </h3>

                <p
                  className="
                    text-zinc-400
                    leading-relaxed
                  "
                >
                  {footer?.mission}
                </p>

              </div>

            </div>

          </div>

          {/* UBICACIÓN */}

          <div>

            <Template4Location />

          </div>

          {/* REDES */}

          <div>

            <h3
              className="
                text-3xl
                font-bold
                mb-8
              "
              style={{
                fontFamily: "Montserrat"
              }}
            >
              Síguenos
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
                  bg-white/5
                  border
                  border-white/10
                  text-zinc-300
                  hover:border-[#C8A96B]
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
                  bg-white/5
                  border
                  border-white/10
                  text-zinc-300
                  hover:border-[#C8A96B]
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
                  bg-white/5
                  border
                  border-white/10
                  text-zinc-300
                  hover:border-[#C8A96B]
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
            bg-white/10
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
              text-zinc-500
              text-sm
            "
          >
            {footer?.copyright}
          </p>

          <p
            className="
              text-zinc-500
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