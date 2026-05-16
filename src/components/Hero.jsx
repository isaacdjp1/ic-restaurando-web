import { motion } from "framer-motion"

import heroImage from "../assets/images/church.jpg"
import logoImg from "../assets/images/logo.png"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >

      {/* Background */}

      <img
        src={heroImage}
        alt="Iglesia"
        className="absolute inset-0 w-full h-full object-cover scale-110 animate-[slowZoom_12s_ease-in-out_infinite_alternate]"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl -mt-8"
      >

        {/* Logo */}

        <img
          src={logoImg}
          alt="IC Restaurando el Altar Familiar"
          className="w-full max-w-lg md:max-w-xl mx-auto mb-4 drop-shadow-2xl"
        />

        {/* Text */}

        <h1 className="text-xl md:text-3xl font-semibold text-white leading-relaxed mb-6 max-w-4xl mx-auto">

          Un lugar donde Dios transforma vidas,
          restaura familias y levanta generaciones.

        </h1>

        {/* Buttons */}

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          <a
            href="#envivo"
            className="bg-yellow-500 hover:bg-yellow-400 hover:scale-105 active:scale-95 text-black px-8 py-4 rounded-2xl font-bold transition duration-300 text-base shadow-2xl"
          >

            Ver Transmisión

          </a>

          <a
            href="#oracion"
            className="border border-white/40 text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition duration-300 text-base backdrop-blur-sm"
          >

            Pedir Oración

          </a>

        </div>

      </motion.div>

    </section>
  )
}