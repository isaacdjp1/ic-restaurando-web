import { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

import { supabase } from "../lib/supabase"

export default function Flyers() {

  const [selectedFlyer, setSelectedFlyer] = useState(null)

  const [flyers, setFlyers] = useState([])

  useEffect(() => {

    fetchFlyers()

  }, [])

  async function fetchFlyers() {

    const { data, error } = await supabase
      .from("flyers")
      .select("*")
      .eq("activo", true)
      .order("orden", { ascending: true })

    if (error) {

      console.log(error)

    } else {

      setFlyers(data)

    }

  }

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

          <h2 className="text-5xl md:text-6xl font-semibold tracking-[-2px] text-black mb-6">
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

          {flyers.map((flyer) => (

            <SwiperSlide key={flyer.id}>

              <div className="bg-white rounded-[35px] overflow-hidden shadow-2xl border border-black/5 hover:-translate-y-3 transition duration-300 h-auto flex flex-col">

                <img
                  src={flyer.image_url}
                  alt={flyer.titulo}
                  className="w-full object-contain bg-zinc-900"
                />

                <div className="p-8 flex flex-col flex-1 h-auto">

                  <p className="uppercase tracking-[4px] text-yellow-500 mb-3 text-sm font-semibold">
                    {flyer.dia}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold text-black leading-tight mb-4">
                    {flyer.titulo}
                  </h3>

                  <p className="text-[#4b5563] text-lg mb-8">
                    {flyer.hora}
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
              src={selectedFlyer.image_url}
              alt={selectedFlyer.titulo}
              className="w-full object-contain bg-zinc-900"
            />

            <div className="p-10">

              <p className="uppercase tracking-[4px] text-yellow-500 mb-3 text-sm font-semibold">
                {selectedFlyer.dia}
              </p>

              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                {selectedFlyer.titulo}
              </h2>

              <p className="text-2xl text-gray-700 mb-8">
                {selectedFlyer.hora}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedFlyer.descripcion}
              </p>

            </div>

          </div>

        </div>

      )}

    </section>

  )

}