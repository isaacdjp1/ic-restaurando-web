import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import PageWrapper from "../components/PageWrapper"

export default function AdminHome() {

  const navigate = useNavigate()

  const cards = [

    {
      title: "Flyers",
      description:
        "Gestiona eventos, imágenes y contenido dinámico.",
      route: "/admin/flyers",
      icon: "🎨"
    },

    {
      title: "Peticiones",
      description:
        "Administra peticiones de oración en tiempo real.",
      route: "/admin/peticiones",
      icon: "🙏"
    },

    {
      title: "Livestream",
      description:
        "Configura transmisiones y enlaces en vivo.",
      route: "/admin/livestream",
      icon: "📡"
    },

    {
      title: "Galería",
      description:
        "Sube y administra imágenes de la iglesia.",
      route: "/admin/galeria",
      icon: "📸"
    },

    {
    title: "Portada Web",
    description:
    "Edita el contenido principal de la Portada de tu Web dinámicamente.",
    route: "/admin/hero",
    icon: "🔥"
},

{
  title: "Contenido",
  description:
    "Administra servicios, horarios y contenido general.",
  route: "/admin/contenido",
  icon: "📄"
},

{
  title: "Configuración",
  description:
    "Controla branding, redes e idioma.",
  route: "/admin/configuracion",
  icon: "⚙️"
}

  ]



  return (

    <PageWrapper>

      <section className="
      min-h-screen
      bg-[#f5f5f7]
      text-[#111111]
      overflow-hidden
     ">

        {/* BACKGROUND GLOW */}

        


        {/* HERO */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.7
          }}

          className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20"
        >
          <div className="max-w-3xl">

            <p className="
            uppercase
            tracking-[5px]
            text-zinc-400
            mb-6
            text-sm
            font-medium
            ">
              PANEL CMS
            </p>

            <h1 className="
            text-5xl
            md:text-6xl
            font-semibold
            tracking-tight
            leading-[0.95]
            max-w-4xl
            mb-12
            ">

              Controla toda tu iglesia
              <br />
              de forma simple.

            </h1>

            {/* MINI CARDS */}

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl">

              {[

                {
                  title: "Flyers & Eventos",
                  category: "Gestión"
                },

                {
                  title: "Peticiones Live",
                  category: "Sistema"
                },

                {
                  title: "Livestream CMS",
                  category: "Multimedia"
                }

              ].map((item, index) => (

                <motion.div
                  key={index}

                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.96
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}

                  whileHover={{
                    y: -6,
                    scale: 1.02
                  }}

                  className="
                    bg-white
                   border border-zinc-200
                   shadow-sm
                    rounded-3xl
                    p-8
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:shadow-md
                    hover:border-zinc-300
                  "
                >

                  <p className="text-zinc-400 text-sm mb-4 uppercase tracking-[3px]">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-semibold tracking-tight leading-tight">
                    {item.title}
                  </h3>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>

        {/* MAIN GRID */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {cards.map((card, index) => (

              <motion.div
                key={index}

                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.96
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}

                transition={{
                  duration: 0.5,
                  delay: index * 0.08
                }}

                whileHover={{
                  y: -10,
                  scale: 1.03
                }}

                onClick={() => navigate(card.route)}

                className="
                  group
                  relative
                  overflow-hidden
                  bg-white
                  border border-zinc-200
                  shadow-sm
                  rounded-3xl
                  p-8
                  cursor-pointer
                  transition-all duration-500
                  hover:shadow-lg
                  hover:border-zinc-300
                "
              >

                {/* Icon */}

                <motion.div

                  whileHover={{
                    rotate: 4
                  }}

                  className="
                    relative z-10
                    w-20 h-20
                    rounded-3xl
                    bg-gradient-to-br
                    from-zinc-100
                    to-zinc-50
                    flex items-center justify-center
                    text-3xl
                    mb-8
                    shadow-lg
                    shadow-zinc-200
                    transition-all duration-300
                    group-hover:scale-110
                  "
                >

                  <span className="group-hover:scale-110 transition-all duration-300">
                    {card.icon}
                  </span>

                </motion.div>

                {/* Content */}

                <div className="relative z-10">

                  <h2
                 className="
                 text-2xl
                 font-semibold
                 tracking-tight
                 mb-3
                 leading-tight
                 "
        >
  {card.title}
</h2>

                  <p className="text-zinc-500 leading-relaxed">
                    {card.description}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </PageWrapper>

  )

}