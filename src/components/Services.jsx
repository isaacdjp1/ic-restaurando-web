import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"



export default function Services() {

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
      className="bg-black text-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-400 mb-4">
            Horarios
          </p>

          <h2 className="text-5xl font-black">
            Nuestros Servicios
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-yellow-500/10 hover:shadow-2xl transition-all duration-500 backdrop-blur-lg"
            >

              <p className="text-yellow-400 uppercase tracking-[3px] mb-3">
                {service.day}
              </p>

              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-lg text-gray-200 mb-3">
                {service.time}
              </p>

              <p className="text-gray-400">
                {service.extra}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}