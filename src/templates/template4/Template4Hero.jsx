import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

import heroImage1 from "../../assets/images/church.webp"
import heroImage2 from "../../assets/images/gallery5.webp"
import heroImage3 from "../../assets/images/gallery2.webp"
import heroImage4 from "../../assets/images/gallery4.webp"
import heroImage5 from "../../assets/images/gallery6.webp"
import logoImg from "../../assets/images/logo.webp"
import { supabase } from "../../lib/supabase"

export default function Template4Hero() {

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

      <div className="h-screen bg-white flex items-center justify-center">

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
        bg-white
        pt-32
        pb-24
      "
    >

      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
            rounded-[40px]
            overflow-hidden
            border
            border-zinc-200
            shadow-[0_30px_80px_rgba(0,0,0,0.08)]
          "
        >

          <div className="relative">

            {/* HERO IMAGE */}

            <motion.img
              key={images[currentImage]}
              src={images[currentImage]}
              alt="Iglesia"
              animate={{
                opacity: fade ? 1 : 0,
                scale: 1.05,
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
                h-[550px]
                md:h-[700px]
                object-cover
              "
            />

            {/* OVERLAY */}

            <div
              className="
                absolute
                inset-0
                bg-black/45
              "
            />

            {/* CONTENT */}

            <div
           className="
           absolute
           inset-0
           flex
           items-center
           justify-center
  "
>

             <div
            className="
            max-w-5xl
            mx-auto
            px-8
            text-center
  "
>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >

                  <img
                    src={
                      heroContent?.logo_url ||
                      logoImg
                    }
                    alt="Logo Iglesia"
                    className="
                      w-full
                      max-w-[220px]
                      mb-8
                      mx-auto
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
                      bg-white/10
                      backdrop-blur-md
                      border
                      border-white/20
                      text-white
                      text-sm
                      mb-8
                    "
                  >
                    Bienvenidos
                  </div>

                  <h1
                    className="
                      text-white
                      text-5xl
                      md:text-7xl
                      leading-[0.95]
                      mb-8
                      font-bold
                    "
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {heroContent?.titulo}
                  </h1>

                  <p
                    className="
                      text-zinc-200
                      text-lg
                      md:text-xl
                      leading-relaxed
                      max-w-2xl
                      mb-10
                    "
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    Un lugar para crecer en la fe,
                    fortalecer familias y construir una
                    comunidad sólida centrada en Cristo.
                  </p>

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      gap-4
                    "
                  >

                    <a
                      href={
                        heroContent?.boton_link ||
                        "#envivo"
                      }
                      className="
                        bg-[#C8A96B]
                        text-black
                        px-8
                        py-4
                        rounded-xl
                        font-semibold
                        text-center
                        hover:opacity-90
                        transition
                      "
                    >
                      {heroContent?.boton_texto}
                    </a>

                    <a
                      href="#nosotros"
                      className="
                        border
                        border-white/30
                        text-white
                        px-8
                        py-4
                        rounded-xl
                        text-center
                        hover:bg-white/10
                        transition
                      "
                    >
                      Conocer Más
                    </a>

                  </div>

                </motion.div>

              </div>

            </div>

          </div>

          

        </div>

      </div>

    </section>

  )

}