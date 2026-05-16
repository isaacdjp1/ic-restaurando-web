import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

import ViernesImg from "../assets/images/Viernes.webp"
import SabadoImg from "../assets/images/Jovenes.webp"
import DomingoImg from "../assets/images/Domingo.webp"

const flyers = [
  {
    title: "Servicio Congregacional",
    day: "Viernes",
    time: "7:00 PM - 9:00 PM",

    description:
      "Cada viernes vivimos un tiempo de adoración, palabra y ministración donde buscamos la presencia de Dios juntos como iglesia.",

    image: ViernesImg,
  },

  {
    title: "Servicio Juvenil GPC",
    day: "Sábado",
    time: "5:30 PM - 7:00 PM",

    description:
      "Un espacio diseñado para que los jóvenes crezcan espiritualmente, hagan amistades y experimenten a Dios de una manera auténtica.",

    image: SabadoImg,
  },

  {
    title: "Escuela Dominical",
    day: "Domingo",
    time: "9:00 AM - 12:00 PM",

    description:
      "Nuestra reunión principal de domingo donde toda la familia se reúne para adorar, aprender y compartir juntos.",

    image: DomingoImg,
  },
]

export default function Flyers() {

  const [selectedFlyer, setSelectedFlyer] = useState(null)

  return (
    <section
      id="eventos"
      className="bg-gradient-to-b from-gray-100 to-white py-24 px-6"
    >

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[5px] text-yellow-500 mb-4">
            Eventos
          </p>

          <h2 className="text-5xl font-black mb-6">
            Próximos Servicios
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Mantente conectado con cada reunión y actividad de nuestra iglesia.
          </p>

        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {flyers.map((flyer, index) => (

            <SwiperSlide key={index}>

              <div className="bg-white rounded-[35px] overflow-hidden shadow-2xl border border-black/5 hover:-translate-y-3 transition duration-300 h-auto flex flex-col">

                <img
                  src={flyer.image}
                  alt={flyer.title}
                  className="w-full object-contain bg-zinc-900"
                />

                <div className="p-8 flex flex-col flex-1 h-auto">

                  <p className="uppercase tracking-[4px] text-yellow-500 mb-3 text-sm font-semibold">
                    {flyer.day}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-black leading-tight mb-4">
                    {flyer.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-8">
                    {flyer.time}
                  </p>

                  <button
                    onClick={() => setSelectedFlyer(flyer)}
                    className="mt-auto bg-black text-white px-8 py-4 rounded-2xl hover:bg-yellow-500 hover:text-black transition font-semibold"
                  >

                    Ver Evento

                  </button>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

      {/* MODAL */}

      {selectedFlyer && (

        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6">

          <div className="bg-white rounded-[35px] max-w-5xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelectedFlyer(null)}
              className="absolute top-6 right-6 bg-black text-white w-12 h-12 rounded-full text-xl hover:bg-yellow-500 hover:text-black transition"
            >

              ✕

            </button>

            <img
              src={selectedFlyer.image}
              alt={selectedFlyer.title}
              className="w-full object-contain bg-zinc-900"
            />

            <div className="p-10">

              <p className="uppercase tracking-[4px] text-yellow-500 mb-3 text-sm font-semibold">
                {selectedFlyer.day}
              </p>

              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                {selectedFlyer.title}
              </h2>

              <p className="text-2xl text-gray-700 mb-8">
                {selectedFlyer.time}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedFlyer.description}
              </p>

            </div>

          </div>

        </div>

      )}

    </section>
  )
}