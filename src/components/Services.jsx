import { motion } from "framer-motion"

const services = [
  {
    day: "Martes",
    title: "Escuela de Formación",
    time: "7:00 PM - 8:30 PM",
    extra: "Maestro: Lucas Contreras",
  },

  {
    day: "Miércoles & Sábados",
    title: "Ayuno Congregacional",
    time: "9:30 AM - 12:00 PM",
    extra: "Tiempo de oración y búsqueda",
  },

  {
    day: "Viernes",
    title: "Servicio Congregacional",
    time: "7:00 PM - 9:00 PM",
    extra: "Servicio general de adoración",
  },

  {
    day: "Sábado",
    title: "Servicio Juvenil GPC",
    time: "5:30 PM - 7:00 PM",
    extra: "Reunión de jóvenes",
  },

  {
    day: "Domingo",
    title: "Clases de Liderazgo",
    time: "8:00 AM - 8:55 AM",
    extra: "Formación de líderes",
  },

  {
    day: "Domingo",
    title: "Escuela Dominical",
    time: "9:00 AM - 12:00 PM",
    extra: "Servicio principal",
  },
]

export default function Services() {
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
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 transition duration-300 backdrop-blur-lg"
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