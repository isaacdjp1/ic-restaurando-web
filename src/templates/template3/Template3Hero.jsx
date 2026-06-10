import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

import heroImage1 from "../../assets/images/church.webp"
import heroImage2 from "../../assets/images/gallery5.webp"
import heroImage3 from "../../assets/images/gallery2.webp"
import heroImage4 from "../../assets/images/gallery4.webp"
import heroImage5 from "../../assets/images/gallery6.webp"
import logoImg from "../../assets/images/logo.webp"
import { supabase } from "../../lib/supabase"

export default function Template3Hero() {

  const [currentImage, setCurrentImage] = useState(0)
  const [fade, setFade] = useState(true)
  const [heroContent, setHeroContent] = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  const images = useMemo(
    () => [
      heroContent?.slide1 || heroImage1,
      heroContent?.slide2 || heroImage2,
      heroContent?.slide3 || heroImage3,
      heroContent?.slide4 || heroImage4,
      heroContent?.slide5 || heroImage5,
    ],
    [heroContent]
  )

  useEffect(() => {

    const interval = setInterval(() => {

      setFade(false)

      setTimeout(() => {

        setCurrentImage((prev) => {

          if (prev === images.length - 1) {

            return 0

          }

          return prev + 1

        })

        setFade(true)

      }, 1200)

    }, 9000)

    return () => clearInterval(interval)

  }, [images])

  useEffect(() => {

    fetchHeroContent()

  }, [])

  async function fetchHeroContent() {

    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .eq("activo", true)
      .single()

    if (error) {

      console.log(error)

    } else {

      setHeroContent(data)

      setCurrentImage(0)

      setHeroLoaded(true)

    }

  }

  useEffect(() => {

    images.forEach((img) => {

      const image = new Image()

      image.src = img

    })

  }, [images])

  if (!heroLoaded) {

    return (

      <div className="h-screen bg-slate-950 flex items-center justify-center">

        <img
          src={logoImg}
          alt="Logo"
          className="w-32 animate-pulse"
        />

      </div>

    )

  }

  return (

    <section
      id="inicio"
      className="
        min-h-screen
        bg-slate-950
        pt-32
        pb-20
        px-6
        overflow-hidden
        relative
      "
    >

      {/* GLOWS */}

      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-blue-600/20
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-violet-600/20
          blur-[140px]
        "
      />

      <div className="max-w-7xl mx-auto relative z-10">

        <div
          className="
            grid
            lg:grid-cols-2
            gap-16
            items-center
          "
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

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

            <img
              src={heroContent?.logo_url || logoImg}
              alt="Logo Iglesia"
              className="
                w-full
                max-w-[220px]
                mb-10
              "
            />

            <h1
              className="
                text-white
                text-5xl
                md:text-7xl
                xl:text-8xl
                leading-[0.95]
                mb-8
              "
              style={{
                fontFamily: "Space Grotesk",
              }}
            >
              {heroContent?.titulo ||
                "Una generación transformada para impactar el mundo"}
            </h1>

            <p
              className="
                text-slate-400
                text-lg
                md:text-xl
                leading-relaxed
                max-w-xl
                mb-10
              "
            >
              Un espacio donde la fe, la creatividad y el propósito
              se unen para construir una comunidad fuerte y relevante.
            </p>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                mb-14
              "
            >

              <a
                href={heroContent?.boton_link || "#envivo"}
                className="
                  bg-gradient-to-r
                  from-blue-600
                  to-violet-600
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  text-center
                  hover:scale-105
                  transition-all
                  shadow-[0_0_30px_rgba(124,58,237,0.35)]
                "
              >
                {heroContent?.boton_texto ||
                  "Ver Transmisión"}
              </a>

              <a
                href="#nosotros"
                className="
                  border
                  border-slate-700
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  text-center
                  hover:border-blue-500
                  transition-all
                "
              >
                Conocer Más
              </a>

            </div>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-3
                gap-4
              "
            >

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-5
                "
              >

                <p
                  className="
                    text-3xl
                    text-white
                    font-bold
                  "
                >
                  +500
                </p>

                <p
                  className="
                    text-slate-500
                    text-sm
                  "
                >
                  Comunidad
                </p>

              </div>

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-5
                "
              >

                <p
                  className="
                    text-3xl
                    text-white
                    font-bold
                  "
                >
                  +50
                </p>

                <p
                  className="
                    text-slate-500
                    text-sm
                  "
                >
                  Eventos
                </p>

              </div>

              <div
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-5
                "
              >

                <p
                  className="
                    text-3xl
                    text-white
                    font-bold
                  "
                >
                  24/7
                </p>

                <p
                  className="
                    text-slate-500
                    text-sm
                  "
                >
                  Conexión
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative"
          >

            {/* FLOATING CARD */}

            <div
              className="
                absolute
                -top-6
                -left-6
                z-20
                bg-slate-900
                border
                border-blue-500/20
                rounded-3xl
                px-5
                py-4
                shadow-[0_0_40px_rgba(37,99,235,0.2)]
              "
            >

              <p
                className="
                  text-blue-400
                  text-sm
                  mb-1
                "
              >
                Próximo Evento
              </p>

              <p
                className="
                  text-white
                  font-semibold
                "
              >
                Youth Conference
              </p>

            </div>

            <div
              className="
                rounded-[40px]
                overflow-hidden
                border
                border-slate-800
                shadow-[0_40px_100px_rgba(0,0,0,0.4)]
              "
            >

              <motion.img
                key={images[currentImage]}
                src={images[currentImage]}
                alt="Iglesia"
                animate={{
                  opacity: fade ? 1 : 0,
                  scale: 1.08,
                }}
                transition={{
                  opacity: {
                    duration: 1.2,
                  },
                  scale: {
                    duration: 10,
                  },
                }}
                className="
                  w-full
                  h-[500px]
                  md:h-[700px]
                  object-cover
                "
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>

  )

}