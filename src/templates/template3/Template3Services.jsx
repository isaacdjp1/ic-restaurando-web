import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template3Services() {

  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {

    const { data, error } = await supabase
      .from("services")
      .select("*")

    console.log(data)
    console.log(error)

    if (data) {
      setServices(data)
    }

  }

  return (

    <section
      id="servicios"
      className="
        bg-slate-950
        py-32
        px-6
        relative
        overflow-hidden
      "
    >

      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-600/20 blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-24">

          <p
            className="
              uppercase
              tracking-[0.4em]
              text-blue-400
              text-sm
              mb-6
            "
          >
            Horarios
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              text-white
              font-bold
              mb-8
            "
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            Encuentra Tu Lugar
          </h2>

          <p
            className="
              text-slate-400
              text-lg
              max-w-2xl
              mx-auto
            "
          >
            Conéctate con nuestra comunidad a través de
            reuniones, servicios y experiencias diseñadas
            para crecer juntos.
          </p>

        </div>

        {/* TIMELINE */}

        <div className="relative">

          <div
            className="
              hidden lg:block
              absolute
              top-20
              left-0
              right-0
              h-[2px]
              bg-gradient-to-r
              from-blue-500
              via-violet-500
              to-blue-500
            "
          />

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >

            {services.map((service, index) => (

              <motion.div
                key={service.id}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                }}
                className="relative"
              >

                {/* DOT */}

                <div
                  className="
                    hidden lg:flex
                    absolute
                    -top-4
                    left-1/2
                    -translate-x-1/2
                    w-8
                    h-8
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-violet-500
                    shadow-[0_0_25px_rgba(124,58,237,0.7)]
                    z-20
                  "
                />

                {/* CARD */}

                <div
                  className="
                  mt-10
                  bg-slate-900/70
                  backdrop-blur-xl
                  border
                  border-slate-800
                  rounded-[32px]
                  p-8
                  h-[260px]
                  flex
                  flex-col
                  hover:-translate-y-3
                  hover:border-blue-500/40
                  transition-all
                  duration-500
                 shadow-[0_0_40px_rgba(37,99,235,0.08)]
"
                >

                  <div
                    className="
                      inline-flex
                      px-4
                      py-2
                      rounded-full
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      text-blue-400
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      mb-6
                    "
                  >
                    {service.day}
                  </div>

                  <h3
                    className="
                      text-3xl
                      text-white
                      font-bold
                      leading-tight
                      mb-4
                    "
                    style={{
                      fontFamily: "Space Grotesk",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      text-xl
                      text-violet-300
                      font-semibold
                      mb-4
                    "
                  >
                    {service.time}
                  </p>

                  <p
                    className="
                    text-slate-400
                   leading-relaxed
                   mt-auto
"
                  >
                    {service.extra}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>

  )

}