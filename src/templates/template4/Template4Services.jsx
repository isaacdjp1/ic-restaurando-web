import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template4Services() {

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
        bg-[#f8f8f8]
        py-32
        px-6
      "
    >

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <p
            className="
              uppercase
              tracking-[0.35em]
              text-[#C8A96B]
              text-sm
              font-semibold
              mb-5
            "
          >
            Ministerios
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-black
              mb-8
            "
            style={{
              fontFamily: "Montserrat",
            }}
          >
            Nuestros Servicios
          </h2>

          <div
            className="
              w-24
              h-[3px]
              bg-[#C8A96B]
              mx-auto
              mb-8
            "
          />

          <p
            className="
              text-zinc-600
              text-lg
              max-w-3xl
              mx-auto
              leading-relaxed
            "
            style={{
              fontFamily: "Inter",
            }}
          >
            Espacios diseñados para fortalecer la fe,
            la familia y la comunidad a través de cada
            reunión y servicio.
          </p>

        </div>

        {/* SERVICES */}

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
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="
                h-[280px]
                flex
                flex-col
                bg-white
                border
                border-zinc-200
                rounded-[32px]
                p-8
                shadow-[0_15px_40px_rgba(0,0,0,0.05)]
                hover:-translate-y-2
                hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
                transition-all
                duration-500
              "
            >

              {/* TOP BAR */}

              <div
                className="
                  w-14
                  h-[4px]
                  bg-[#C8A96B]
                  rounded-full
                  mb-6
                "
              />

              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  text-[#C8A96B]
                  font-semibold
                  mb-4
                "
                style={{
                  fontFamily: "Inter",
                }}
              >
                {service.day}
              </p>

              <h3
                className="
                  text-3xl
                  font-bold
                  text-black
                  leading-tight
                  mb-4
                "
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {service.title}
              </h3>

              <p
                className="
                  text-lg
                  text-zinc-800
                  font-semibold
                  mb-4
                "
                style={{
                  fontFamily: "Inter",
                }}
              >
                {service.time}
              </p>

              <p
                className="
                  mt-auto
                  text-zinc-500
                  leading-relaxed
                "
                style={{
                  fontFamily: "Inter",
                }}
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