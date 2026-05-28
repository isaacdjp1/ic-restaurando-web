import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import emailjs from "@emailjs/browser"
import { motion } from "framer-motion"
import PageWrapper from "../components/PageWrapper"
import { useToast } from "../context/ToastContext"

export default function AdminDashboard() {

  const navigate = useNavigate()
  const { showToast } = useToast()  

  const [peticiones, setPeticiones] = useState([])

  const [loading, setLoading] = useState(true)

  const [selectedPeticion, setSelectedPeticion] = useState(null)

  const [respuesta, setRespuesta] = useState("")

  const [sending, setSending] = useState(false)

  const [nuevaPeticion, setNuevaPeticion] = useState(false)

  useEffect(() => {

    fetchPeticiones()

    const channel = supabase

      .channel("realtime-peticiones")

      .on(

        "postgres_changes",

        {
          event: "*",
          schema: "public",
          table: "peticiones"
        },

        (payload) => {

          console.log("Cambio realtime:", payload)

          if (payload.eventType === "INSERT") {

            setNuevaPeticion(true)

            const audio = new Audio(
              "https://notificationsounds.com/storage/sounds/file-sounds-1150-pristine.mp3"
            )

            audio.volume = 0.4

            audio.play()

            setTimeout(() => {

              setNuevaPeticion(false)

            }, 5000)

          }

          fetchPeticiones()

        }

      )

      .subscribe()

    return () => {

      supabase.removeChannel(channel)

    }

  }, [])

  async function fetchPeticiones() {

    const { data, error } = await supabase
      .from("peticiones")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {

      console.log(error)

    } else {

      setPeticiones(data)

    }

    setLoading(false)

  }

  async function marcarComoVisto(id) {

    await supabase
      .from("peticiones")
      .update({ estado: "Visto" })
      .eq("id", id)

    fetchPeticiones()

  }

  async function eliminarPeticion(id) {

    const confirmar = confirm(
      "¿Eliminar petición?"
    )

    if (!confirmar) return

    await supabase
      .from("peticiones")
      .delete()
      .eq("id", id)

    fetchPeticiones()

  }

  async function enviarRespuesta() {

    if (!respuesta) return

    setSending(true)

    try {

      await emailjs.send(

        "service_g0m7var",
        "template_szyy6bn",

        {
          to_email: selectedPeticion.email,
          to_name: selectedPeticion.nombre,
          message: respuesta
        },

        "2ybHwBiiCoPmaIxNe"

      )

      await supabase
        .from("peticiones")
        .update({ estado: "Respondido" })
        .eq("id", selectedPeticion.id)

      showToast( "Respuesta enviada exitosamente" )

      setSelectedPeticion(null)

      setRespuesta("")

      fetchPeticiones()

    } catch (error) {

      showToast( "Error enviando correo" )

      console.log(error)

    }

    setSending(false)

  }

  return (

    <PageWrapper>

      <section className="bg-black min-h-screen text-white py-24 px-6 overflow-hidden">

        {/* BACKGROUND GLOW */}

        <div className="fixed inset-0 overflow-hidden pointer-events-none">

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              duration: 1
            }}

            className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-[160px] rounded-full"
          ></motion.div>

          <motion.div

            initial={{
              opacity: 0
            }}

            animate={{
              opacity: 1
            }}

            transition={{
              duration: 1,
              delay: 0.2
            }}

            className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] bg-yellow-500/10 blur-[160px] rounded-full"
          ></motion.div>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* TOP */}

          <motion.div

            initial={{
              opacity: 0,
              y: -30
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

            className="mb-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            <div>

              <p className="uppercase tracking-[5px] text-yellow-400 mb-4">
                Admin
              </p>

              <div className="flex items-center gap-4 flex-wrap">

                <h1 className="text-5xl font-black">
                  Dashboard de Peticiones
                </h1>

                {nuevaPeticion && (

                  <motion.div

                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}

                    animate={{
                      opacity: 1,
                      scale: 1
                    }}

                    className="
                      bg-green-500
                      text-white
                      px-4 py-2
                      rounded-full
                      text-sm
                      font-bold
                      animate-pulse
                      shadow-lg shadow-green-500/30
                    "
                  >

                    Nueva Petición

                  </motion.div>

                )}

              </div>

            </div>

            {/* BOTÓN DASHBOARD */}

            <div className="flex gap-4">

              <button
                onClick={() => navigate("/admin")}
                className="
                  bg-white text-black
                  px-5 py-3 rounded-2xl
                  font-bold
                  transition-all duration-300
                  hover:bg-yellow-400
                  hover:scale-105
                  hover:shadow-xl
                  hover:shadow-yellow-500/20
                "
              >

                Dashboard

              </button>

            </div>

          </motion.div>

          {loading ? (

            <motion.div

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: 1
              }}

              className="grid gap-6"
            >

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="
                    bg-white/5
                    border border-white/10
                    rounded-3xl
                    p-8
                    animate-pulse
                    h-[180px]
                  "
                ></div>

              ))}

            </motion.div>

          ) : (

            <div className="grid gap-6">

              {peticiones.map((peticion, index) => (

                <motion.div
                  key={peticion.id}

                  initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.96
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1
                  }}

                  transition={{
                    duration: 0.45,
                    delay: index * 0.05
                  }}

                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(255,255,255,0.25)"
                  }}

                  className="
                    bg-white/5
                    border border-white/10
                    rounded-3xl
                    p-8
                    backdrop-blur-lg
                    transition-all
                    duration-300
                    hover:shadow-2xl
                    hover:shadow-yellow-500/10
                  "
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                    <div>

                      <h2 className="text-2xl font-bold mb-2">
                        {peticion.nombre}
                      </h2>

                      <p className="text-gray-400">
                        {peticion.email}
                      </p>

                    </div>

                    <div className="flex items-center flex-wrap gap-3">

                      <span
                        className={`
                          px-5 py-2 rounded-full text-sm font-bold
                          transition-all duration-300
                          ${
                            peticion.estado === "Pendiente"
                              ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/30 hover:scale-105"
                              : peticion.estado === "Visto"
                              ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105"
                              : "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:scale-105"
                          }
                        `}
                      >
                        {peticion.estado}
                      </span>

                      <button
                        onClick={() => {

                          setSelectedPeticion(peticion)

                          if (peticion.estado === "Pendiente") {

                            marcarComoVisto(peticion.id)

                          }

                        }}
                        className="
                          bg-white text-black
                          px-5 py-2 rounded-full text-sm font-bold
                          transition-all duration-300
                          hover:bg-yellow-400
                          hover:text-black
                          hover:scale-105
                          active:scale-95
                          shadow-lg hover:shadow-yellow-500/30
                        "
                      >

                        Responder

                      </button>

                      {(peticion.estado === "Visto" ||
                        peticion.estado === "Respondido") && (

                        <button
                          onClick={() => eliminarPeticion(peticion.id)}
                          className="
                            bg-red-500 text-white
                            px-5 py-2 rounded-full text-sm font-bold
                            transition-all duration-300
                            hover:bg-red-400
                            hover:scale-105
                            active:scale-95
                            shadow-lg hover:shadow-red-500/40
                          "
                        >

                          Eliminar

                        </button>

                      )}

                    </div>

                  </div>

                  <p className="text-gray-200 leading-relaxed">
                    {peticion.mensaje}
                  </p>

                </motion.div>

              ))}

            </div>

          )}

        </div>

        {selectedPeticion && (

          <div className="
          fixed
          inset-0
          bg-black/70
          backdrop-blur-sm
          flex
          justify-center
          items-start
          z-50
          px-6
          overflow-y-auto
          pt-10
          pb-10
          "
          >

            <motion.div

           initial={{
           opacity: 0,
            scale: 0.9,
           y: 40
           }}

          animate={{
           opacity: 1,
          scale: 1,
          y: 0
          }}

          exit={{
          opacity: 0,
          scale: 0.95
       }}

         transition={{
        duration: 0.35
      }}

       className="
       bg-white
       text-black
       rounded-3xl
       p-8
       w-full
       max-w-2xl
       shadow-2xl
       my-auto
      "
>

              <h2 className="text-3xl font-black mb-4">
                Responder a {selectedPeticion.nombre}
              </h2>

              <p className="text-gray-500 mb-6">
                {selectedPeticion.email}
              </p>

              <textarea
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="
                  w-full
                  h-48
                  bg-gray-100
                  rounded-2xl
                  p-4
                  outline-none
                  resize-none
                "
              />

              <div className="flex justify-end gap-4 mt-6">

                <button
                  onClick={() => setSelectedPeticion(null)}
                  className="
                    bg-gray-200
                    px-6 py-3
                    rounded-2xl
                    transition-all duration-300
                    hover:bg-gray-300
                    hover:scale-105
                  "
                >

                  Cancelar

                </button>

                <button
                  onClick={enviarRespuesta}
                  className="
                    bg-black text-white
                    px-6 py-3
                    rounded-2xl
                    transition-all duration-300
                    hover:bg-yellow-500
                    hover:text-black
                    hover:scale-105
                  "
                >

                  {sending ? "Enviando..." : "Enviar"}

                </button>

              </div>

            </motion.div>

          </div>

        )}

      </section>

    </PageWrapper>

  )

}