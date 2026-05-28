import { useNavigate } from "react-router-dom"
import { motion} from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import PageWrapper from "../components/PageWrapper"

export default function AdminHome() {

  const navigate = useNavigate()

  const [stats, setStats] = useState({

  flyers: 0,
  peticiones: 0,
  galeria: 0,
  livestream: 0

})

const [activity, setActivity] =
useState([])

const [eventos, setEventos] =
useState([])

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

  useEffect(() => {

  async function fetchStats() {

    // Flyers

    const {
      count: flyersCount
    } = await supabase
      .from("flyers")
      .select("*", {
        count: "exact",
        head: true
      })

    // Peticiones

    const {
      count: peticionesCount
    } = await supabase
      .from("peticiones")
      .select("*", {
        count: "exact",
        head: true
      })

    // Galería

    const {
      count: galeriaCount
    } = await supabase
      .from("gallery")
      .select("*", {
        count: "exact",
        head: true
      })

    // Livestream

    const {
      data: livestreamData
    } = await supabase
      .from("livestream")
      .select("*")
      .eq("is_live", true)

    setStats({

      flyers: flyersCount || 0,
      peticiones: peticionesCount || 0,
      galeria: galeriaCount || 0,
      livestream: livestreamData?.length || 0

    })

    // ACTIVIDAD REAL

const {
  data: recentPeticiones
} = await supabase

  .from("peticiones")

  .select("*")

  .order("created_at", {
    ascending: false
  })

  .limit(5)

if (recentPeticiones) {

  const formattedActivity =
  recentPeticiones.map(
    (item) => ({

      title:
      `Nueva petición de ${item.nombre}`,

      time:
      item.created_at,

      icon:
      "🙏"

    })
  )

  setActivity(formattedActivity)

  // EVENTOS DESDE FLYERS

const {
  data: flyersEventos
} = await supabase

  .from("flyers")

  .select("*")

  .eq("activo", true)

  .order("orden", {
    ascending: true
  })

  .limit(3)

if (flyersEventos) {

  setEventos(flyersEventos)

}

}

  }

 fetchStats()

// REALTIME PETICIONES

const channel = supabase

  .channel("realtime-peticiones")

  .on(

    "postgres_changes",

    {
      event: "*",
      schema: "public",
      table: "peticiones"
    },

    () => {

      fetchStats()

    }

  )

  .subscribe()

return () => {

  supabase.removeChannel(channel)

}

}, [])



  return (

    <PageWrapper>

      <section className="
      min-h-screen
      bg-[#f5f5f7]
      text-[#111111]
      overflow-hidden
     ">

        {/* BACKGROUND GLOW */}

        {/* TOP STATUS */}

<div className="
max-w-7xl
mx-auto
px-6
pt-12
relative
z-10
">

  <motion.div

    initial={{
      opacity: 0,
      y: 20
    }}

    animate={{
      opacity: 1,
      y: 0
    }}

    transition={{
      duration: 0.6
    }}

    className="
      bg-white
      border border-zinc-200
      rounded-[36px]
      p-8
      shadow-sm
      flex flex-col xl:flex-row
      xl:items-center
      xl:justify-between
      gap-10
    "
  >

    {/* LEFT */}

    <div>

      <p className="
      uppercase
      tracking-[4px]
      text-zinc-400
      text-sm
      mb-4
      ">

        VEYRON CMS

      </p>

      <h1 className="
      text-4xl
      md:text-5xl
      font-semibold
      tracking-tight
      leading-tight
      mb-4
      ">

        Bienvenido de nuevo 👋

      </h1>

      <p className="
      text-zinc-500
      text-lg
      max-w-2xl
      ">

        Todo el control de tu iglesia en un solo lugar.

      </p>

    </div>

    {/* RIGHT */}

<div className="
grid
grid-cols-2
gap-4
min-w-[320px]
">

  <div className="
  bg-[#f5f5f7]
  rounded-3xl
  p-5
  border border-zinc-200
  ">

    <p className="text-zinc-400 text-sm mb-2">
      Flyers
    </p>

    <h3 className="font-semibold text-2xl">
      {stats.flyers}
    </h3>

  </div>

  <div className="
  bg-[#f5f5f7]
  rounded-3xl
  p-5
  border border-zinc-200
  ">

    <p className="text-zinc-400 text-sm mb-2">
      Peticiones
    </p>

    <h3 className="font-semibold text-2xl">
      {stats.peticiones}
    </h3>

  </div>

  <div className="
  bg-[#f5f5f7]
  rounded-3xl
  p-5
  border border-zinc-200
  ">

    <p className="text-zinc-400 text-sm mb-2">
      Galería
    </p>

    <h3 className="font-semibold text-2xl">
      {stats.galeria}
    </h3>

  </div>

  <div className="
  bg-[#f5f5f7]
  rounded-3xl
  p-5
  border border-zinc-200
  ">

    <p className="text-zinc-400 text-sm mb-2">
      En Vivo
    </p>

    <h3 className="font-semibold text-2xl">
      {stats.livestream}
    </h3>

  </div>

</div>

  </motion.div>

</div>

        


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
            mb-4
            text-sm
            font-medium
            ">
           ACCESOS RÁPIDOS
           </p>

          <h2 className="
          text-3xl
          md:text-4xl
          font-semibold
          tracking-tight
          leading-tight
          max-w-3xl
          mb-12
          ">

         Herramientas principales
         del CMS.

         </h2>

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

{/* DASHBOARD PANELS */}

<div className="
max-w-7xl
mx-auto
px-6
pb-20
grid
grid-cols-1
lg:grid-cols-2
gap-8
relative
z-10
">

  {/* EVENTOS */}

  <div className="
  bg-white
  border border-zinc-200
  rounded-[36px]
  p-8
  shadow-sm
  ">

    <div className="
    flex items-center justify-between
    mb-8
    ">

      <h2 className="
      text-3xl
      font-semibold
      tracking-tight
      ">

        Próximos Eventos

      </h2>

      <button

  onClick={() => navigate("/admin/flyers")}

  className="
  text-sm
  text-zinc-500
  hover:text-black
  transition-all
  "
>

        Ver todos

      </button>

    </div>

    <div className="space-y-5">

      {eventos.map((evento, index) => (

        <motion.div
          key={index}

          initial={{
            opacity: 0,
            y: 20
          }}

          animate={{
            opacity: 1,
            y: 0
          }}

          transition={{
            delay: index * 0.08
          }}

          className="
          flex
          gap-5
          border-b
          border-zinc-100
          pb-5
          last:border-none
          "
        >

          <img
         src={evento.image_url}
         alt={evento.titulo}
         className="
         min-w-[75px]
         w-[75px]
         h-[75px]
         rounded-3xl
         object-cover
         border border-zinc-200
         shadow-sm
         "
/>

<div>

  <h3 className="
  text-xl
  font-semibold
  mb-2
  ">

    {evento.titulo}

  </h3>

  <p className="
  text-zinc-500
  text-sm
  mb-1
  ">

    🕒 {evento.hora}

  </p>

  <p className="
  text-zinc-500
  text-sm
  ">

    📅 {evento.dia}

  </p>

</div>

        </motion.div>

      ))}

    </div>

  </div>

  {/* ACTIVIDAD */}

  <div className="
  bg-white
  border border-zinc-200
  rounded-[36px]
  p-8
  shadow-sm
  ">

    <div className="
    flex items-center justify-between
    mb-8
    ">

      <h2 className="
      text-3xl
      font-semibold
      tracking-tight
      ">

        Actividad Reciente

      </h2>

      <button

     onClick={() => navigate("/admin/peticiones")}

     className="
     text-sm
     text-zinc-500
     hover:text-black
     transition-all
     "
>

        Ver todo

      </button>

    </div>

   

  <div className="space-y-5">

    {activity.map((item, index) => (

      <motion.div
        key={item.time}

        initial={{
          opacity: 0,
          y: -30,
          scale: 0.96
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }}

        exit={{
          opacity: 0,
          y: 20
        }}

        transition={{
          duration: 0.35,
          delay: index * 0.05
        }}

        layout

        className="
        flex
        items-start
        gap-4
        "
      >

        <div className="
        w-14
        h-14
        rounded-2xl
        bg-[#f5f5f7]
        flex
        items-center
        justify-center
        text-xl
        shrink-0
        ">

          🙏

        </div>

        <div>

          <h3 className="
          font-semibold
          text-lg
          mb-1
          ">

            {item.title}

          </h3>

          <p className="
          text-zinc-500
          text-sm
          ">

            {new Date(
              item.time
            ).toLocaleString()}

          </p>

        </div>

      </motion.div>

    ))}

  </div>

  </div>

  </div>





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