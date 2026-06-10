import { useState } from "react"
import emailjs from "@emailjs/browser"
import { supabase } from "../../lib/supabase"
import { getPublicChurch } from "../../lib/getPublicChurch"

export default function Template2PrayerForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const regex = {
    nombre: /^[A-Za-zÀ-ÿ\s]{3,40}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^[0-9+\-\s]{7,20}$/,
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validate = () => {
    let newErrors = {}

    if (!regex.nombre.test(formData.nombre)) {
      newErrors.nombre =
        "Ingresa un nombre válido."
    }

    if (!regex.correo.test(formData.correo)) {
      newErrors.correo =
        "Ingresa un correo válido."
    }

    if (
      formData.telefono &&
      !regex.telefono.test(formData.telefono)
    ) {
      newErrors.telefono =
        "Ingresa un teléfono válido."
    }

    if (formData.mensaje.trim().length < 15) {
      newErrors.mensaje =
        "La petición debe tener mínimo 15 caracteres."
    }

    if (formData.mensaje.length > 300) {
      newErrors.mensaje =
        "Máximo 300 caracteres."
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)

    try {
      const church =
        await getPublicChurch()

      if (!church) {
        alert(
          "No se encontró la iglesia."
        )

        setLoading(false)

        return
      }

      const { error } = await supabase
        .from("peticiones")
        .insert(
          [
            {
              church_id: church.id,
              nombre: formData.nombre,
              email: formData.correo,
              telefono: formData.telefono,
              mensaje: formData.mensaje,
              estado: "Pendiente",
            },
          ],
          {
            returning: "minimal",
          }
        )

      if (error) {
        console.log(error)

        alert(
          "Error guardando petición."
        )

        setLoading(false)

        return
      }

      await emailjs.send(
        import.meta.env
          .VITE_EMAILJS_SERVICE_ID,

        import.meta.env
          .VITE_EMAILJS_TEMPLATE_ID,

        {
          nombre: formData.nombre,
          email: formData.correo,
          telefono: formData.telefono,
          mensaje: formData.mensaje,
        },

        import.meta.env
          .VITE_EMAILJS_PUBLIC_KEY
      )

      setSuccess(true)

      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        mensaje: "",
      })

      setErrors({})
    } catch (error) {
      console.log(error)

      alert(
        "Hubo un error al enviar la petición."
      )
    }

    setLoading(false)
  }

  return (
    <section
      id="oracion"
      className="
        bg-white
        py-32
        px-6
      "
    >
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-16">
          <p
            className="
              uppercase
              tracking-[0.35em]
              text-sm
              text-zinc-500
              mb-6
            "
          >
            Peticiones
          </p>

          <h2
            className="
              text-5xl
              md:text-6xl
              text-black
              mb-8
            "
            style={{
              fontFamily:
                "Instrument Serif",
            }}
          >
            ¿Necesitas oración?
          </h2>

          <p
            className="
              text-zinc-600
              text-lg
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Nuestro equipo estará
            orando por ti y tu familia.
          </p>
        </div>

        {/* FORM CARD */}

        <div
          className="
            bg-white
            border
            border-zinc-200
            rounded-[36px]
            p-8
            md:p-12
            shadow-[0_20px_60px_rgba(0,0,0,0.05)]
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >

            {/* NOMBRE */}

            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#fafafa]
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-black
                  transition
                "
              />

              {errors.nombre && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* EMAIL */}

            <div>
              <input
                type="email"
                name="correo"
                placeholder="Correo Electrónico"
                value={formData.correo}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#fafafa]
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-black
                  transition
                "
              />

              {errors.correo && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.correo}
                </p>
              )}
            </div>

            {/* TELÉFONO */}

            <div className="md:col-span-2">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="
                  w-full
                  bg-[#fafafa]
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                  outline-none
                  focus:border-black
                  transition
                "
              />

              {errors.telefono && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.telefono}
                </p>
              )}
            </div>

            {/* MENSAJE */}

            <div className="md:col-span-2">
              <textarea
                rows="7"
                name="mensaje"
                placeholder="Escribe tu petición de oración..."
                value={formData.mensaje}
                onChange={handleChange}
                maxLength={300}
                className="
                  w-full
                  bg-[#fafafa]
                  border
                  border-zinc-200
                  rounded-2xl
                  p-4
                  outline-none
                  resize-none
                  focus:border-black
                  transition
                "
              />

              <div className="flex justify-between mt-2">

                {errors.mensaje ? (
                  <p className="text-red-500 text-sm">
                    {errors.mensaje}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-zinc-400 text-sm">
                  {formData.mensaje.length}/300
                </p>

              </div>
            </div>

            {/* BOTÓN */}

            <button
              type="submit"
              disabled={loading}
              className="
                md:col-span-2
                bg-black
                text-white
                py-4
                rounded-full
                hover:opacity-90
                transition
                font-medium
              "
            >
              {loading
                ? "Enviando..."
                : "Enviar Petición"}
            </button>

            {/* SUCCESS */}

            {success && (
              <div className="md:col-span-2">
                <div
                  className="
                    mt-4
                    border
                    border-green-200
                    bg-green-50
                    rounded-[28px]
                    p-8
                    text-center
                  "
                >
                  <h3
                    className="
                      text-4xl
                      text-black
                      mb-4
                    "
                    style={{
                      fontFamily:
                        "Instrument Serif",
                    }}
                  >
                    ¡Petición Enviada!
                  </h3>

                  <p
                    className="
                      text-zinc-600
                      mb-8
                    "
                  >
                    Nuestro equipo estará
                    orando por ti y tu familia.
                  </p>

                  <button
                    onClick={() =>
                      setSuccess(false)
                    }
                    className="
                      px-8
                      py-4
                      rounded-full
                      bg-black
                      text-white
                      hover:opacity-90
                      transition
                    "
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </section>
  )
}