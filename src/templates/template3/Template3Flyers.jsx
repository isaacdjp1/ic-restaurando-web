import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Template3Flyers() {

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
          bg-slate-950
          py-32
          px-6
          overflow-hidden
        "
      >

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}

          <div className="text-center mb-20">

            <p
              className="
                uppercase
                tracking-[0.35em]
                text-blue-400
                text-sm
                mb-5
              "
            >
              Eventos
            </p>

            <h2
              className="
                text-5xl
                md:text-7xl
                text-white
                mb-6
              "
              style={{
                fontFamily: "Space Grotesk"
              }}
            >
              Lo Que Viene
            </h2>

            <p
              className="
                text-slate-400
                max-w-2xl
                mx-auto
                text-lg
              "
            >
              Conferencias, reuniones especiales y
              experiencias diseñadas para una nueva generación.
            </p>

          </div>

          {featuredFlyer && (

            <div
              className="
                mb-12
                rounded-[40px]
                overflow-hidden
                border
                border-blue-500/20
                bg-slate-900
                shadow-[0_0_60px_rgba(37,99,235,0.15)]
              "
            >

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

                <div className="p-10 md:p-14 flex flex-col">

                  <div
                    className="
                      inline-flex
                      w-fit
                      px-4
                      py-2
                      rounded-full
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      text-blue-300
                      text-sm
                      mb-6
                    "
                  >
                    EVENTO DESTACADO
                  </div>

                  <p className="text-slate-400 mb-4">
                    {featuredFlyer.dia}
                  </p>

                  <h3
                    className="
                      text-4xl
                      md:text-6xl
                      text-white
                      leading-tight
                      mb-6
                    "
                    style={{
                      fontFamily: "Space Grotesk"
                    }}
                  >
                    {featuredFlyer.titulo}
                  </h3>

                  <p
                    className="
                      text-xl
                      text-slate-300
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
                      bg-gradient-to-r
                      from-blue-600
                      to-violet-600
                      text-white
                      px-8
                      py-4
                      rounded-2xl
                      hover:scale-105
                      transition-all
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
              lg:grid-cols-3
              gap-6
            "
          >

            {secondaryFlyers.map((flyer) => (

              <div
                key={flyer.id}
                className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-[30px]
                  overflow-hidden
                  hover:border-blue-500/40
                  transition-all
                  duration-300
                "
              >

                <img
                  src={flyer.image_url}
                  alt={flyer.titulo}
                  className="
                    w-full
                    h-56
                    object-cover
                  "
                />

                <div className="p-6">

                  <p
                    className="
                      text-blue-400
                      text-sm
                      mb-3
                    "
                  >
                    {flyer.dia}
                  </p>

                  <h4
                    className="
                      text-white
                      text-2xl
                      mb-3
                    "
                    style={{
                      fontFamily: "Space Grotesk"
                    }}
                  >
                    {flyer.titulo}
                  </h4>

                  <p
                    className="
                      text-slate-400
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
                      text-blue-400
                      hover:text-white
                      transition
                    "
                  >
                    Ver más →
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
            bg-black/80
            backdrop-blur-lg
            flex
            items-center
            justify-center
            p-6
          "
        >

          <div
            className="
              bg-slate-900
              border
              border-slate-700
              rounded-[36px]
              overflow-hidden
              max-w-5xl
              w-full
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
                top-8
                right-8
                w-12
                h-12
                rounded-full
                bg-slate-800
                text-white
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

            <div className="p-10">

              <p className="text-blue-400 mb-4">
                {selectedFlyer.dia}
              </p>

              <h2
                className="
                  text-5xl
                  text-white
                  mb-6
                "
                style={{
                  fontFamily: "Space Grotesk"
                }}
              >
                {selectedFlyer.titulo}
              </h2>

              <p
                className="
                  text-xl
                  text-slate-300
                  mb-8
                "
              >
                {selectedFlyer.hora}
              </p>

              <p
                className="
                  text-slate-400
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