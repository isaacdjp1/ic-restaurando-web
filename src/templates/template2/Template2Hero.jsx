import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

import heroImage1 from "../../assets/images/church.webp"
import heroImage2 from "../../assets/images/gallery5.webp"
import heroImage3 from "../../assets/images/gallery2.webp"
import heroImage4 from "../../assets/images/gallery4.webp"
import heroImage5 from "../../assets/images/gallery6.webp"
import logoImg from "../../assets/images/logo.webp"
import { supabase } from "../../lib/supabase"

export default function Template2Hero() {
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
          className="w-28 animate-pulse"
        />
      </div>
    )
  }

  return (
    <section
      id="inicio"
      className="bg-white min-h-screen pt-36 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          
          {/* CONTENIDO */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroContent?.logo_url || logoImg}
              alt="Logo Iglesia"
              className="w-full max-w-[260px] md:max-w-[320px] mb-10"
            />

            <h1
              className="
                text-black
                text-5xl
                md:text-6xl
                xl:text-7xl
                leading-[0.95]
                tracking-[-0.04em]
                mb-8
                font-serif
              "
              style={{
                fontFamily: "Instrument Serif",
              }}
            >
              {heroContent?.titulo ||
                "Más que una iglesia, una familia transformada por Dios."}
            </h1>

            <p
              className="
                text-zinc-600
                text-lg
                md:text-xl
                leading-relaxed
                max-w-xl
                mb-10
              "
              style={{
                fontFamily: "Manrope",
              }}
            >
              Un lugar donde la fe, la comunidad y el propósito se unen para
              impactar vidas y fortalecer familias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={heroContent?.boton_link || "#envivo"}
                className="
                  bg-black
                  text-white
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  transition
                  hover:opacity-90
                "
                style={{
                  fontFamily: "Manrope",
                }}
              >
                {heroContent?.boton_texto || "Ver Transmisión"}
              </a>

              <a
                href="#nosotros"
                className="
                  border
                  border-zinc-300
                  text-black
                  px-8
                  py-4
                  rounded-full
                  font-medium
                  transition
                  hover:bg-zinc-100
                "
                style={{
                  fontFamily: "Manrope",
                }}
              >
                Conocer Más
              </a>
            </div>
          </motion.div>

          {/* IMAGEN */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div
              className="
                overflow-hidden
                rounded-[36px]
                shadow-[0_30px_80px_rgba(0,0,0,0.12)]
              "
            >
              <motion.img
                key={images[currentImage]}
                src={images[currentImage]}
                alt="Iglesia"
                animate={{
                  opacity: fade ? 1 : 0,
                  scale: 1.03,
                }}
                transition={{
                  opacity: { duration: 1.2 },
                  scale: { duration: 10 },
                }}
                className="
                  w-full
                  h-[500px]
                  md:h-[650px]
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