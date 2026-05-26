import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function AdminContenido() {

  const [services, setServices] = useState([])

  const [footer, setFooter] = useState(null)

  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)

  useEffect(() => {

    fetchServices()

    fetchFooter()

  }, [])

  async function fetchServices() {

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id")

    if (!error) {

      setServices(data)

    }

  }

  async function fetchFooter() {

    const { data, error } = await supabase
      .from("footer_content")
      .select("*")
      .eq("activo", true)
      .single()

    if (!error) {

      setFooter(data)

    }

  }

  async function updateService(id, field, value) {

    await supabase
      .from("services")
      .update({
        [field]: value
      })
      .eq("id", id)

  }

  async function updateFooter(field, value) {

    if (!footer) return

    await supabase
      .from("footer_content")
      .update({
        [field]: value
      })
      .eq("id", footer.id)

  }

  async function saveAllChanges() {

  setSaving(true)

  try {

    for (const service of services) {

      await supabase
        .from("services")
        .update({
          day: service.day,
          title: service.title,
          time: service.time,
          extra: service.extra
        })
        .eq("id", service.id)

    }

    if (footer) {

      await supabase
        .from("footer_content")
        .update({
          vision: footer.vision,
          mission: footer.mission,
          facebook: footer.facebook,
          instagram: footer.instagram,
          youtube: footer.youtube
        })
        .eq("id", footer.id)

    }

    alert("Contenido actualizado correctamente")

  } catch (error) {

    console.log(error)

    alert("Error actualizando contenido")

  }

  setSaving(false)

}

  return (

    <section className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="uppercase tracking-[5px] text-yellow-400 mb-4">

            CMS

          </p>

          <h1 className="text-5xl font-black mb-16">

            Contenido Web

          </h1>

          <div className="flex flex-wrap gap-4 mb-16">

  <button
    onClick={() => navigate("/admin")}
    className="
      bg-white/10
      hover:bg-white/20
      border border-white/10
      px-6 py-4
      rounded-2xl
      font-semibold
      transition-all duration-300
    "
  >

    ← Volver al Dashboard

  </button>

  <button
    onClick={saveAllChanges}
    disabled={saving}
    className="
      bg-yellow-500
      hover:bg-yellow-400
      text-black
      px-6 py-4
      rounded-2xl
      font-bold
      transition-all duration-300
      disabled:opacity-50
    "
  >

    {
      saving
        ? "Guardando..."
        : "Guardar Cambios"
    }

  </button>

</div>

        </motion.div>

        {/* SERVICES */}

        <div className="mb-20">

          <h2 className="text-3xl font-bold mb-8">

            Servicios

          </h2>

          <div className="grid gap-8">

            {services.map((service) => (

              <div
                key={service.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8"
              >

                <div className="grid md:grid-cols-2 gap-6">

                  <input
                    type="text"
                    value={service.day || ""}
                    onChange={(e) => {

                      const updated = services.map((s) =>
                        s.id === service.id
                          ? { ...s, day: e.target.value }
                          : s
                      )

                      setServices(updated)

                    }}
                    onBlur={(e) =>
                      updateService(service.id, "day", e.target.value)
                    }
                    placeholder="Día"
                    className="bg-black border border-white/10 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="text"
                    value={service.title || ""}
                    onChange={(e) => {

                      const updated = services.map((s) =>
                        s.id === service.id
                          ? { ...s, title: e.target.value }
                          : s
                      )

                      setServices(updated)

                    }}
                    onBlur={(e) =>
                      updateService(service.id, "title", e.target.value)
                    }
                    placeholder="Título"
                    className="bg-black border border-white/10 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="text"
                    value={service.time || ""}
                    onChange={(e) => {

                      const updated = services.map((s) =>
                        s.id === service.id
                          ? { ...s, time: e.target.value }
                          : s
                      )

                      setServices(updated)

                    }}
                    onBlur={(e) =>
                      updateService(service.id, "time", e.target.value)
                    }
                    placeholder="Horario"
                    className="bg-black border border-white/10 rounded-2xl px-5 py-4"
                  />

                  <input
                    type="text"
                    value={service.extra || ""}
                    onChange={(e) => {

                      const updated = services.map((s) =>
                        s.id === service.id
                          ? { ...s, extra: e.target.value }
                          : s
                      )

                      setServices(updated)

                    }}
                    onBlur={(e) =>
                      updateService(service.id, "extra", e.target.value)
                    }
                    placeholder="Extra"
                    className="bg-black border border-white/10 rounded-2xl px-5 py-4"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* FOOTER */}

        {footer && (

          <div>

            <h2 className="text-3xl font-bold mb-8">

              Footer & Redes

            </h2>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 grid gap-6">

              <textarea
                value={footer.vision || ""}
                onChange={(e) =>
                  setFooter({
                    ...footer,
                    vision: e.target.value
                  })
                }
                onBlur={(e) =>
                  updateFooter("vision", e.target.value)
                }
                placeholder="Visión"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 min-h-[140px]"
              />

              <textarea
                value={footer.mission || ""}
                onChange={(e) =>
                  setFooter({
                    ...footer,
                    mission: e.target.value
                  })
                }
                onBlur={(e) =>
                  updateFooter("mission", e.target.value)
                }
                placeholder="Misión"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4 min-h-[140px]"
              />

              <input
                type="text"
                value={footer.facebook || ""}
                onChange={(e) =>
                  setFooter({
                    ...footer,
                    facebook: e.target.value
                  })
                }
                onBlur={(e) =>
                  updateFooter("facebook", e.target.value)
                }
                placeholder="Facebook"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                value={footer.instagram || ""}
                onChange={(e) =>
                  setFooter({
                    ...footer,
                    instagram: e.target.value
                  })
                }
                onBlur={(e) =>
                  updateFooter("instagram", e.target.value)
                }
                placeholder="Instagram"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                value={footer.youtube || ""}
                onChange={(e) =>
                  setFooter({
                    ...footer,
                    youtube: e.target.value
                  })
                }
                onBlur={(e) =>
                  updateFooter("youtube", e.target.value)
                }
                placeholder="YouTube"
                className="bg-black border border-white/10 rounded-2xl px-5 py-4"
              />

            </div>

          </div>

        )}

      </div>

    </section>

  )

}