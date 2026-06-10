import { useState } from "react"
import emailjs from "@emailjs/browser"
import { supabase } from "../../lib/supabase"
import { getPublicChurch } from "../../lib/getPublicChurch"

export default function Template3PrayerForm() {

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
        bg-slate-950
        py-32
        px-6
        relative
        overflow-hidden
      "
    >

      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-blue-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-600/20 blur-[150px]" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* HEADER */}

        <div className="text-center mb-20">

          <p
            className="
              uppercase
              tracking-[0.4em]
              text-blue-400
              text-sm
              mb-6
            "
          >
            Oración
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-bold
              text-white
              mb-8
            "
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            ¿Necesitas Oración?
          </h2>

          <p
            className="
              text-slate-400
              text-lg
              max-w-2xl
              mx-auto
            "
          >
            Comparte tu petición y nuestro equipo
            estará orando por ti y tu familia.
          </p>

        </div>

        {/* CARD */}

        <div
          className="
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-slate-800
            rounded-[40px]
            p-8
            md:p-12
            shadow-[0_0_60px_rgba(37,99,235,0.12)]
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
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-2xl
                  p-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              />

              {errors.nombre && (
                <p className="text-red-400 text-sm mt-2">
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
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-2xl
                  p-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              />

              {errors.correo && (
                <p className="text-red-400 text-sm mt-2">
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
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-2xl
                  p-4
                  text-white
                  placeholder:text-slate-500
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              />

              {errors.telefono && (
                <p className="text-red-400 text-sm mt-2">
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
                  bg-slate-950
                  border
                  border-slate-700
                  rounded-2xl
                  p-4
                  text-white
                  placeholder:text-slate-500
                  resize-none
                  outline-none
                  focus:border-blue-500
                  transition-all
                "
              />

              <div className="flex justify-between mt-2">

                {errors.mensaje ? (
                  <p className="text-red-400 text-sm">
                    {errors.mensaje}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-slate-500 text-sm">
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
                py-5
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-violet-600
                text-white
                font-semibold
                hover:scale-[1.02]
                transition-all
                shadow-[0_0_30px_rgba(124,58,237,0.35)]
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
                    bg-green-500/10
                    border
                    border-green-500/20
                    rounded-[32px]
                    p-8
                    text-center
                  "
                >

                  <h3
                    className="
                      text-4xl
                      text-white
                      mb-4
                      font-bold
                    "
                    style={{
                      fontFamily:
                        "Space Grotesk",
                    }}
                  >
                    ¡Petición Enviada!
                  </h3>

                  <p
                    className="
                      text-slate-300
                      mb-8
                    "
                  >
                    Nuestro equipo estará orando
                    por ti y tu familia.
                  </p>

                  <button
                    onClick={() =>
                      setSuccess(false)
                    }
                    className="
                      px-8
                      py-4
                      rounded-2xl
                      bg-white
                      text-black
                      font-semibold
                      hover:scale-105
                      transition-all
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