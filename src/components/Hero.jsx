import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

import heroImage1 from "../assets/images/church.webp"
import heroImage2 from "../assets/images/gallery5.webp"
import heroImage3 from "../assets/images/gallery2.webp"
import heroImage4 from "../assets/images/gallery4.webp"
import heroImage5 from "../assets/images/gallery6.webp"
import logoImg from "../assets/images/logo.webp"
import { supabase } from "../lib/supabase"


export default function Hero() {

  const [currentImage, setCurrentImage] = useState(0)
  const [fade, setFade] = useState(true)
  const [heroContent, setHeroContent] = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  const images = useMemo(() => [

  heroContent?.slide1 || heroImage1,
  heroContent?.slide2 || heroImage2,
  heroContent?.slide3 || heroImage3,
  heroContent?.slide4 || heroImage4,
  heroContent?.slide5 || heroImage5,

], [heroContent])

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

    console.log(data)

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

    <div className="h-screen bg-black flex items-center justify-center">

      <img
        src={logoImg}
        className="w-40 animate-pulse"
      />

    </div>

  )

}

return (

    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Background Slideshow */}

      <motion.img
      key={images[currentImage]}
      src={images[currentImage]}
        alt="Iglesia"
        animate={{
          opacity: fade ? 1 : 0,
          scale: 1.15,
        }}
        transition={{
          opacity: { duration: 1.5 },
          scale: { duration: 10 },
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl -mt-8"
      >

        {/* Logo */}

        <img
          src={heroContent?.logo_url || logoImg}
          alt="IC Restaurando el Altar Familiar"
          className="w-full max-w-lg md:max-w-xl mx-auto mb-4 drop-shadow-2xl hover:scale-105 transition-all duration-500"
        />

        {/* Text */}

        <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-8 max-w-3xl mx-auto tracking-tight">

          {
          heroContent?.titulo ||
         `Más que una iglesia,
         una familia transformada por Dios.`
        }

        </h1>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          <a
            href={heroContent?.boton_link || "#envivo"}
            className="bg-yellow-500 hover:bg-yellow-400 hover:scale-110 hover:-translate-y-1 active:scale-95 text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300 text-base shadow-2xl hover:shadow-yellow-500/30 hover:shadow-2xl"
          >

            {
            heroContent?.boton_texto ||
            "Ver Transmisión"
            }

          </a>

          <a
            href="#nosotros"
            className="border border-yellow-500/50 text-yellow-400 px-8 py-4 rounded-2xl hover:bg-yellow-500 hover:text-black hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 text-base backdrop-blur-sm hover:shadow-yellow-500/30 hover:shadow-2xl"
          >

            Acerca de Nosotros

          </a>

        </div>

      </motion.div>

    </section>
  )
}