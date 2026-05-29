import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { getCurrentChurchId } from "../lib/getCurrentChurchId"

export default function AdminContenido() {

  const [services, setServices] = useState([])

  const [footer, setFooter] = useState(null)

  const navigate = useNavigate()

  const { showToast } = useToast()

  const [saving, setSaving] = useState(false)

  useEffect(() => {

    fetchServices()

    fetchFooter()

  }, [])

  async function fetchServices() {

  const churchId =
    await getCurrentChurchId()

  const { data, error } =
    await supabase

      .from("services")

      .select("*")

      .eq(
        "church_id",
        churchId
      )

      .order("id")

  if (!error) {

    setServices(data)

  }

}

  async function fetchFooter() {

  const churchId =
    await getCurrentChurchId()

  const { data, error } =
    await supabase

      .from("footer_content")

      .select("*")

      .eq(
        "church_id",
        churchId
      )

      .eq(
        "activo",
        true
      )

      .single()

  if (!error) {

    setFooter(data)

  }

}

  async function updateService(id, field, value) {

    const churchId =
  await getCurrentChurchId()

await supabase

  .from("services")

  .update({
    [field]: value
  })

  .eq(
    "id",
    id
  )

  .eq(
    "church_id",
    churchId
  )

  }

  async function updateFooter(field, value) {

    if (!footer) return

    const churchId =
  await getCurrentChurchId()

await supabase

  .from("footer_content")

  .update({
    [field]: value
  })

  .eq(
    "id",
    footer.id
  )

  .eq(
    "church_id",
    churchId
  )

  }

 async function saveAllChanges() {

  setSaving(true)

  const churchId =
    await getCurrentChurchId()

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
        .eq(
        "id",
        service.id
        )

       .eq(
       "church_id",
       churchId
      )

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
        .eq(
        "id",
        footer.id
        )

      .eq(
      "church_id",
       churchId
       )

    }

    showToast("Contenido actualizado correctamente", "success")

  } catch (error) {

    console.log(error)

    alert("Error actualizando contenido")

  }

  setSaving(false)

}

  return (

    <section className="min-h-screen bg-[#f5f5f7] text-[#111111] px-6 py-14">

      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <p className="uppercase tracking-[4px] text-[#8e8e93] mb-2 text-sm font-medium">

            CMS

          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-10 leading-tight">

            Contenido Web

          </h1>

          <div className="flex flex-wrap gap-4 mb-10">

  <button
    onClick={() => navigate("/admin")}
    className="
     bg-white
     hover:bg-zinc-100
     border border-zinc-200
     shadow-sm
      px-6 py-4
      rounded-2xl
      font-medium
      transition-all duration-300
    "
  >

    ← Volver al Dashboard

  </button>

  <button
    onClick={saveAllChanges}
    disabled={saving}
    className="
     bg-[#111111]
     hover:bg-black
     text-white
     shadow-sm
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

          <h2 className="text-2xl font-semibold mb-6">

            Servicios

          </h2>

          <div className="grid gap-8">

            {services.map((service) => (

              <div
                key={service.id}
                className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm"
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
                    className="bg-[#f9f9f9]
                    border border-zinc-200
                    rounded-2xl
                    px-5 py-3
                    text-[#111111]
                    placeholder:text-[#8e8e93]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-black/5"
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
                    className="
                   bg-[#f9f9f9]
                  border border-zinc-200
                  rounded-2xl
                  px-5 py-3
                  text-[#111111]
                  placeholder:text-[#8e8e93]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/5
"
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
                    className="
bg-[#f9f9f9]
border border-zinc-200
rounded-2xl
px-5 py-3
text-[#111111]
placeholder:text-[#8e8e93]
focus:outline-none
focus:ring-2
focus:ring-black/5
"
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
                    className="
                   bg-[#f9f9f9]
                  border border-zinc-200
                  rounded-2xl
                  px-5 py-3
                  text-[#111111]
                  placeholder:text-[#8e8e93]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/5
"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* FOOTER */}

        {footer && (

          <div>

            <h2 className="text-2xl font-semibold mb-6">

              Footer & Redes

            </h2>

            <div className="bg-white border border-zinc-200 rounded-3xl p-8 grid gap-6 shadow-sm">

            <p className="text-[#8e8e93] uppercase tracking-[2px] mb-2 text-sm font-medium">

            Nuestra Visión

            </p>

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
                className="bg-[#f9f9f9]
               border border-zinc-200
               rounded-2xl
               px-5 py-3
               min-h-[120px]
               text-[#111111]
               placeholder:text-[#8e8e93]
               focus:outline-none
               focus:ring-2
               focus:ring-black/5"
              />

              <p className="text-[#8e8e93] uppercase tracking-[2px] mb-2 text-sm font-medium">

             Nuestra Misión

             </p>

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
                className="
bg-[#f9f9f9]
border border-zinc-200
rounded-2xl
px-5 py-3
min-h-[120px]
text-[#111111]
placeholder:text-[#8e8e93]
focus:outline-none
focus:ring-2
focus:ring-black/5
"
              />

              <p className="text-[#8e8e93] uppercase tracking-[2px] mb-2 text-sm font-medium">

             Facebook

             </p>

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
                className="
                   bg-[#f9f9f9]
                  border border-zinc-200
                  rounded-2xl
                  px-5 py-3
                  text-[#111111]
                  placeholder:text-[#8e8e93]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/5
"
              />

              <p className="text-[#8e8e93] uppercase tracking-[2px] mb-2 text-sm font-medium">

             Instagram

              </p>

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
                className="
bg-[#f9f9f9]
border border-zinc-200
rounded-2xl
px-5 py-3
min-h-[120px]
text-[#111111]
placeholder:text-[#8e8e93]
focus:outline-none
focus:ring-2
focus:ring-black/5
"
              />

              <p className="text-[#8e8e93] uppercase tracking-[2px] mb-2 text-sm font-medium">

              YouTube

             </p>

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
                className="
bg-[#f9f9f9]
border border-zinc-200
rounded-2xl
px-5 py-3
min-h-[120px]
text-[#111111]
placeholder:text-[#8e8e93]
focus:outline-none
focus:ring-2
focus:ring-black/5
"
              />

            </div>

          </div>

        )}

      </div>

    </section>

  )

}