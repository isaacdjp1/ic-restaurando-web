import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template4Flyers() {

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

  const featuredFlyer = flyers[0]

  const secondaryFlyers = flyers.slice(1)

  return (
    <>
      <section
        id="eventos"
        className="
          bg-[#f8f8f8]
          py-32
          px-6
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="text-center mb-20">

            <p
              className="
                uppercase
                tracking-[0.35em]
                text-[#C8A96B]
                text-sm
                mb-5
                font-semibold
              "
            >
              Eventos
            </p>

            <h2
              className="
                text-5xl
                md:text-6xl
                text-black
                mb-6
                font-bold
              "
              style={{
                fontFamily: "Montserrat"
              }}
            >
              Calendario de Eventos
            </h2>

            <p
              className="
                text-zinc-600
                max-w-3xl
                mx-auto
                text-lg
              "
            >
              Mantente conectado con cada actividad,
              servicio especial y evento de nuestra comunidad.
            </p>

          </div>

          {/* EVENTO PRINCIPAL */}

          {featuredFlyer && (

            <div
              className="
                bg-white
                rounded-[36px]
                overflow-hidden
                border
                border-zinc-200
                shadow-[0_20px_60px_rgba(0,0,0,0.05)]
                mb-14
              "
            >

              <div className="h-2 bg-[#C8A96B]" />

              <div className="grid lg:grid-cols-2">

                <img
                  src={featuredFlyer.image_url}
                  alt={featuredFlyer.titulo}
                  className="
                    w-full
                    h-full
                    min-h-[500px]
                    object-cover
                  "
                />

                <div className="p-12 flex flex-col">

                  <div
                    className="
                      inline-flex
                      w-fit
                      px-5
                      py-2
                      rounded-full
                      bg-[#C8A96B]/10
                      text-[#C8A96B]
                      font-semibold
                      mb-6
                    "
                  >
                    Evento Principal
                  </div>

                  <p className="text-zinc-500 mb-4">
                    {featuredFlyer.dia}
                  </p>

                  <h3
                    className="
                      text-4xl
                      md:text-5xl
                      text-black
                      leading-tight
                      mb-6
                      font-bold
                    "
                    style={{
                      fontFamily: "Montserrat"
                    }}
                  >
                    {featuredFlyer.titulo}
                  </h3>

                  <p
                    className="
                      text-xl
                      text-zinc-600
                      mb-8
                    "
                  >
                    {featuredFlyer.hora}
                  </p>

                  <button
                    onClick={() =>
                      setSelectedFlyer(featuredFlyer)
                    }
                    className="
                      mt-auto
                      bg-black
                      text-white
                      px-8
                      py-4
                      rounded-xl
                      hover:bg-[#C8A96B]
                      transition-all
                      duration-300
                    "
                  >
                    Ver Evento
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* EVENTOS SECUNDARIOS */}

          <div
            className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-8
            "
          >

            {secondaryFlyers.map((flyer) => (

              <div
                key={flyer.id}
                className="
                  bg-white
                  border
                  border-zinc-200
                  rounded-[28px]
                  overflow-hidden
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                  transition-all
                  duration-300
                "
              >

                <img
                  src={flyer.image_url}
                  alt={flyer.titulo}
                  className="
                    w-full
                    h-60
                    object-cover
                  "
                />

                <div className="p-8">

                  <p
                    className="
                      text-[#C8A96B]
                      text-sm
                      mb-3
                      font-semibold
                    "
                  >
                    {flyer.dia}
                  </p>

                  <h4
                    className="
                      text-black
                      text-2xl
                      font-bold
                      mb-4
                    "
                    style={{
                      fontFamily: "Montserrat"
                    }}
                  >
                    {flyer.titulo}
                  </h4>

                  <p
                    className="
                      text-zinc-600
                      mb-6
                    "
                  >
                    {flyer.hora}
                  </p>

                  <button
                    onClick={() =>
                      setSelectedFlyer(flyer)
                    }
                    className="
                      text-black
                      font-semibold
                      hover:text-[#C8A96B]
                      transition
                    "
                  >
                    Ver detalles →
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* MODAL */}

      {selectedFlyer && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/70
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
              rounded-[36px]
              overflow-hidden
              max-w-5xl
              w-full
              max-h-[90vh]
              overflow-y-auto
              shadow-[0_40px_100px_rgba(0,0,0,0.15)]
              relative
            "
          >

            <button
              onClick={() =>
                setSelectedFlyer(null)
              }
              className="
                absolute
                top-8
                right-8
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

              <p className="text-[#C8A96B] mb-4">
                {selectedFlyer.dia}
              </p>

              <h2
                className="
                  text-5xl
                  text-black
                  mb-6
                  font-bold
                "
                style={{
                  fontFamily: "Montserrat"
                }}
              >
                {selectedFlyer.titulo}
              </h2>

              <p className="text-xl text-zinc-600 mb-8">
                {selectedFlyer.hora}
              </p>

              <p className="text-zinc-700 leading-relaxed">
                {selectedFlyer.descripcion}
              </p>

            </div>

          </div>

        </div>

      )}

    </>
  )

}