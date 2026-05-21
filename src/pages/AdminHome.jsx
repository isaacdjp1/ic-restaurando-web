import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
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
    }

  ]

  async function handleLogout() {

    await supabase.auth.signOut()

    navigate("/login")

  }

  return (

    <PageWrapper>

      <section className="bg-black min-h-screen text-white overflow-hidden">

        {/* BACKGROUND GLOW */}

        <div className="fixed inset-0 overflow-hidden pointer-events-none">

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              duration: 1.2
            }}

            className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-[160px] rounded-full"
          ></motion.div>

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              duration: 1.2,
              delay: 0.2
            }}

            className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-[160px] rounded-full"
          ></motion.div>

        </div>

        {/* TOP BAR */}

        <motion.div

          initial={{
            opacity: 0,
            y: -30
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            duration: 0.6
          }}

          className="relative z-20 border-b border-white/10 backdrop-blur-xl"
        >

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            <div>

              <p className="uppercase tracking-[5px] text-yellow-400 text-sm mb-2">
                CMS ADMIN
              </p>

              <h1 className="text-2xl font-black">
                IC Restaurando el Altar Familiar
              </h1>

            </div>

            <div className="flex gap-4">

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  px-5 py-3
                  rounded-2xl
                  font-semibold
                  transition-all duration-300
                  hover:bg-red-400
                  hover:scale-105
                  hover:shadow-xl
                  hover:shadow-red-500/30
                "
              >

                Cerrar Sesión

              </button>

            </div>

          </div>

        </motion.div>

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

          <div className="max-w-6xl">

            <p className="uppercase tracking-[6px] text-yellow-400 mb-8">
              PANEL CMS
            </p>

            <h1 className="
              text-5xl
              md:text-7xl
              font-black
              leading-[1]
              max-w-4xl
              mb-16
            ">

              Controla toda tu iglesia
              <br />
              desde un solo lugar.

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
                    bg-white/5
                    border border-white/10
                    rounded-3xl
                    p-8
                    backdrop-blur-xl
                    transition-all duration-300
                    hover:border-yellow-500/30
                    hover:bg-white/10
                  "
                >

                  <p className="text-white/40 text-sm mb-4 uppercase tracking-[3px]">
                    {item.category}
                  </p>

                  <h3 className="text-xl font-black leading-tight">
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
                  bg-white/[0.03]
                  border border-white/10
                  rounded-3xl
                  p-8
                  cursor-pointer
                  transition-all duration-500
                  hover:border-yellow-500/30
                  hover:bg-white/[0.06]
                  hover:shadow-2xl
                  hover:shadow-black/30
                "
              >

                {/* Glow */}

                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition-all duration-500
                  bg-gradient-to-br
                  from-yellow-500/10
                  via-transparent
                  to-transparent
                "></div>

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
                    from-yellow-500/20
                    to-yellow-500/5
                    flex items-center justify-center
                    text-4xl
                    mb-8
                    shadow-lg
                    shadow-yellow-500/10
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:bg-yellow-500
                  "
                >

                  <span className="group-hover:scale-110 transition-all duration-300">
                    {card.icon}
                  </span>

                </motion.div>

                {/* Content */}

                <div className="relative z-10">

                  <h2 className="text-3xl font-black mb-4">
                    {card.title}
                  </h2>

                  <p className="text-white/60 leading-relaxed">
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