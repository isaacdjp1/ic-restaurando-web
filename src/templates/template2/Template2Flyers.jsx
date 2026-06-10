import { useEffect, useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

import { supabase } from "../../lib/supabase"

export default function Template2Flyers() {
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
    <>
      <section
        id="eventos"
        className="bg-white py-32 px-6"
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
              Eventos
            </p>

            <h2
              className="
                text-5xl
                md:text-6xl
                text-black
                mb-8
              "
              style={{
                fontFamily: "Instrument Serif",
              }}
            >
              Próximos Eventos
            </h2>

            <p
              className="
                text-zinc-600
                text-lg
                max-w-2xl
                mx-auto
              "
            >
              Mantente conectado con cada reunión,
              actividad y evento especial de nuestra comunidad.
            </p>
          </div>

          {/* SLIDER */}

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
                <div
                  className="
                    bg-white
                    rounded-[32px]
                    overflow-hidden
                    border
                    border-zinc-200
                    hover:border-zinc-300
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    h-full
                    flex
                    flex-col
                    shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                  "
                >
                  <div className="overflow-hidden">
                    <img
                      src={flyer.image_url}
                      alt={flyer.titulo}
                      className="
                        w-full
                        h-[300px]
                        object-cover
                        transition
                        duration-700
                        hover:scale-105
                      "
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <p
                      className="
                        uppercase
                        tracking-[0.25em]
                        text-xs
                        text-zinc-500
                        mb-4
                      "
                    >
                      {flyer.dia}
                    </p>

                    <h3
                      className="
                        text-3xl
                        text-black
                        leading-tight
                        mb-4
                      "
                      style={{
                        fontFamily: "Instrument Serif",
                      }}
                    >
                      {flyer.titulo}
                    </h3>

                    <p
                      className="
                        text-zinc-600
                        mb-8
                      "
                    >
                      {flyer.hora}
                    </p>

                    <button
                      onClick={() =>
                        setSelectedFlyer(flyer)
                      }
                      className="
                        mt-auto
                        border
                        border-zinc-300
                        rounded-full
                        py-4
                        px-6
                        text-black
                        hover:bg-black
                        hover:text-white
                        transition-all
                        duration-300
                      "
                    >
                      Ver Evento
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* MODAL */}

      {selectedFlyer && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/50
            backdrop-blur-md
            flex
            items-center
            justify-center
            p-6
          "
        >
          <div
            className="
              bg-white
              max-w-5xl
              w-full
              rounded-[36px]
              overflow-hidden
              shadow-[0_40px_100px_rgba(0,0,0,0.15)]
              relative
              max-h-[90vh]
              overflow-y-auto
            "
          >
            <button
              onClick={() =>
                setSelectedFlyer(null)
              }
              className="
                absolute
                top-6
                right-6
                w-12
                h-12
                rounded-full
                bg-white
                border
                border-zinc-200
                text-black
                hover:bg-black
                hover:text-white
                transition
                z-10
              "
            >
              ✕
            </button>

            <img
              src={selectedFlyer.image_url}
              alt={selectedFlyer.titulo}
              className="
                w-full
                max-h-[500px]
                object-cover
              "
            />

            <div className="p-10 md:p-14">
              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  text-zinc-500
                  mb-4
                "
              >
                {selectedFlyer.dia}
              </p>

              <h2
                className="
                  text-4xl
                  md:text-6xl
                  text-black
                  leading-tight
                  mb-6
                "
                style={{
                  fontFamily: "Instrument Serif",
                }}
              >
                {selectedFlyer.titulo}
              </h2>

              <p
                className="
                  text-xl
                  text-zinc-600
                  mb-8
                "
              >
                {selectedFlyer.hora}
              </p>

              <div
                className="
                  w-20
                  h-px
                  bg-zinc-300
                  mb-8
                "
              />

              <p
                className="
                  text-zinc-700
                  text-lg
                  leading-relaxed
                "
              >
                {selectedFlyer.descripcion}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}