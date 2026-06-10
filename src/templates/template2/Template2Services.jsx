import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template2Services() {
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
      className="bg-[#fafafa] py-32 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-sm
              text-zinc-500
              mb-6
            "
          >
            Horarios
          </p>

          <h2
            className="
              text-5xl
              md:text-6xl
              text-black
            "
            style={{
              fontFamily: "Instrument Serif",
            }}
          >
            Nuestros Servicios
          </h2>

        </div>

        {/* SERVICES */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <motion.div
              key={service.id}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="
                bg-white
                border
                border-zinc-200
                rounded-[32px]
                p-10
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              "
            >

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  text-zinc-500
                  mb-4
                "
              >
                {service.day}
              </p>

              <h3
                className="
                  text-3xl
                  text-black
                  mb-4
                  leading-tight
                "
                style={{
                  fontFamily: "Instrument Serif",
                }}
              >
                {service.title}
              </h3>

              <p
                className="
                  text-lg
                  text-zinc-700
                  mb-3
                "
              >
                {service.time}
              </p>

              <p
                className="
                  text-zinc-500
                  leading-relaxed
                "
              >
                {service.extra}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  )
}